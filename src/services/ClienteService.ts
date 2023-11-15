import { Cliente } from "../types/Cliente";


const BASE_URL = 'https://buensaborbluelabel.onrender.com/api';

export const ClienteService = {

    
    getClientes: async (): Promise<Cliente[]> => {
       
        const response = await fetch(`${BASE_URL}/clientes`);
        const data = await response.json();
        return data;
    },

    
    getCliente: async (id:number): Promise<Cliente> => {

        const response = await fetch (`${BASE_URL}/clientes/${id}`);
        const data = await response.json();
        return data;
        
    },

    createCliente:async (cliente:Cliente):Promise<Cliente> => {

        const response = await fetch(`${BASE_URL}/clientes`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });

        const data = await response.json();
        return data;
        
    },

    updateCliente: async (id: number, cliente: Cliente): Promise<Cliente> => {
        
        const response = await fetch(`${BASE_URL}/clientes/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(cliente)
        });

        const data = await response.json();
        return data;
    },

    

    deleteCliente: async (id:number): Promise<void> => {
        await fetch(`${BASE_URL}/clientes/${id}`, {
            method: "DELETE"
        });
    },

   
}
