import { RubroArticuloInsumo } from "./RubroArticuloInsumo";
import { UnidadMedida } from "./UnidadMedida";

export type Ingredient = {
    id: number;
    denominacion: string;
    precioCompra: number;
    urlImagen: string;
    stockActual: number;
    stockMinimo: number;
    fechaAlta: Date;
    fechaBaja: Date | null;
    rubroArticulo: RubroArticuloInsumo;
    unidadMedida: UnidadMedida;
};