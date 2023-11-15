import { Usuario } from "./Usuario";

export type Cliente = {

    id?: number;
    nombre:string;
    apellido:string;
    telefono:string;
    email:string;
    usuario: Usuario;
    fechaAlta: Date;
    fechaBaja: Date | null;
    fechaModificacion:Date|null;





        

}