import { RubroArticuloInsumo } from "../types/RubroArticuloInsumo";
const API_BASE_URL: string = 'http://localhost:8080/api/rubrosarticulo';

const fetchApiCall = async (method: 'GET' | 'POST' | 'PUT' | 'DELETE', id?: number, payload?: RubroArticuloInsumo): Promise<any> => {
  const options: any = { headers: { 'Content-Type': 'application/json' }, method };

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  const response = await fetch(id ? `${API_BASE_URL}/${id}` : API_BASE_URL, options);
  const data = await response.json();

  return data;
};

const fnCreateRubroArticuloInsumo = async (rubroArticuloInsumo: RubroArticuloInsumo) => fetchApiCall('POST', undefined, rubroArticuloInsumo);
const fnDeleteRubroArticuloInsumo = async (id: number) => fetchApiCall('DELETE', id);
const fnFetchRubroArticuloInsumo = async () => fetchApiCall('GET');
const fnUpdateRubroArticuloInsumo = async (rubroArticuloInsumo: RubroArticuloInsumo) => fetchApiCall('PUT', rubroArticuloInsumo.id, rubroArticuloInsumo);

type DataRubroArticuloInsumo = {
  create: {
    rubroArticuloInsumo: typeof fnCreateRubroArticuloInsumo,
  },
  delete: {
    rubroArticuloInsumo: typeof fnDeleteRubroArticuloInsumo,
  },
  fetch: {
    rubroArticuloInsumo: typeof fnFetchRubroArticuloInsumo,
  },
  update: {
    rubroArticuloInsumo: typeof fnUpdateRubroArticuloInsumo,
  }
};

const DataRubroArticuloInsumo: DataRubroArticuloInsumo = {
  create: {
    rubroArticuloInsumo: fnCreateRubroArticuloInsumo,
  },
  delete: {
    rubroArticuloInsumo: fnDeleteRubroArticuloInsumo,
  },
  fetch: {
    rubroArticuloInsumo: fnFetchRubroArticuloInsumo,
  },
  update: {
    rubroArticuloInsumo: fnUpdateRubroArticuloInsumo,
  }
};

export default DataRubroArticuloInsumo;