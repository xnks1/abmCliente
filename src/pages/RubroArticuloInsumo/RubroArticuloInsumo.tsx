import Alert from "react-bootstrap/Alert";
import * as React from 'react';
import Spinner from "react-bootstrap/Spinner";

import useRubroArticuloInsumo from "../../hooks/useRubroArticuloInsumo";

const RubroArticuloInsumoTable = React.lazy(() => import('./Componentes/RubroArticuloInsumoTable'));

const RubroArticuloInsumo: React.FC = () => {
  // Utils
  const { data, error, loading } = useRubroArticuloInsumo();

  // Render
  if (error) {
    return (
      <Alert variant="danger">
        {error?.message || 'Something went wrong while fetching ingredients.'}
      </Alert>
    );
  }

  return loading
    ? (
      <div style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center', width: '100wh' }}>
        <Spinner animation="border" />
      </div>
    )
    : (
      <React.Suspense fallback={<Spinner animation="border" />}>
        <RubroArticuloInsumoTable rubroArticuloInsumo={data} />
      </React.Suspense>
    )
};

export default RubroArticuloInsumo;