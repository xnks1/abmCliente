import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap";
import Loader from "../../../components/Loader/Loader";
import { ArrowUp, ArrowDown, Pencil } from "react-bootstrap-icons";

import { ModalType } from "../../../types/ModalType";

import SaveDomicilioModal from './DomicilioModal';
import { DomicilioService } from "../../../services/DomicilioService";
import { Domicilio } from "../../../types/Domicilio";


const DomicilioTable = () => {

    //Variable que va a contener los datos recibidos por la API
    const [Domicilio, setDomicilio] = useState<Domicilio[]>([]);

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
            const domicilio = await DomicilioService.getDomicilios();
            setDomicilio(domicilio);
            setIsLoading(false);
        };

        fetchIngredients();
    }, [refreshData]);

    //Test, este log está modificado para que muestre los datos de una manera más legible
    console.log(JSON.stringify(Domicilio, null, 2));


    //Se inicializa un producto vacio cuando vayamos a crear uno nuevo, para evitar "undefined"

        const initializeNewDomicilio = (): Domicilio => {
            return {
                id: 0,
                calle: '',
                codigoPostal: 0,
                fechaModificacion: null,
                fechaAlta: new Date(),
                fechaBaja: null,
                localidad: '',
                numero: 0,
                numeroDpto: 0,
                pisoDpto: 0,

            }
        };
    

    //Producto seleccionado que se va a pasar como prop al Modal
        const [domicilios, setDomicilios] = useState<Domicilio>(initializeNewDomicilio);
    
    //Manejo de Modal
        const [showModal, setShowModal] = useState(false);
        const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
        const [title, setTitle] = useState("");

    //Logica de Modal
        const handleClick = (newTitle: string, domicilios: Domicilio, modal: ModalType) => {
            setTitle(newTitle);
            setModalType(modal)
            setDomicilios(domicilios);
            setShowModal(true); 
         };

  return (
    <div className="m-3">

        {/* Botón para que cuando el usuario haga click llame a la función que declaramos */}
            <Button onClick={() => handleClick("Nuevo domicilio",
                initializeNewDomicilio(), ModalType.CREATE)}>
                Nuevo domicilio
            </Button>

    {isLoading ? <Loader/>: (
           
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Calle</th>
                    <th>Código Postal</th>
                    <th>Localidad</th>
                    <th>Número</th>
                    <th>Número departamento</th>
                    <th>Piso departamento</th>
                    <th>Fecha Alta</th>
                </tr>
            </thead>
            <tbody>
                {Domicilio.map(domicilio => (
                    <tr key={domicilio.id} className={domicilio.fechaBaja ? 'table-danger' : ''}>
                        
                        <td> {domicilio.id} </td>
                        <td> {domicilio.calle} </td>
                        <td> {domicilio.codigoPostal} </td>
                        <td> {domicilio.localidad} </td>
                        <td> {domicilio.numero} </td>
                        <td> {domicilio.numeroDpto} </td>
                        <td> {domicilio.pisoDpto} </td>
                        <td> {formatDate(domicilio.fechaAlta)} </td>
                        <td>
                            <Button variant={"light"} onClick={() => handleClick("Editar ingrediente", domicilio, ModalType.UPDATE)}><Pencil color='orange'/></Button>
                            {domicilio.fechaBaja !== null && (
                                <Button variant={"light"} onClick={() => handleClick("Dar de alta domicilio", domicilio, ModalType.RESTORE)}><ArrowUp color='green'/></Button>
                            )}
                            {domicilio.fechaBaja === null && (
                                <Button variant={"light"} onClick={() => handleClick("Dar de baja domicilio", domicilio, ModalType.DELETE)}><ArrowDown color='red'/></Button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>

        </Table>

    )}

    {showModal && (
        <SaveDomicilioModal 
        show = {showModal}
        onHide={() => setShowModal(false)}
        title={title}
        modalType={modalType}
        domicilio={domicilios}
        refreshData={setRefreshData}
        />  
        
    )}

    </div>
  )
}

export default DomicilioTable;