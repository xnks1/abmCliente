
import { FormaPago } from "./Formadepago";

export type Factura = {

    id?: number;
    fechaFacturacion: Date | null;
    formaPago: FormaPago | null;
    totalVenta: number;
    fechaBaja: Date | null;
    fechaAlta: Date;
   
    
};