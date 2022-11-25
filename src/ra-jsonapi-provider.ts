import { stringify } from 'query-string';
import { fetchUtils, DataProvider, HttpError } from 'react-admin';
import merge from 'deepmerge';
import { defaultSettings } from './default-settings';
import ResourceLookup from './resourceLookup';
import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import {fileURLToPath} from 'url';
import yaml from 'js-yaml'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const jsonapiClient = (
  apiUrl: string,
  userSettings = {},
  httpClient = fetchUtils.fetchJson,
  countHeader: string = 'Content-Range'
): DataProvider => {
  const settings = merge(defaultSettings, userSettings);
  let conf = { resources: {} };
  try {
    conf = JSON.parse(localStorage.getItem('raconf') || '');
  } catch (e) {
    console.warn('Failed to parse config', e);
  }

  return {
    getList: (resource: string, params: any) => {
      resource = decodeURI(resource);
      const { page, perPage } = params.pagination;

      // Create query with pagination params.
      const query = {
        'page[number]': page,
        'page[size]': perPage,
        'page[offset]': (page - 1) * perPage,
        'page[limit]': perPage,
        sort: ' '
      };

      // Add all filter params to query.
      if (params.filter?.q) {
        // search is requested by react-admin
        const search_cols = conf.resources[resource].search_cols || [];
        query['filter'] = JSON.stringify(
          search_cols.map((col_name: string) => {
            return {
              name: col_name,
              op: 'like',
              val: `${params.filter.q}%`
            };
          })
        );
      } else {
        Object.keys(params.filter || {}).forEach((key) => {
          query[`filter[${key}]`] = params.filter[key];
        });
      }

      // Add sort parameter
      if (params.sort && params.sort.field) {
        const prefix = params.sort.order === 'ASC' ? '' : '-';
        query.sort = `${prefix}${params.sort.field}`;
      }
      const includes: string[] = [];

      const includeRelations: includeRelations[] = settings.includeRelations;

      for (const ir of includeRelations) {
        if (resource === ir.resource) {
          query['include'] = ir.includes.join(',');
          for (const include of ir.includes) {
            includes.push(include);
          }
          break;
        }
      }

      const url = `${apiUrl}/${resource}?${stringify(query)}`;

      return httpClient(url)
        .then(({ json }: any) => {
          // const lookup = new ResourceLookup(json.data);
          // When meta data and the 'total' setting is provided try
          // to get the total count.
          let total = 0;
          if (json.meta && settings.total) {
            total = json.meta[settings.total];
          }
          // Use the length of the data array as a fallback.
          total = total || json.data.length; //  { id: any; attributes: any; }
          const lookup = new ResourceLookup(json);
          const jsonData = json.data.map((resource: any) =>
            lookup.unwrapData(resource, includes)
          );

          return {
            data: jsonData,
            total: total
          };
        })
        .catch((err: HttpError) => {
          console.log('catch Error', err.body);
          const errorHandler = settings.errorHandler;
          return Promise.reject(errorHandler(err));
        });
    },

    getOne: (resource: any, params: { id: any }) => {
      resource = decodeURI(resource);
      const url = `${apiUrl}/${resource}/${params.id}?include=%2Ball&page[limit]=50`;
      return httpClient(url).then(({ json }: any) => {
        const { id, attributes, relationships } = json.data;
        Object.assign(attributes, relationships);
        return {
          data: {
            id,
            ...attributes
          }
        };
      });
    },

    getMany: (resource: string, params: any) => {
      resource = decodeURI(resource);
      resource = capitalize(resource);
      let query = `filter[id]=${
        params.ids instanceof Array
          ? params.ids.join(',')
          : JSON.stringify(params.ids)
      }`;
      const url = `${apiUrl}/${resource}?${query}`;
      return httpClient(url).then(({ json }: any) => {
        // When meta data and the 'total' setting is provided try
        // to get the total count.
        let total = 0;
        if (json.meta && settings.total) {
          total = json.meta[settings.total];
        }
        // Use the length of the data array as a fallback.
        total = total || json.data?.length; //  { id: any; attributes: any; }
        const jsonData = json.data?.map((value: any) =>
          Object.assign({ id: value.id }, value.attributes)
        );

        return {
          data: jsonData,
          total: total
        };
      });
    },

    getManyReference: (resource: string, params: any) => {
      resource = decodeURI(resource);
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter_: JSON.stringify({
          ...params.filter
        })
      };
      query[`filter[${params.target}]`] = params.id;
      const url = `${apiUrl}/${resource}?${stringify(query)}`;
      const options = {};

      return httpClient(url, options).then(({ headers, json }: any) => {
        if (!headers?.countHeader) {
          console.debug(
            `The ${countHeader} header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare ${countHeader} in the Access-Control-Expose-Headers header?`
          );
        }
        return {
          data: json.data,
          total: 100
        };
      });
    },

    update: (resource: string, params: any) => {
      resource = decodeURI(resource);
      let type = conf?.['resources']?.[resource]?.type || resource;
      const arr = settings.endpointToTypeStripLastLetters;
      for (const i in arr) {
        if (resource.endsWith(arr[i])) {
          type = resource.slice(0, arr[i].length * -1);
          break; // quit after first hit
        }
      }
      const data = {
        data: {
          id: params.id,
          type: type,
          attributes: params.data
        }
      };
      return httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: settings.updateMethod,
        body: JSON.stringify(data)
      })
        .then(({ json }: any) => {
          const { id, attributes } = json.data;
          return {
            data: {
              id,
              ...attributes
            }
          };
        })
        .catch((err: HttpError) => {
          console.log('catch Error', err.body);
          const errorHandler = settings.errorHandler;
          return Promise.reject(errorHandler(err));
        });
    },

    // simple-rest doesn't handle provide an updateMany route, so we fallback to calling update n times instead
    updateMany: (resource: string, params: any) =>
      Promise.all(
        params.ids.map((id: any) =>
          httpClient(`${apiUrl}/${decodeURI(resource)}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data)
          })
        )
      ).then((responses) => ({ data: responses.map(({ json }) => json.id) })),

    create: (resource: string, params: any) => {
      resource = decodeURI(resource);
      let type = resource;
      const arr = settings.endpointToTypeStripLastLetters;
      for (const i in arr) {
        if (resource.endsWith(arr[i])) {
          type = resource.slice(0, arr[i].length * -1);
          break; // quit after first hit
        }
      }
      const data = {
        data: {
          type: type,
          attributes: params.data
        }
      };
      return httpClient(`${apiUrl}/${resource}`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
        .then(({ json }: any) => {
          const { id, attributes } = json.data;
          return {
            data: {
              id,
              ...attributes
            }
          };
        })
        .catch((err: HttpError) => {
          console.log('catch Error', err.body);
          const errorHandler = settings.errorHandler;
          return Promise.reject(errorHandler(err));
        });
    },

    delete: (resource: string, params: any) => {
      return httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'text/plain'
        })
      }).then(({ json }: any) => ({ data: json }));
    },

    // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
    deleteMany: (resource: string, params: any) =>
      Promise.all(
        params.ids.map((id: any) =>
          httpClient(`${apiUrl}/${resource}/${id}`, {
            method: 'DELETE',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          })
        )
      ).then((responses) => ({
        data: responses.map(({ json }) => json.id)
      })),

    getResources: () => {
      if (conf) {
        return Promise.resolve({ data: conf });
      }
      return httpClient(`${apiUrl}/schema`, {
        method: 'GET'
      })
        .then(({ json }: any) => {
          localStorage.setItem('raconf', JSON.stringify(json));
          return { data: json };
        })
        .catch(() => {
          return { data: {} };
        });
    },

    parseYaml:(path: string)=>{
      try {
        const result = yaml.load((readFileSync(resolve(__dirname, path)).toString()))
        conf = (JSON.parse(JSON.stringify(result)))
        return {parsedYamlConf:conf}
      } catch (e) {
        console.log(e);
        return e;
      }
    }
  };
};

function capitalize(s: string): string {
  return s[0].toUpperCase() + s.slice(1);
}
export interface includeRelations {
  resource: string;
  includes: string[];
}
