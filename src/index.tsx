import * as React from 'react';
// import styles from './styles.module.css'

interface Props {
  text: string;
}

export const ExampleComponent = ({ text }: Props) => {
  return <div>Example Component: {text}</div>;
};
