import * as React from 'react';

import DataLayer from '../lib/data-RubroArticuloInsumo';
import { RubroArticuloInsumo } from '../types/RubroArticuloInsumo';

type UseRubroArticuloInsumosState = {
  data: RubroArticuloInsumo[];
  error: any;
  loading: boolean;
};

const initialState: UseRubroArticuloInsumosState = {
  data: [],
  error: null,
  loading: true,
};

const useRubroArticuloInsumo = () => {
  // State
  const [state, setState] = React.useState<UseRubroArticuloInsumosState>(initialState);

  // Effects
  React.useEffect(function fetchRubroArticuloInsumo() {
    DataLayer.fetch.rubroArticuloInsumo()
      .then((data: RubroArticuloInsumo[]) => setState({ data, error: null, loading: false }))
      .catch((error: any) => setState({ data: [], error, loading: false }));
  }, [setState]);

  return state;
};

export default useRubroArticuloInsumo;