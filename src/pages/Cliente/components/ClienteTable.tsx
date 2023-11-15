import { useEffect, useState } from "react"
import { Cliente } from '../../../types/Cliente';
import { ClienteService } from '../../../services/ClienteService';

import { Button, Table } from "react-bootstrap";
import Loader from "../../../components/Loader/Loader";
import { ArrowUp, ArrowDown, Pencil } from "react-bootstrap-icons";

import { ModalType } from "../../../types/ModalType";

import SaveClienteModal from './ClienteModal';


const ClienteTable = () => {

    //Variable que va a contener los datos recibidos por la API
    const [clientes, setClientes] = useState<Cliente[]>([]);

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

        //Llamamos a la función para obtener todos los clientes declarado en el service
        const fetchClientes = async () => {
            const cliente = await ClienteService.getClientes();
            setClientes(cliente);
            setIsLoading(false);
        };

        fetchClientes();
    }, [refreshData]);

    //Test, este log está modificado para que muestre los datos de una manera más legible
    console.log(JSON.stringify(clientes, null, 2));


    //Se inicializa un cliente vacio cuando vayamos a crear uno nuevo, para evitar "undefined"
        const initializeNewCliente = (): Cliente => {
        return {
            id: 0,
             nombre: '',
            apellido:'',
            telefono:'',
            email:'',
            fechaAlta: new Date(),
            fechaBaja: null,
            fechaModificacion:null,
            usuario: {
                rol: null,
                auth0Id:'',
                username:'',
                contraseña:'',
                fechaAlta: null,
                fechaBaja: null,
          }
        };
    }
    //cliente seleccionado que se va a pasar como prop al Modal
        const [cliente, setCliente] = useState<Cliente>(initializeNewCliente);
    
    //Manejo de Modal
        const [showModal, setShowModal] = useState(false);
        const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
        const [title, setTitle] = useState("");

    //Logica de Modal
        const handleClick = (newTitle: string, cliente: Cliente, modal: ModalType) => {
            setTitle(newTitle);
            setModalType(modal)
            setCliente(cliente);
            setShowModal(true); 
         };

  return (
    <div className="m-3">

        {/* Botón para que cuando el usuario haga click llame a la función que declaramos */}
            <Button onClick={() => handleClick("Nuevo cliente",
                initializeNewCliente(), ModalType.CREATE)}>
                Nuevo cliente
            </Button>

     {isLoading ? <Loader/>: (
           
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Telefono</th>
                    <th>Email</th>
                    <th>FechaAlta</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {clientes.map(cliente => (
                    <tr key={cliente.id} className={cliente.fechaBaja ? 'table-danger' : ''}>
                        
                        <td> {cliente.id} </td>
                        <td> {cliente.nombre} </td>
                        <td> {cliente.apellido} </td>
                        <td> {cliente.telefono} </td>
                        <td> {cliente.email} </td>
                        <td> {formatDate(cliente.fechaAlta)} </td>
                     
        
                        <td>
                            <Button variant={"light"} onClick={() => handleClick("Editar Cliente", cliente, ModalType.UPDATE)}><Pencil color='orange'/></Button>
                            {cliente.fechaBaja !== null && (
                                <Button variant={"light"} onClick={() => handleClick("Dar de alta cliente", cliente, ModalType.RESTORE)}><ArrowUp color='green'/></Button>
                            )}
                            {cliente.fechaBaja === null && (
                                <Button variant={"light"} onClick={() => handleClick("Dar de baja cliente", cliente, ModalType.DELETE)}><ArrowDown color='red'/></Button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>

        </Table>

    )}

    {showModal && (
        <SaveClienteModal 
        show = {showModal}
        onHide={() => setShowModal(false)}
        title={title}
        modalType={modalType}
        cliente={cliente}
        refreshData={setRefreshData}
        />  
        
    )}

    </div>
  )
}
export default ClienteTable;