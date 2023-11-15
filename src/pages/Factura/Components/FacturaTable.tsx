import { useEffect, useState } from "react"

import { Button, Table } from "react-bootstrap";
import Loader from "../../../components/Loader/Loader";
import { ArrowUp, ArrowDown, Pencil } from "react-bootstrap-icons";

import { ModalType } from "../../../types/ModalType";

import FacturaModal from "./FacturaModal";
import { Factura } from "../../../types/Factura";
import { FacturaService } from "../../../services/FacturaService";


const FacturaTable = () => {

    //Variable que va a contener los datos recibidos por la API
    const [facturas, setFacturas] = useState<Factura[]>([]);

    //Variable que muestra el componente Loader hasta que se reciban los datos de la API
    const [isLoading, setIsLoading] = useState(true);

    //Variable que va actualizar los datos de la tabla luego de cada operacion exitosa
    const [refreshData, setRefreshData] = useState(false);

    //Este hook se va a ejecutar cada vez que se renderice el componente o refreshData cambie de estado
    useEffect(() => {

        //Llamamos a la función para obtener todos los productos declarado en el service
        const fetchFacturas = async () => {
            const facturas = await FacturaService.getFacturas();
            setFacturas(facturas);
            setIsLoading(false);
        };

        fetchFacturas();
    }, [refreshData]);

    //Test, este log está modificado para que muestre los datos de una manera más legible
    console.log(JSON.stringify(facturas, null, 2));


    //Se inicializa un producto vacio cuando vayamos a crear uno nuevo, para evitar "undefined"
        const initializeNewFactura = (): Factura => {
        return {

            id: 0,
            fechaFacturacion: null,
            formaPago: null,
            totalVenta: 0,
            fechaBaja: null,
            fechaAlta: new Date(),
        }
      };

    //Producto seleccionado que se va a pasar como prop al Modal
        const [factura, setFactura] = useState<Factura>(initializeNewFactura);
    
    //Manejo de Modal
        const [showModal, setShowModal] = useState(false);
        const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
        const [title, setTitle] = useState("");

    //Logica de Modal
        const handleClick = (newTitle: string, factura: Factura, modal: ModalType) => {
            setTitle(newTitle);
            setModalType(modal)
            setFactura(factura);
            setShowModal(true); 
         };

  return (
    <div className="m-3">

        {/* Botón para que cuando el usuario haga click llame a la función que declaramos */}
            <Button onClick={() => handleClick("Nueva Factura",
                initializeNewFactura(), ModalType.CREATE)}>
                Nueva Factura
            </Button>

    {isLoading ? <Loader/>: (
           
        <Table>
            <thead>
                <tr>
                    <th>Nº de Factura</th>
                    <th>Fecha de facturacion</th>
                    <th>Total de venta</th>
                    <th>Forma de pago</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {facturas.map(factura => (
                    <tr key={factura.id} className={factura.fechaBaja ? 'table-danger' : ''}>
                        
                        <td> {factura.id} </td>
                        <td> {factura.fechaFacturacion?.toString()} </td>
                        <td> {factura.totalVenta} </td>
                        <td> {factura.formaPago?.toString()} </td>
                        <td>
                            <Button variant={"light"} onClick={() => handleClick("Editar factura", factura, ModalType.UPDATE)}><Pencil color='orange'/></Button>
                            {factura.fechaBaja !== null && (
                                <Button variant={"light"} onClick={() => handleClick("Dar de alta factura", factura, ModalType.RESTORE)}><ArrowUp color='green'/></Button>
                            )}
                            {factura.fechaBaja === null && (
                                <Button variant={"light"} onClick={() => handleClick("Dar de baja factura", factura, ModalType.DELETE)}><ArrowDown color='red'/></Button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>

        </Table>

    )}

    {showModal && (
        <FacturaModal 
        show = {showModal}
        onHide={() => setShowModal(false)}
        title={title}
        modalType={modalType}
        factura={factura}
        refreshData={setRefreshData}
        />  
    )}
    </div>
  )
}

export default FacturaTable;