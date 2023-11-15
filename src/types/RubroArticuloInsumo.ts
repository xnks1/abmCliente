export type RubroArticuloInsumo = {
    rubroPadre : RubroArticuloInsumo | null; 
    id?: number;
    denominacion: string;
    fechaAlta : Date | null;
    fechaModificacion : Date | null;
    fechaBaja : Date | null;
}