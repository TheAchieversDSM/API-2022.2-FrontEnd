import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react';
import Alert from 'react-bootstrap/Alert';

function BasicExample(props: { prom: string }) {
  return (
    <>
      {['primary'].map((variant) => (
        <Alert key={variant} variant={variant}>
            <Alert.Heading>Veja essa promoçao!</Alert.Heading>
            <p>{props.prom}</p>
        </Alert>
      ))}
    </>
  );
}

export default BasicExample;