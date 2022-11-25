import React from 'react';
import { Admin, Resource,  EditGuesser } from 'react-admin';
import {UserList,  UserEdit, UserCreate } from './Users';
import BookIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import {jsonapiClient} from "rav4-jsonapi-client";
import { BookCreate, BookEdit, BookList } from './Books';
import {AddressList} from './Addresses'
import Dashboard from './Components/Dashboard';
import authProvider from './Components/authProvider';

const includeRels = [ // in typescript interface includeRelations[] import {jsonapiClient, includeRelations} from "rav4-jsonapi-client";
  { resource: 'Users', includes: ['addresses', 'companys'] },
  { resource: 'Addresses', includes: ['users'] }
];


function App() {
  const settings = { total: 'count',includeRelations: includeRels };
  const jsonDataProvider = jsonapiClient('https://thomaxxl.pythonanywhere.com/api', settings,);
    return (
      <Admin dashboard={Dashboard} dataProvider={jsonDataProvider} authProvider={authProvider}>
          <Resource name="Users" list={UserList} edit={UserEdit}  create={UserCreate} icon={UserIcon}></Resource>
          <Resource name="Books" list={BookList } edit={BookEdit} create={BookCreate} icon={BookIcon} />
          <Resource name="Addresses"  list={AddressList } edit={EditGuesser} />
      </Admin>
    );
}



export default App;