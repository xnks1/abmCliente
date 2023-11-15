import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as React from 'react';

import { RubroArticuloInsumo } from '../../../types/RubroArticuloInsumo';

type DeleteRubroArticuloInsumoModalProps = {
  onDelete: () => void;
  onHide: () => void;
  rubroArticuloInsumo: RubroArticuloInsumo | null;
  show: boolean;
};


const DeleteRubroArticuloInsumoModal: React.FC<DeleteRubroArticuloInsumoModalProps> = ({ onDelete, onHide, rubroArticuloInsumo, show }) => (
  
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Delete rubro articulo insumo</Modal.Title>
    </Modal.Header>
    <Modal.Body>Are you sure you want to delete the following rubro articulo insumo: <strong>{rubroArticuloInsumo?.denominacion}</strong>?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Close
      </Button>
      <Button variant="danger" onClick={onDelete}>
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
);

export default DeleteRubroArticuloInsumoModal;