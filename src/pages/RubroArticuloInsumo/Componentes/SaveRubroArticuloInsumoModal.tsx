import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import * as React from 'react';
import Row from 'react-bootstrap/Row';

import { RubroArticuloInsumo } from '../../../types/RubroArticuloInsumo';

type DeleteRubroArticuloInsumoModalProps = {
  onHide: () => void;
  onSave: (i: RubroArticuloInsumo) => void;
  rubroArticuloInsumo: RubroArticuloInsumo | null;
  show: boolean;
};

const SaveRubroArticuloInsumoModal: React.FC<DeleteRubroArticuloInsumoModalProps> = ({ onSave, onHide, rubroArticuloInsumo, show }) => {
  // State
  const [validated, setValidated] = React.useState<boolean>(false);

  // Handlers
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);

      return;
    }

    const data = Object.fromEntries(new FormData(form));
    onSave({ ...rubroArticuloInsumo!, ...data });
  };

  // Render
  return (
    <Modal show={show} onHide={onHide}>
      <Form noValidate onSubmit={handleSubmit} validated={validated}>
        <Modal.Header closeButton>
          <Modal.Title>{rubroArticuloInsumo?.id === 0 ? 'Create' : 'Edit'}Rubro Articulo Insumo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Rubro Padre</Form.Label>
              <Form.Control
                defaultValue={rubroArticuloInsumo?.rubroPadre?.denominacion}
                name="rubroPadre-denominacion"
                placeholder="rubroPadre-denominacion"
                required
                type="text"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Denominacion</Form.Label>
              <Form.Control
                defaultValue={rubroArticuloInsumo?.denominacion}
                name="denominacion"
                placeholder="denominacion"
                required
                type="text"
              />
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button type="submit" variant="primary">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SaveRubroArticuloInsumoModal;