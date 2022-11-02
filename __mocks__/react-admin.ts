export class HttpError {
  constructor() {}
}

var localStorageMock = (function () {
  var store = {};

  return {
    getItem: function () {
      return {};
    },
    setItem: function () {
      return 'key';
    },
    clear: function () {
      store = {};
    }
  };
})();
global.windowVar = window;
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

JSON.parse = jest.fn().mockImplementationOnce(() => {
  return {};
});

export const fetchUtils = {
  fetchJson: (url: string, requestHeaders: object) => {
    if (
      decodeURI(url) ===
      'undefined/categories?page[limit]=25&page[number]=1&page[offset]=0&page[size]=25&sort=category_name'
    ) {
      console.log('getList --> ', decodeURI(url), requestHeaders);
      return Promise.resolve({
        json: {
          data: [
            {
              attributes: {
                category_id: 1,
                category_name: 'Beverages',
                description: 'Soft drinks, coffees, teas, beers, and ales',
                picture: ''
              },
              id: '1',
              links: {
                self: 'http://localhost:5656/api/categories/1/'
              },
              relationships: {
                ProductList: {
                  data: [],
                  links: {
                    self: 'http://localhost:5656/api/categories/1/ProductList'
                  }
                }
              },
              type: 'Category'
            },
            {
              attributes: {
                category_id: 2,
                category_name: 'Condiments',
                description:
                  'Sweet and savory sauces, relishes, spreads, and seasonings',
                picture: ''
              },
              id: '2',
              links: {
                self: 'http://localhost:5656/api/categories/2/'
              },
              relationships: {
                ProductList: {
                  data: [],
                  links: {
                    self: 'http://localhost:5656/api/categories/2/ProductList'
                  }
                }
              },
              type: 'Category'
            },
            {
              attributes: {
                category_id: 3,
                category_name: 'Confections',
                description: 'Desserts, candies, and sweet breads',
                picture: ''
              },
              id: '3',
              links: {
                self: 'http://localhost:5656/api/categories/3/'
              },
              relationships: {
                ProductList: {
                  data: [],
                  links: {
                    self: 'http://localhost:5656/api/categories/3/ProductList'
                  }
                }
              },
              type: 'Category'
            },
            {
              attributes: {
                category_id: 4,
                category_name: 'Dairy Products',
                description: 'Cheeses',
                picture: ''
              },
              id: '4',
              links: {
                self: 'http://localhost:5656/api/categories/4/'
              },
              relationships: {
                ProductList: {
                  data: [],
                  links: {
                    self: 'http://localhost:5656/api/categories/4/ProductList'
                  }
                }
              },
              type: 'Category'
            },
            {
              attributes: {
                category_id: 5,
                category_name: 'Grains/Cereals',
                description: 'Breads, crackers, pasta, and cereal',
                picture: ''
              },
              id: '5',
              links: {
                self: 'http://localhost:5656/api/categories/5/'
              },
              relationships: {
                ProductList: {
                  data: [],
                  links: {
                    self: 'http://localhost:5656/api/categories/5/ProductList'
                  }
                }
              },
              type: 'Category'
            },
            {
              attributes: {
                category_id: 6,
                category_name: 'Meat/Poultry',
                description: 'Prepared meats',
                picture: ''
              },
              id: '6',
              links: {
                self: 'http://localhost:5656/api/categories/6/'
              },
              relationships: {
                ProductList: {
                  data: [],
                  links: {
                    self: 'http://localhost:5656/api/categories/6/ProductList'
                  }
                }
              },
              type: 'Category'
            },
            {
              attributes: {
                category_id: 7,
                category_name: 'Produce',
                description: 'Dried fruit and bean curd',
                picture: ''
              },
              id: '7',
              links: {
                self: 'http://localhost:5656/api/categories/7/'
              },
              relationships: {
                ProductList: {
                  data: [],
                  links: {
                    self: 'http://localhost:5656/api/categories/7/ProductList'
                  }
                }
              },
              type: 'Category'
            },
            {
              attributes: {
                category_id: 8,
                category_name: 'Seafood',
                description: 'Seaweed and fish',
                picture: ''
              },
              id: '8',
              links: {
                self: 'http://localhost:5656/api/categories/8/'
              },
              relationships: {
                ProductList: {
                  data: [],
                  links: {
                    self: 'http://localhost:5656/api/categories/8/ProductList'
                  }
                }
              },
              type: 'Category'
            }
          ],
          included: [],
          jsonapi: {
            version: '1.0'
          },
          links: {
            self: 'http://localhost:5656/api/categories/?include=&page[number]=1&page[size]=25&sort=category_name&page[offset]=0&page[limit]=25'
          },
          meta: {
            count: 8,
            limit: 25,
            total: 8
          }
        }
      });
    }
    if (
      decodeURI(url) ===
      'undefined/customers/ALFKI?include=%2Ball&page[limit]=50'
    ) {
      console.log('getOne --> ', decodeURI(url), requestHeaders);
      return Promise.resolve({
        json: {
          data: {
            attributes: {
              address: 'Obere Str. 57',
              city: 'Berlin',
              company_name: 'Alfreds Futterkiste',
              contact_name: 'Maria Anders',
              contact_title: 'Sales Representative',
              country: 'Germany',
              customer_id: 'ALFKI',
              fax: '030-0076545',
              phone: '030-0074321',
              postal_code: '12209',
              region: null,
              CustomerCustomerDemoList: {
                data: [],
                links: {
                  self: 'http://localhost:5656/api/customers/ALFKI/CustomerCustomerDemoList'
                }
              },
              OrderList: {
                data: [
                  {
                    id: '10643',
                    type: 'Order'
                  }
                ],
                links: {
                  self: 'http://localhost:5656/api/customers/ALFKI/OrderList'
                },
                meta: {
                  count: 1,
                  limit: 1,
                  total: 1
                }
              },
              type: 'Customer',
              relationships: {
                CustomerCustomerDemoList: {
                  data: [],
                  links: {
                    self: 'http://localhost:5656/api/customers/ALFKI/CustomerCustomerDemoList'
                  }
                },
                OrderList: {
                  data: [
                    {
                      id: '10643',
                      type: 'Order'
                    }
                  ],
                  links: {
                    self: 'http://localhost:5656/api/customers/ALFKI/OrderList'
                  },
                  meta: {
                    count: 1,
                    limit: 1,
                    total: 1
                  }
                }
              },
              attributes: {
                address: 'Obere Str. 57',
                city: 'Berlin',
                company_name: 'Alfreds Futterkiste',
                contact_name: 'Maria Anders',
                contact_title: 'Sales Representative',
                country: 'Germany',
                customer_id: 'ALFKI',
                fax: '030-0076545',
                phone: '030-0074321',
                postal_code: '12209',
                region: null
              }
            },
            id: 'ALFKI',
            links: {
              self: 'http://localhost:5656/api/customers/ALFKI/'
            },
            relationships: {
              CustomerCustomerDemoList: {
                data: [],
                links: {
                  self: 'http://localhost:5656/api/customers/ALFKI/CustomerCustomerDemoList'
                }
              },
              OrderList: {
                data: [
                  {
                    id: '10643',
                    type: 'Order'
                  }
                ],
                links: {
                  self: 'http://localhost:5656/api/customers/ALFKI/OrderList'
                },
                meta: {
                  count: 1,
                  limit: 1,
                  total: 1
                }
              }
            },
            type: 'Customer'
          },
          included: [
            {
              attributes: {
                customer_id: 'ALFKI',
                employee_id: 6,
                freight: 29.46,
                order_date: '1997-08-25',
                order_id: 10643,
                required_date: '1997-09-22',
                ship_address: 'Obere Str. 57',
                ship_city: 'Berlin',
                ship_country: 'Germany',
                ship_name: 'Alfreds Futterkiste',
                ship_postal_code: '12209',
                ship_region: null,
                ship_via: 1,
                shipped_date: '1997-09-02'
              },
              id: '10643',
              links: {
                self: 'http://localhost:5656/api/orders/10643/'
              },
              relationships: {
                OrderDetailList: {
                  data: [],
                  links: {
                    self: 'http://localhost:5656/api/orders/10643/OrderDetailList'
                  }
                },
                customer: {
                  data: null,
                  links: {
                    self: 'http://localhost:5656/api/orders/10643/customer'
                  }
                },
                employee: {
                  data: null,
                  links: {
                    self: 'http://localhost:5656/api/orders/10643/employee'
                  }
                },
                shipper: {
                  data: null,
                  links: {
                    self: 'http://localhost:5656/api/orders/10643/shipper'
                  }
                }
              },
              type: 'Order'
            }
          ],
          jsonapi: {
            version: '1.0'
          },
          links: {
            related:
              'http://localhost:5656/api/customers/ALFKI?include=CustomerCustomerDemoList,OrderList&page%5Blimit%5D=1',
            self: 'http://localhost:5656/api/customers/ALFKI/'
          },
          meta: {
            count: 1,
            instance_meta: {},
            limit: 1,
            total: 1
          }
        }
      });
    }
    if (decodeURI(url) === 'undefined/Employees?filter[id]=1') {
      console.log('getMany --> ', decodeURI(url), requestHeaders);
      return Promise.resolve({
        json: {
          data: [
            {
              attributes: {
                address: '507 - 20th Ave. E.\\nApt. 2A',
                birth_date: '1948-12-08',
                city: 'Seattle',
                country: 'USA',
                employee_id: 1,
                extension: '5467',
                first_name: 'Nancy',
                hire_date: '1992-05-01',
                home_phone: '(206) 555-9857',
                last_name: 'Davolio',
                notes:
                  'Education includes a BA in psychology from Colorado State University in 1970.  She also completed The Art of the Cold Call.  Nancy is a member of Toastmasters International.',
                photo: '',
                photo_path: 'http://accweb/emmployees/davolio.bmp',
                postal_code: '98122',
                region: 'WA',
                reports_to: 2,
                title: 'Sales Representative',
                title_of_courtesy: 'Ms.'
              },
              id: '1',
              links: {
                self: 'http://localhost:5656/api/employees/1/'
              },
              relationships: {
                EmployeeList: {
                  data: [],
                  links: {
                    self: 'http://localhost:5656/api/employees/1/EmployeeList'
                  }
                },
                EmployeeTerritoryList: {
                  data: [],
                  links: {
                    self: 'http://localhost:5656/api/employees/1/EmployeeTerritoryList'
                  }
                },
                OrderList: {
                  data: [],
                  links: {
                    self: 'http://localhost:5656/api/employees/1/OrderList'
                  }
                },
                parent: {
                  data: null,
                  links: {
                    self: 'http://localhost:5656/api/employees/1/parent'
                  }
                }
              }
            }
          ],
          included: [],
          jsonapi: {
            version: '1.0'
          },
          links: {
            self: 'http://localhost:5656/api/employees/?filter[id]=1&page[offset]=0&page[limit]=250'
          },
          meta: {
            count: 1,
            limit: 250,
            total: 1
          }
        }
      });
    }
    if (
      decodeURI(url) ===
      'undefined/employee_territories?filter[territory_id]=30346&filter_={}&range=[0%2C24]&sort=["id"%2C"DESC"]'
    ) {
      console.log('getManyReference -->', decodeURI(url), requestHeaders);
      return Promise.resolve({
        headers: {},
        json: {
          data: [
            {
              id: '3_30346',
              links: {
                self: 'http://localhost:5656/api/employee_territories/3_30346/'
              },
              relationships: {
                employee: {
                  data: {
                    id: '3',
                    type: 'Employee'
                  },
                  links: {
                    self: 'http://localhost:5656/api/employee_territories/3_30346/employee'
                  }
                },
                territory: {
                  data: {
                    id: '30346',
                    type: 'Territory'
                  },
                  links: {
                    self: 'http://localhost:5656/api/employee_territories/3_30346/territory'
                  }
                }
              },
              type: 'EmployeeTerritory'
            }
          ],
          included: [
            {
              attributes: {
                address: '722 Moss Bay Blvd.',
                birth_date: '1963-08-30',
                city: 'Kirkland',
                country: 'USA',
                extension: '3355',
                first_name: 'Janet',
                hire_date: '1992-04-01',
                home_phone: '(206) 555-3412',
                last_name: 'Leverling',
                notes:
                  'Janet has a BS degree in chemistry from Boston College (1984).  She has also completed a certificate program in food retailing management.  Janet was hired as a sales associate in 1991 and promoted to sales representative in February 1992.',
                photo: '',
                photo_path: 'http://accweb/emmployees/leverling.bmp',
                postal_code: '98033',
                region: 'WA',
                reports_to: 2,
                title: 'Sales Representative',
                title_of_courtesy: 'Ms.'
              },
              id: '3',
              links: {
                self: 'http://localhost:5656/api/employees/3/'
              },
              relationships: {
                EmployeeList: {
                  data: [],
                  links: {
                    self: 'http://localhost:5656/api/employees/3/EmployeeList'
                  }
                },
                EmployeeTerritoryList: {
                  data: [],
                  links: {
                    self: 'http://localhost:5656/api/employees/3/EmployeeTerritoryList'
                  }
                },
                OrderList: {
                  data: [],
                  links: {
                    self: 'http://localhost:5656/api/employees/3/OrderList'
                  }
                },
                parent: {
                  data: null,
                  links: {
                    self: 'http://localhost:5656/api/employees/3/parent'
                  }
                }
              },
              type: 'Employee'
            },
            {
              attributes: {
                region_id: 4,
                territory_description: 'Atlanta',
                territory_id: '30346'
              },
              id: '30346',
              links: {
                self: 'http://localhost:5656/api/territories/30346/'
              },
              relationships: {
                EmployeeTerritoryList: {
                  data: [],
                  links: {
                    self: 'http://localhost:5656/api/territories/30346/EmployeeTerritoryList'
                  }
                },
                region: {
                  data: null,
                  links: {
                    self: 'http://localhost:5656/api/territories/30346/region'
                  }
                }
              },
              type: 'Territory'
            }
          ],
          jsonapi: {
            version: '1.0'
          },
          links: {
            self: 'http://localhost:5656/api/employee_territories/?filter[territory_id]=30346&sort=-id&include=employee,territory&page[offset]=0&page[limit]=25'
          },
          meta: {
            count: 1,
            limit: 25,
            total: 1
          }
        }
      });
    }
    if (decodeURI(url) === 'undefined/orders/10692') {
      console.log('update -->', decodeURI(url), requestHeaders);
      return Promise.resolve({
        json: {
          data: {
            attributes: {
              customer_id: 'ALFKI',
              employee_id: 4,
              freight: 4,
              order_date: '1997-10-03',
              order_id: 10692,
              required_date: '1997-10-31',
              ship_address: 'Obere Str. 57',
              ship_city: 'Berlin',
              ship_country: 'Germany',
              ship_name: "Alfred's Futterkiste",
              ship_postal_code: '12209',
              ship_region: null,
              ship_via: 2,
              shipped_date: '1997-10-13'
            },
            id: '10692',
            links: {
              self: 'http://localhost:5656/api/orders/10692/'
            },
            relationships: {
              OrderDetailList: {
                data: [],
                links: {
                  self: 'http://localhost:5656/api/orders/10692/OrderDetailList'
                }
              },
              customer: {
                data: null,
                links: {
                  self: 'http://localhost:5656/api/orders/10692/customer'
                }
              },
              employee: {
                data: null,
                links: {
                  self: 'http://localhost:5656/api/orders/10692/employee'
                }
              },
              shipper: {
                data: null,
                links: {
                  self: 'http://localhost:5656/api/orders/10692/shipper'
                }
              }
            },
            type: 'Order'
          },
          included: [],
          jsonapi: {
            version: '1.0'
          },
          links: {
            related: 'http://localhost:5656/api/orders/10692',
            self: 'http://localhost:5656/api/orders/10692/'
          },
          meta: {
            count: 1,
            instance_meta: {},
            limit: 250,
            total: 1
          }
        }
      });
    }
    if (decodeURI(url) === 'undefined/order_details') {
      console.log('create --> ', decodeURI(url), requestHeaders);
      return Promise.resolve({
        json: {
          data: {
            attributes: {
              discount: 1,
              order_id: 10702,
              product_id: 1,
              quantity: 1,
              unit_price: 1
            },
            id: '10702_1',
            links: {
              self: 'http://localhost:5656/api/order_details/10702_1/'
            },
            relationships: {
              order: {
                data: null,
                links: {
                  self: 'http://localhost:5656/api/order_details/10702_1/order'
                }
              },
              product: {
                data: null,
                links: {
                  self: 'http://localhost:5656/api/order_details/10702_1/product'
                }
              }
            },
            type: 'OrderDetail'
          },
          included: [],
          jsonapi: {
            version: '1.0'
          },
          links: {
            related: 'http://localhost:5656/api/order_details',
            self: 'http://localhost:5656/api/order_details/10702_1/'
          },
          meta: {
            count: 1,
            instance_meta: {},
            limit: 250,
            total: 1
          }
        }
      });
    }
    if (decodeURI(url) === 'undefined/order_details/10248_72') {
      console.log('delete -->', decodeURI(url), requestHeaders);
      return Promise.resolve({});
    }else{
      console.log('getResources --> ', decodeURI(url))
      return Promise.resolve({})
    }
  }
};
