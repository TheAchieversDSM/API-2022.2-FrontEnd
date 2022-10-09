import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react';
import Form from 'react-bootstrap/Form';

function Check(props: { titulo: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) {
  return (
    <Form>

        <div key={`default-check`} className="mb-3">
          <Form.Check 
            id={`default-check}`}
            label={props.titulo}
          />
        </div>
  
    </Form>
  );
}

export default Check;