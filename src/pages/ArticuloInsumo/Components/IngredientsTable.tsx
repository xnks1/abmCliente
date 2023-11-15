import { useEffect, useState } from "react"
import { Ingredient } from '../../../types/Ingredient';
import { IngredientService } from '../../../services/IngredientService';

import { Button, Table } from "react-bootstrap";
import Loader from "../../../components/Loader/Loader";
import { ArrowUp, ArrowDown, Pencil } from "react-bootstrap-icons";

import { ModalType } from "../../../types/ModalType";

import SaveIngredientModal from './IngredientModal';


const IngredientsTable = () => {

    //Variable que va a contener los datos recibidos por la API
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    //Variable que muestra el componente Loader hasta que se reciban los datos de la API
    const [isLoading, setIsLoading] = useState(true);

    //Variable que va actualizar los datos de la tabla luego de cada operacion exitosa
    const [refreshData, setRefreshData] = useState(false);

    //Variable que formatea la fecha a un formato mas legible
    const formatDate = (date: Date | string): string => {
      const formattedDate = new Date(date).toLocaleDateString(); // Puedes ajustar el formato según tus preferencias
      return formattedDate;
    };

    //Este hook se va a ejecutar cada vez que se renderice el componente o refreshData cambie de estado
    useEffect(() => {

        //Llamamos a la función para obtener todos los productos declarado en el service
        const fetchIngredients = async () => {
            const ingredients = await IngredientService.getIngredients();
            setIngredients(ingredients);
            setIsLoading(false);
        };

        fetchIngredients();
    }, [refreshData]);

    //Test, este log está modificado para que muestre los datos de una manera más legible
    console.log(JSON.stringify(ingredients, null, 2));


    //Se inicializa un producto vacio cuando vayamos a crear uno nuevo, para evitar "undefined"
        const initializeNewIngredient = (): Ingredient => {
        return {
            id: 0,
            denominacion: '',
            precioCompra: 0,
            urlImagen: '',
            stockActual: 0,
            stockMinimo: 0,
            fechaAlta: new Date(),
            fechaBaja: null,
            rubroArticulo: {id: 0, denominacion: '', rubroPadre: null, fechaAlta: null, fechaModificacion: null, fechaBaja: null },
            unidadMedida: {id: 0, denominacion: '', abreviatura: ''}
          }
      };

    //Producto seleccionado que se va a pasar como prop al Modal
        const [ingredient, setIngredient] = useState<Ingredient>(initializeNewIngredient);
    
    //Manejo de Modal
        const [showModal, setShowModal] = useState(false);
        const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
        const [title, setTitle] = useState("");

    //Logica de Modal
        const handleClick = (newTitle: string, ingredient: Ingredient, modal: ModalType) => {
            setTitle(newTitle);
            setModalType(modal)
            setIngredient(ingredient);
            setShowModal(true); 
         };

  return (
    <div className="m-3">

        {/* Botón para que cuando el usuario haga click llame a la función que declaramos */}
            <Button onClick={() => handleClick("Nuevo Ingrediente",
                initializeNewIngredient(), ModalType.CREATE)}>
                Nuevo ingrediente
            </Button>

    {isLoading ? <Loader/>: (
           
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Denominacion</th>
                    <th>Precio</th>
                    <th>Stock actual</th>
                    <th>Stock minimo</th>
                    <th>Rubro</th>
                    <th>Unidad Medida</th>
                    <th>Fecha Alta</th>
                    <th>Imagen</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {ingredients.map(ingredient => (
                    <tr key={ingredient.id} className={ingredient.fechaBaja ? 'table-danger' : ''}>
                        
                        <td> {ingredient.id} </td>
                        <td> {ingredient.denominacion} </td>
                        <td> {ingredient.precioCompra} </td>
                        <td> {ingredient.stockActual} </td>
                        <td> {ingredient.stockMinimo} </td>
                        <td> {ingredient.rubroArticulo.denominacion} </td>
                        <td> {ingredient.unidadMedida.abreviatura} </td>
                        <td> {formatDate(ingredient.fechaAlta)} </td>
                        <td> <img src={ingredient.urlImagen} alt={ingredient.denominacion} style={{width: '50px'}} /> </td>
                        <td>
                            <Button variant={"light"} onClick={() => handleClick("Editar ingrediente", ingredient, ModalType.UPDATE)}><Pencil color='orange'/></Button>
                            {ingredient.fechaBaja !== null && (
                                <Button variant={"light"} onClick={() => handleClick("Dar de alta ingrediente", ingredient, ModalType.RESTORE)}><ArrowUp color='green'/></Button>
                            )}
                            {ingredient.fechaBaja === null && (
                                <Button variant={"light"} onClick={() => handleClick("Dar de baja ingrediente", ingredient, ModalType.DELETE)}><ArrowDown color='red'/></Button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>

        </Table>

    )}

    {showModal && (
        <SaveIngredientModal 
        show = {showModal}
        onHide={() => setShowModal(false)}
        title={title}
        modalType={modalType}
        ingredient={ingredient}
        refreshData={setRefreshData}
        />  
        
    )}

    </div>
  )
}

export default IngredientsTable;