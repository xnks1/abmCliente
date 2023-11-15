import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from 'react-toastify';

import { ClienteService } from "../../../services/ClienteService";
import { ModalType } from "../../../types/ModalType";
import { Cliente } from "../../../types/Cliente";


type ClienteModalProps = {
  show: boolean;
  onHide: () => void;
  title: string;
  modalType: ModalType;
  cliente: Cliente;
  refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const ClienteModal: React.FC<ClienteModalProps> = ({
  show,
  onHide,
  title,
  modalType,
  cliente,
  refreshData,
}) => {
    const formik = useFormik({
        initialValues: cliente,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (formData: Cliente) => handleSave(formData),
      });

  const handleSave = async (formData: Cliente) => {
    try {
      if (modalType === ModalType.CREATE) {
        await ClienteService.createCliente(formData);
      } else if (modalType === ModalType.UPDATE) {
        await ClienteService.updateCliente(formData.id!, formData);
      }

      toast.success(modalType === ModalType.CREATE ? "Cliente Creado" : "Cliente Actualizado", {
        position: "top-center",
      });

      onHide();
      refreshData(prevState => !prevState);
    } catch (error) {
      console.error("Error saving ingredient:", error);
      toast.error('Ha ocurrido un error');
    }
  };

  const handleDelete = async () => {
    try {
      // Actualizar la fecha de baja
      if (cliente) {
        cliente.fechaBaja = new Date();
        await ClienteService.updateCliente(cliente.id!, cliente);
        toast.success("Cliente dado de baja con éxito", {
          position: "top-center",
        });
  
        // Resto del código para refrescar la lista de Clientes, etc.
        onHide();
        refreshData(prevState => !prevState);
      }
    } catch (error) {
      console.error("Error deleting cliente:", error);
      toast.error("Ha ocurrido un error al eliminar el Cliente");
    }
  };
  
  const handleRestore = async () => {
    try {
      // Restaurar la fecha de baja a null
      if (cliente) {
        cliente.fechaBaja = null;
        await ClienteService.updateCliente(cliente.id!, cliente);
        toast.success("Cliente restaurado con éxito", {
          position: "top-center",
        });
  
        // Resto del código para refrescar la lista de Clientes, etc.
        onHide();
        refreshData(prevState => !prevState);
      }
    } catch (error) {
      console.error("Error restoring cliente:", error);
      toast.error("Ha ocurrido un error al restaurar el Cliente");
    }
  };
  

  return (
    <>
    {modalType === ModalType.DELETE && (
      <Modal show={show} onHide={onHide} centered backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p> ¿Está seguro que desea dar de baja el cliente  
                <br /> <strong> {cliente.nombre} </strong> ?
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Cancelar
            </Button>
            <Button variant="danger" onClick={handleDelete}>
                Dar de baja
            </Button>
        </Modal.Footer>
      </Modal>
    )}

    {modalType === ModalType.RESTORE && (
      <Modal show={show} onHide={onHide} centered backdrop="static">
         <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p> ¿Está seguro que desea dar de alta el cliente  
                <br /> <strong> {cliente.nombre} </strong> ?
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                Cancelar
              </Button>
              <Button variant="success" onClick={handleRestore}>
                Dar de alta
              </Button>
            </Modal.Footer>
      </Modal>
    )}
    {modalType !== ModalType.DELETE && modalType !== ModalType.RESTORE && (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name="nombre"
              type="text"
              value={formik.values.nombre || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={Boolean(formik.errors.nombre && formik.touched.nombre)}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.nombre}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formApellido">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              name="apellido"
              type="text"
              value={formik.values.apellido || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={Boolean(formik.errors.apellido && formik.touched.apellido)}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.apellido}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formTelefono">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              name="telefono"
              type="text"
              value={formik.values.telefono || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={Boolean(formik.errors.telefono && formik.touched.telefono)}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.telefono}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="text"
              value={formik.values.email || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={Boolean(formik.errors.email && formik.touched.email)}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          


          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" disabled={!formik.isValid}>
              Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
    )};
    </>
  );
};

export default ClienteModal;
