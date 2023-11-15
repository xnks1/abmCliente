import { Ingredient } from "../types/Ingredient";
import { RubroArticuloInsumo } from "../types/RubroArticuloInsumo";
import { UnidadMedida } from "../types/UnidadMedida";

const BASE_URL = 'http://localhost:8080/api';

export const IngredientService = {

    
    getIngredients: async (): Promise<Ingredient[]> => {
       
        const response = await fetch(`${BASE_URL}/articulosinsumo`);
        const data = await response.json();
        return data;
    },

    
    getIngredient: async (id:number): Promise<Ingredient> => {

        const response = await fetch (`${BASE_URL}/articulosinsumo/${id}`);
        const data = await response.json();
        return data;
        
    },

    createIngredient:async (ingredient:Ingredient):Promise<Ingredient> => {

        const response = await fetch(`${BASE_URL}/articulosinsumo`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ingredient)
        });

        const data = await response.json();
        return data;
        
    },

    updateIngredient: async (id: number, ingredient: Ingredient): Promise<Ingredient> => {
        
        const response = await fetch(`${BASE_URL}/articulosinsumo/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(ingredient)
        });

        const data = await response.json();
        return data;
    },

    

    deleteIngredient: async (id:number): Promise<void> => {
        await fetch(`${BASE_URL}/articulosinsumo/${id}`, {
            method: "DELETE"
        });
    },

    getRubros: async (): Promise<RubroArticuloInsumo[]> => {
       
        const response = await fetch(`${BASE_URL}/rubrosarticulo`);
        const data = await response.json();
        return data;
    },

    getUnidades: async (): Promise<UnidadMedida[]> => {
       
        const response = await fetch(`${BASE_URL}/unidadMedida`);
        const data = await response.json();
        return data;
    },
    
}
