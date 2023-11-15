import { Usuario } from "./Usuario";

export type Cliente = {

    id?: number;
    nombre:String;
    apellido:String;
    telefono:String;
    email:String;
    usuario: Usuario;
    fechaAlta: Date;
    fechaBaja: Date | null;
    fechaModificacion:Date|null;





        

}