import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import * as React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import { Pencil, Trash } from 'react-bootstrap-icons';

import { RubroArticuloInsumo } from '../../../types/RubroArticuloInsumo';
import DataRubroArticuloInsumo from '../../../lib/data-RubroArticuloInsumo';

const DeleteRubroArticuloInsumoModal = React.lazy(() => import('./DeleteRubroArticuloInsumoModal'));
const SaveRubroArticuloInsumoModal = React.lazy(() => import('./SaveRubroArticuloInsumoModal'));

type RubroArticuloInsumoTableProps = {
    rubroArticuloInsumo: RubroArticuloInsumo[];
};

const emptyRubroArticuloInsumo: RubroArticuloInsumo = {
    rubroPadre: {id: 0, denominacion: '', rubroPadre: null, fechaAlta: null, fechaModificacion: null, fechaBaja: null },
    id: 0,
    denominacion: '',
    fechaAlta: null, 
    fechaModificacion: null,
    fechaBaja: null,
};

const RubroArticuloInsumoTable: React.FC<RubroArticuloInsumoTableProps> = ({ rubroArticuloInsumo }) => {
  // State
  const [error, setError] = React.useState<any>(null);
  const [listedRubroArticuloInsumo, setListedRubroArticuloInsumo] = React.useState<RubroArticuloInsumo[]>(rubroArticuloInsumo);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedRubroArticuloInsumo, setSelectedRubroArticuloInsumo] = React.useState<RubroArticuloInsumo | null>(null);
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
  const [showSaveModal, setShowSaveModal] = React.useState<boolean>(false);

  // Handlers
  const onCloseDeleteModal = React.useCallback(() => setShowDeleteModal(false), [setShowDeleteModal]);
  const onCloseSaveModal = React.useCallback(() => setShowSaveModal(false), [setShowSaveModal]);
  
  const onDelete = React.useCallback(() => {
    if (selectedRubroArticuloInsumo) {
      setShowDeleteModal(false);
      setLoading(true);
      DataRubroArticuloInsumo.delete.rubroArticuloInsumo(selectedRubroArticuloInsumo.id!)
        .then(() => setListedRubroArticuloInsumo((prevState: RubroArticuloInsumo[]) => prevState.filter((item: RubroArticuloInsumo) => item.id !== selectedRubroArticuloInsumo.id)))
        .catch((error: any) => setError(error))
        .finally(() => setLoading(false));
    }
  }, [selectedRubroArticuloInsumo, setShowDeleteModal, setListedRubroArticuloInsumo, setLoading]);
  
  
  const onSave = React.useCallback((i: RubroArticuloInsumo) => {
    if (selectedRubroArticuloInsumo) {
      setShowSaveModal(false);
      setLoading(true);
      if (i.id) {
        DataRubroArticuloInsumo.update.rubroArticuloInsumo(i)
          .then((editedRubroArticuloInsumo: RubroArticuloInsumo) => setListedRubroArticuloInsumo((prevState: RubroArticuloInsumo[]) => prevState.map((item: RubroArticuloInsumo) => item.id === editedRubroArticuloInsumo.id ? editedRubroArticuloInsumo : item)))
          .catch((error: any) => setError(error))
          .finally(() => setLoading(false));
      } else {
        // Delete id property since it is a create action
        delete i.id;

        DataRubroArticuloInsumo.create.rubroArticuloInsumo(i)
          .then((createdRubroArticuloInsumo: RubroArticuloInsumo) => {
            setListedRubroArticuloInsumo((prevState: RubroArticuloInsumo[]) => [...prevState, createdRubroArticuloInsumo]);
          })
          .catch((error: any) => setError(error))
          .finally(() => setLoading(false));
      }
    }
  }, [selectedRubroArticuloInsumo, setShowSaveModal, setListedRubroArticuloInsumo, setLoading]);
  const onShowDeleteModal = React.useCallback((i: RubroArticuloInsumo) => {
    setSelectedRubroArticuloInsumo(i);
    setShowDeleteModal(true);
  }, [setSelectedRubroArticuloInsumo, setShowDeleteModal]);
  const onShowSaveModal = React.useCallback((i?: RubroArticuloInsumo) => {
    setSelectedRubroArticuloInsumo(i ?? emptyRubroArticuloInsumo);
    setShowSaveModal(true);
  }, [setSelectedRubroArticuloInsumo, setShowSaveModal])

  // Render
  if (error) {
    return (
      <Alert variant="danger">
        {error?.message || 'Something went wrong while fetching ingredients.'}
      </Alert>
    );
  }

  return (
    <React.Suspense fallback={<Spinner animation="border" />}>
      {
        loading
          ? (
            <div style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center', width: '100wh' }}>
              <Spinner animation="border" />
            </div>
          )
          : (
            <>
              <Button onClick={() => onShowSaveModal()} style={{ float: 'right', margin: 10 }} variant="primary">Agregar Rubro Articulo Insumo</Button>
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Rubro Padre</th>
                    <th>Denominacion</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    listedRubroArticuloInsumo.map((i: RubroArticuloInsumo) => (
                      <tr 
                      key={i.id}
                      className={i.fechaBaja ? 'table-danger' : ''}>
                        <td width='5%'>{i.id}</td>
                        <td width='25%'>{i.rubroPadre?.denominacion}</td>
                        <td width='25%'>{i.denominacion}</td>
                        <td width='10%'>
                          <Button onClick={() => onShowSaveModal(i)} variant="link"><Pencil color='orange'/></Button>
                          <Button onClick={() => onShowDeleteModal(i)} variant="link"><Trash color='red'/></Button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </>
          )
      }
      <DeleteRubroArticuloInsumoModal
        onDelete={onDelete}
        onHide={onCloseDeleteModal}
        rubroArticuloInsumo={selectedRubroArticuloInsumo}
        show={showDeleteModal}
      />
      <SaveRubroArticuloInsumoModal
        onHide={onCloseSaveModal}
        onSave={onSave}
        rubroArticuloInsumo={selectedRubroArticuloInsumo}
        show={showSaveModal}
      />
    </React.Suspense>
  );
};

export default RubroArticuloInsumoTable;