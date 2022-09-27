import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react';
import Alert from 'react-bootstrap/Alert';

function AlertaProm(props: { prom: string }) {
  return (
    <>
      {['primary'].map((variant) => (
        <Alert key={variant} variant={variant} className="alerta">
            <Alert.Heading>Confira essa promoçao!</Alert.Heading>
            <p>{props.prom}</p>
        </Alert>
      ))}
    </>
  );
}

export default AlertaProm;