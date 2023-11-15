export type Domicilio = {
    id: number;
    calle: string;
    codigoPostal: number;
    fechaAlta: Date;
    fechaBaja: Date | null;
    fechaModificacion: Date | null;
    localidad: string;
    numero: number;
    numeroDpto: number;
    pisoDpto: number;

};