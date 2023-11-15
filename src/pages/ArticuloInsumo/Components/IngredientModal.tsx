import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from 'react-toastify';

import { IngredientService } from "../../../services/IngredientService";
import { ModalType } from "../../../types/ModalType";
import { Ingredient } from "../../../types/Ingredient";
import { RubroArticuloInsumo } from '../../../types/RubroArticuloInsumo';
import { UnidadMedida } from '../../../types/UnidadMedida';

type IngredientModalProps = {
  show: boolean;
  onHide: () => void;
  title: string;
  modalType: ModalType;
  ingredient: Ingredient;
  refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const IngredientModal: React.FC<IngredientModalProps> = ({
  show,
  onHide,
  title,
  modalType,
  ingredient,
  refreshData,
}) => {
  const [rubros, setRubros] = useState<RubroArticuloInsumo[]>([]);
  const [unidadesMedida, setUnidadesMedida] = useState<UnidadMedida[]>([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const rubros = await IngredientService.getRubros();
        const unidadesMedida = await IngredientService.getUnidades();
        setRubros(rubros);
        setUnidadesMedida(unidadesMedida);
      } catch (error) {
        console.error("Error fetching rubros and unidades de medida:", error);
      }
    };

    fetchLists();
  }, []);

  const formik = useFormik({
    initialValues: ingredient,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (formData: Ingredient) => handleSave(formData),
  });

  const handleSave = async (formData: Ingredient) => {
    try {
      if (modalType === ModalType.CREATE) {
        await IngredientService.createIngredient(formData);
      } else if (modalType === ModalType.UPDATE) {
        await IngredientService.updateIngredient(formData.id!, formData);
      }

      toast.success(modalType === ModalType.CREATE ? "Ingrediente Creado" : "Ingrediente Actualizado", {
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
      if (ingredient) {
        ingredient.fechaBaja = new Date();
        await IngredientService.updateIngredient(ingredient.id!, ingredient);
        toast.success("Ingrediente dado de baja con éxito", {
          position: "top-center",
        });
  
        // Resto del código para refrescar la lista de ingredientes, etc.
        onHide();
        refreshData(prevState => !prevState);
      }
    } catch (error) {
      console.error("Error deleting ingredient:", error);
      toast.error("Ha ocurrido un error al eliminar el ingrediente");
    }
  };
  
  const handleRestore = async () => {
    try {
      // Restaurar la fecha de baja a null
      if (ingredient) {
        ingredient.fechaBaja = null;
        await IngredientService.updateIngredient(ingredient.id!, ingredient);
        toast.success("Ingrediente restaurado con éxito", {
          position: "top-center",
        });
  
        // Resto del código para refrescar la lista de ingredientes, etc.
        onHide();
        refreshData(prevState => !prevState);
      }
    } catch (error) {
      console.error("Error restoring ingredient:", error);
      toast.error("Ha ocurrido un error al restaurar el ingrediente");
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
            <p> ¿Está seguro que desea dar de baja el producto  
                <br /> <strong> {ingredient.denominacion} </strong> ?
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
              <p> ¿Está seguro que desea dar de alta el producto  
                <br /> <strong> {ingredient.denominacion} </strong> ?
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
          <Form.Group controlId="formDenominacion">
            <Form.Label>Denominacion</Form.Label>
            <Form.Control
              name="denominacion"
              type="text"
              value={formik.values.denominacion || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={Boolean(formik.errors.denominacion && formik.touched.denominacion)}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.denominacion}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPrecioCompra">
            <Form.Label>Precio de Compra</Form.Label>
            <Form.Control
              name="precioCompra"
              type="number"
              value={formik.values.precioCompra || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={Boolean(formik.errors.precioCompra && formik.touched.precioCompra)}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.precioCompra}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formStockActual">
            <Form.Label>Stock Actual</Form.Label>
            <Form.Control
              name="stockActual"
              type="number"
              value={formik.values.stockActual || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={Boolean(formik.errors.stockActual && formik.touched.stockActual)}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.stockActual}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formStockMinimo">
            <Form.Label>Stock Mínimo</Form.Label>
            <Form.Control
              name="stockMinimo"
              type="number"
              value={formik.values.stockMinimo || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={Boolean(formik.errors.stockMinimo && formik.touched.stockMinimo)}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.stockMinimo}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formUrlImagen">
            <Form.Label>URL de la Imagen</Form.Label>
            <Form.Control
              name="urlImagen"
              type="text"
              value={formik.values.urlImagen || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={Boolean(formik.errors.urlImagen && formik.touched.urlImagen)}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.urlImagen}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formRubro">
            <Form.Label>Rubro</Form.Label>
            <Form.Control
              as="select"
              name="rubroArticulo.id" // Cambiar a rubroArticulo.id
              value={formik.values.rubroArticulo.id || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={Boolean(formik.errors.rubroArticulo?.id && formik.touched.rubroArticulo?.id)}
            >
              <option value="" disabled>
                Seleccione un rubro
              </option>

              {rubros.map((rubro) => (
                <option key={rubro.id} value={rubro.id}>
                  {rubro.denominacion}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.rubroArticulo?.id}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formUnidadMedida">
            <Form.Label>Unidad de Medida</Form.Label>
            <Form.Control
              as="select"
              name="unidadMedida.id" // Cambiar a unidadMedida.id
              value={formik.values.unidadMedida.id || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={Boolean(formik.errors.unidadMedida?.id && formik.touched.unidadMedida?.id)}
            >
              <option value="" disabled>
                Seleccione una unidad de medida
              </option>
              {unidadesMedida.map((unidadMedida) => (
                <option key={unidadMedida.id} value={unidadMedida.id}>
                  {unidadMedida.denominacion}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.unidadMedida?.id}
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

export default IngredientModal;
