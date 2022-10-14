import React from 'react';
import { List, Datagrid, TextField, ReferenceField } from 'react-admin';
import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  Edit,
  Filter,
  required,
} from 'react-admin';

const validateRequired = required();

const BooksFilter = (props) => (
  <Filter {...props}>
      <ReferenceInput label="User" source="user_id" reference="Users" allowEmpty>
          <SelectInput optionText="name" />
      </ReferenceInput>
  </Filter>
);

export const BookList = props => (
  <List filters={<BooksFilter />}{...props}>
      <Datagrid rowClick="edit">
          <ReferenceField source="user_id" reference="Users">
            <TextField source="name" />
          </ReferenceField>
          <TextField source="id" />
          <TextField source="name" />
      </Datagrid>
  </List>
);


const BookCreateTitle = ({ record }) => (<span>{`${record.name} `}</span>);
export const BookCreate = props => (
  <Create {...props} title={<BookCreateTitle />}>
    <SimpleForm >
        <ReferenceInput source="user_id" reference="Users">
               <SelectInput optionText="name" />
        </ReferenceInput>
      <TextInput source="name" validate={validateRequired} />
    </SimpleForm>
  </Create>
);
const BookEditTitle = ({ record }) => (<span>{`${record.name} `}</span>);
export const BookEdit = props => (
  <Edit {...props} title={<BookEditTitle />}>
    <SimpleForm >
        <TextInput disabled source="id" />
        <ReferenceInput source="user_id" reference="Users">
               <SelectInput optionText="name" />
        </ReferenceInput>
      <TextInput source="name" validate={validateRequired} />
    </SimpleForm>
  </Edit>
);