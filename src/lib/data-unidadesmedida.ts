// data-unidadMedida.ts
import { UnidadMedida } from "../types/UnidadMedida";

const API_BASE_URL: string = 'http://localhost:8080/api/unidadMedida';

const fetchApiCall = async (method: 'GET' | 'POST' | 'PUT' | 'DELETE', id?: number, payload?: UnidadMedida): Promise<any> => {
  const options: any = { headers: { 'Content-Type': 'application/json' }, method };

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  const response = await fetch(id ? `${API_BASE_URL}/${id}` : API_BASE_URL, options);
  const data = await response.json();

  return data;
};

const fnCreateUnidadMedida = async (unidad_medida: UnidadMedida) => fetchApiCall('POST', undefined, unidad_medida);
const fnDeleteUnidadMedida = async (id: number) => fetchApiCall('DELETE', id);
const fnFetchUnidadMedidas = async () => fetchApiCall('GET', undefined, undefined);  // Corrección aquí
const fnUpdateUnidadMedida = async (unidad_medida: UnidadMedida) => fetchApiCall('PUT', unidad_medida.id, unidad_medida);

type DataUnidadMedida = {
  create: {
    unidadmedida: typeof fnCreateUnidadMedida,
  },
  delete: {
    unidadmedida: typeof fnDeleteUnidadMedida,
  },
  fetch: {
    unidadmedidas: typeof fnFetchUnidadMedidas,
  },
  update: {
    unidadmedida: typeof fnUpdateUnidadMedida,
  }
};

const DataUnidadMedida: DataUnidadMedida = {
  create: {
    unidadmedida: fnCreateUnidadMedida,
  },
  delete: {
    unidadmedida: fnDeleteUnidadMedida,
  },
  fetch: {
    unidadmedidas: fnFetchUnidadMedidas,
  },
  update: {
    unidadmedida: fnUpdateUnidadMedida,
  }
};

export default DataUnidadMedida;
