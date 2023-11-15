import { Factura } from "../types/Factura";
import { MPDatos } from "../types/MPDatos";

const BASE_URL = 'http://localhost:8080/api';

export const FacturaService = {

    
    getFacturas: async (): Promise<Factura[]> => {
       
        const response = await fetch(`${BASE_URL}/facturas`);
        const data = await response.json();
        return data;
    },
    
    getFactura: async (id:number): Promise<Factura> => {

        const response = await fetch (`${BASE_URL}/facturas/${id}`);
        const data = await response.json();
        return data;
        
    },

    createFactura:async (factura:Factura):Promise<Factura> => {

        const response = await fetch(`${BASE_URL}/facturas`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(factura)
        });

        const data = await response.json();
        return data;
        
    },

    updateFactura: async (id: number, factura: Factura): Promise<Factura> => {
        
        const response = await fetch(`${BASE_URL}/facturas/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(factura)
        });

        const data = await response.json();
        return data;
    },

    deleteFactura: async (id:number): Promise<void> => {
        await fetch(`${BASE_URL}/facturas/${id}`, {
            method: "DELETE"
        });
    },

    getMPDatos: async (): Promise<MPDatos[]> => {
       
        const response = await fetch(`${BASE_URL}/MPdatos`);
        const data = await response.json();
        return data;
    },
}
