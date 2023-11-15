import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from 'react-toastify';

import { FacturaService } from "../../../services/FacturaService";
import { ModalType } from "../../../types/ModalType";
import { Factura } from "../../../types/Factura";
import { MPDatos } from "../../../types/MPDatos";
import { FormaPago } from "../../../types/Formadepago";


type FacturaModalProps = {
  show: boolean;
  onHide: () => void;
  title: string;
  modalType: ModalType;
  factura: Factura;
  refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const FacturaModal: React.FC<FacturaModalProps> = ({
  show,
  onHide,
  title,
  modalType,
  factura,
  refreshData,
}) => {


 const [mpDatos, setmpDatos] = useState<MPDatos[]>([]);
  
  
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const mpDatos = await FacturaService.getMPDatos();
        setmpDatos(mpDatos);
      } catch (error) {
        console.error("Error fetching rubros and unidades de medida:", error);
      }
    };

    fetchLists();
  }, []);

  const formik = useFormik({
    initialValues: factura,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (formData: Factura) => handleSave(formData),
  });

  const handleSave = async (formData: Factura) => {
    try {
      if (modalType === ModalType.CREATE) {
        await FacturaService.createFactura(formData);
      } else if (modalType === ModalType.UPDATE) {
        await FacturaService.updateFactura(formData.id!, formData);
      }

      toast.success(modalType === ModalType.CREATE ? "Factura Creada" : "Factura Actualizada", {
        position: "top-center",
      });

      onHide();
      refreshData(prevState => !prevState);
    } catch (error) {
      console.error("Error saving factura:", error);
      toast.error('Ha ocurrido un error');
    }
  };

  const handleDelete = async () => {
    try {
      // Actualizar la fecha de baja
      if (factura) {
        factura.fechaBaja = new Date();
        await FacturaService.updateFactura(factura.id!, factura);
        toast.success("Factura dada de baja con éxito", {
          position: "top-center",
        });
  
        // Resto del código para refrescar la lista de facturas, etc.
        onHide();
        refreshData(prevState => !prevState);
      }
    } catch (error) {
      console.error("Error deleting factura:", error);
      toast.error("Ha ocurrido un error al eliminar la factura");
    }
  };
  
  const handleRestore = async () => {
    try {
      // Restaurar la fecha de baja a null
      if (factura) {
        factura.fechaBaja = null;
        await FacturaService.updateFactura(factura.id!, factura);
        toast.success("Factura restaurada con éxito", {
          position: "top-center",
        });
  
        // Resto del código para refrescar la lista de facturas, etc.
        onHide();
        refreshData(prevState => !prevState);
      }
    } catch (error) {
      console.error("Error restoring factura:", error);
      toast.error("Ha ocurrido un error al restaurar la factura");
    }
  };
  

  return (
    <>
    
    {modalType === ModalType.RESTORE && (
      <Modal show={show} onHide={onHide} centered backdrop="static">
         <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p> ¿Está seguro que desea dar de alta la factura  
                <br /> <strong> {factura.id} </strong> ?
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




    {/*FECHA DE BAJA*/}

    {modalType === ModalType.DELETE && (
      <Modal show={show} onHide={onHide} centered backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p> ¿Está seguro que desea dar de baja la factura  
                <br /> <strong> {factura.id} </strong> ?
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

    {modalType !== ModalType.DELETE && modalType !== ModalType.RESTORE && (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          

          {/*TOTAL DE VENTA*/}

          <Form.Group controlId="formTotalVenta">
            <Form.Label>Todal de venta</Form.Label>
            <Form.Control
              name="totalVenta"
              type="number"
              value={formik.values.totalVenta || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={Boolean(formik.errors.totalVenta && formik.touched.totalVenta)}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.totalVenta}
            </Form.Control.Feedback>
          </Form.Group>

          {/*FORMADEPAGO ENUMERACIONES*/}

                  <Form.Group controlId="formFormaPago">
          <Form.Label>Forma de Pago</Form.Label>
          <Form.Control
            as="select"
            name="formaPago"
            value={formik.values.formaPago || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={Boolean(formik.errors.formaPago && formik.touched.formaPago)}
          >
            <option value="" disabled>
              Seleccione una forma de pago
            </option>
            {Object.values(FormaPago).map((formaPagoValue) => (
              <option key={formaPagoValue} value={formaPagoValue}>
                {formaPagoValue}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {formik.errors.formaPago}
          </Form.Control.Feedback>
        </Form.Group>


        <Form.Group controlId="formFechaFacturacion">
      <Form.Label>Fecha de Facturación</Form.Label>
      <Form.Control
        type="date"
        name="fechaFacturacion"
        value={formik.values.fechaFacturacion || ''}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isInvalid={Boolean(formik.errors.fechaFacturacion && formik.touched.fechaFacturacion)}
      />
      <Form.Control.Feedback type="invalid">
        {formik.errors.fechaFacturacion}
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

export default FacturaModal;
