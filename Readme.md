# React-Admin 4 JSON:API dataprovider

## Example

The example starts from the [react-admin tutorial](https://marmelab.com/react-admin/Tutorial.html) and uses the JSON:API from http://thomaxxl.pythonanywhere.com/api :

```javascript
import { Admin, Resource, ListGuesser } from "react-admin";
import { jsonapiClient } from "rav4-jsonapi-client";


const dataProvider = jsonapiClient("https://thomaxxl.pythonanywhere.com/api", {});

const App = () => (
 <Admin dataProvider={dataProvider}>
   <Resource name="People" list={ListGuesser} />
   <Resource name="Books" list={ListGuesser} />
   <Resource name="Reviews" list={ListGuesser} />
   <Resource name="Publishers" list={ListGuesser} />
 </Admin>
);

export default App;
```

Options:

```javascript
import { Admin, Resource, ListGuesser, SimpleList, useRecordContext } from "react-admin";
import { jsonapiClient } from "rav4-jsonapi-client";
import { List, Datagrid, TextField, EmailField } from "react-admin";

const dataProvider = jsonapiClient("https://thomaxxl.pythonanywhere.com/api", {includeRelations : [ { 'resource': 'People', 'includes' : ['books_read']} ] });

const PeopleField = ({source}) => {
  const record = useRecordContext();
  console.log(record)
  if (!record) return null;
  return <>{record[source]}</>;
};


export const PeopleList = () => {

  const record = useRecordContext();
  console.log('record', record)

  return <List>
    <Datagrid rowClick="edit">
      <PeopleField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
    </Datagrid>
  </List>
}


const App = () => (
 <Admin dataProvider={dataProvider}>
   <Resource name="People" list={PeopleList} />
   <Resource name="Books" list={ListGuesser} />
   <Resource name="Reviews" list={ListGuesser} />
   <Resource name="Publishers" list={ListGuesser} />
 </Admin>
);

export default App;
```
