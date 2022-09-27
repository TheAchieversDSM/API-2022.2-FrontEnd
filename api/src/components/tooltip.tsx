import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/esm/Badge';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function TooltipDuvida(props: { mensagem: string }) {
  return (
    <>
      {['bottom'].map((placement) => (
        <OverlayTrigger
          key={'bottom'}
          placement={'bottom'}
          overlay={
            <Tooltip id={`tooltip-${placement}`}>
              {props.mensagem}
            </Tooltip>
          }
        >
          <Badge className="duvida" ><strong>?</strong></Badge>
        </OverlayTrigger>
      ))}
    </>
  );
}

export default TooltipDuvida;