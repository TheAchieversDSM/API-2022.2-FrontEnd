import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

function AlertaProm(props: any) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="primary" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Confira esta promoção!</Alert.Heading>
        <p>
          {props.prom}
        </p>
        <hr/>
        <div className="justify-content-end"><Button variant="outline-success">Adicionar ao carrinho!</Button></div>
      </Alert>
    );
  } else{
    return null;
  }
}

export default AlertaProm;