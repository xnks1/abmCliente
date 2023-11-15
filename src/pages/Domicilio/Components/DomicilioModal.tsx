
import { Button, Form, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from 'react-toastify';


import { ModalType } from "../../../types/ModalType";

import { DomicilioService } from "../../../services/DomicilioService";
import { Domicilio } from "../../../types/Domicilio";

type DomicilioModalProps = {
  show: boolean;
  onHide: () => void;
  title: string;
  modalType: ModalType;
  domicilio: Domicilio;
  refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const DomicilioModal: React.FC<DomicilioModalProps> = ({
  show,
  onHide,
  title,
  modalType,
  domicilio,
  refreshData,
}) => {
   [];

  const formik = useFormik({
    initialValues: domicilio,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (formData: Domicilio) => handleSave(formData),
  });

  const handleSave = async (formData: Domicilio) => {
    try {
      if (modalType === ModalType.CREATE) {
        await DomicilioService.createDomicilio(formData);
      } else if (modalType === ModalType.UPDATE) {
        await DomicilioService.updateDomicilio(formData.id!, formData);
      }

      toast.success(modalType === ModalType.CREATE ? "Domicilio Creado" : "Domicilio Actualizado", {
        position: "top-center",
      });

      onHide();
      refreshData(prevState => !prevState);
    } catch (error) {
      console.error("Error saving Domicilio:", error);
      toast.error('Ha ocurrido un error');
    }
  };

  const handleDelete = async () => {
    try {
      // Actualizar la fecha de baja
      if (domicilio) {
        domicilio.fechaBaja = new Date();
        await DomicilioService.updateDomicilio(domicilio.id!, domicilio);
        toast.success("Domicilio dado de baja con éxito", {
          position: "top-center",
        });
  
        // Resto del código para refrescar la lista de domicilios, etc.
        onHide();
        refreshData(prevState => !prevState);
      }
    } catch (error) {
      console.error("Error deleting Domicilio:", error);
      toast.error("Ha ocurrido un error al eliminar el domicilio");
    }
  };
  
  const handleRestore = async () => {
    try {
      // Restaurar la fecha de baja a null
      if (domicilio) {
        domicilio.fechaBaja = null;
        await DomicilioService.updateDomicilio(domicilio.id!, domicilio);
        toast.success("Domicilio restaurado con éxito", {
          position: "top-center",
        });
  
        // Resto del código para refrescar la lista de ingredientes, etc.
        onHide();
        refreshData(prevState => !prevState);
      }
    } catch (error) {
      console.error("Error restoring domicilio:", error);
      toast.error("Ha ocurrido un error al restaurar el domicilio");
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
            <p> ¿Está seguro que desea dar de baja el domicilio 
                <br /> <strong> {domicilio.id} </strong> ?
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
              <p> ¿Está seguro que desea dar de alta el domicilio 
                <br /> <strong> {domicilio.id} </strong> ?
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
          <Form.Group controlId="formId">
            <Form.Label>Id</Form.Label>
            <Form.Control
              name="id"
              type="number"
              value={formik.values.id || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={Boolean(formik.errors.id && formik.touched.id)}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.id}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formCalle">
            <Form.Label>Calle</Form.Label>
            <Form.Control
              name="calle"
              type="text"
              value={formik.values.calle || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={Boolean(formik.errors.calle && formik.touched.calle)}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.calle}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formCodigoPostal">
            <Form.Label>Código Postal</Form.Label>
            <Form.Control
              name="codigoPostal"
              type="number"
              value={formik.values.codigoPostal || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={Boolean(formik.errors.codigoPostal && formik.touched.codigoPostal)}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.codigoPostal}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formLocalidad">
            <Form.Label>Localidad</Form.Label>
            <Form.Control
              name="localidad"
              type="text"
              value={formik.values.localidad || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={Boolean(formik.errors.localidad && formik.touched.localidad)}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.localidad}
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group controlId="formNumero">
            <Form.Label>Número de domicilio</Form.Label>
            <Form.Control
              name="numero"
              type="number"
              value={formik.values.numero || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={Boolean(formik.errors.numero && formik.touched.numero)}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.numero}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formNumeroDpto">
            <Form.Label>Número de departamento</Form.Label>
            <Form.Control
              name="numeroDpto"
              type="number"
              value={formik.values.numeroDpto || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={Boolean(formik.errors.numeroDpto && formik.touched.numeroDpto)}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.numeroDpto}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPisoDpto">
            <Form.Label>Piso de departamento</Form.Label>
            <Form.Control
              name="pisoDpto"
              type="number"
              value={formik.values.pisoDpto || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={Boolean(formik.errors.pisoDpto && formik.touched.pisoDpto)}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.pisoDpto}
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

export default DomicilioModal;
