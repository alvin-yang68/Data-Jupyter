import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ModalMode } from '../../types';
import { AppState } from '../../store';
import { performFetchCheckpoints, performLoadCheckpoint } from '../../slices/checkpoint';
import { toggleModal } from '../../slices/notebook';
import CheckpointDetail from './CheckpointDetail';

export default function LoadCheckpoint(): React.ReactElement {
  const dispatch = useDispatch();
  const loading = useSelector<AppState, boolean>((state) => state.notebook.loading);
  const ids = useSelector<AppState, string[]>((state) => (
    state.checkpoint.map((checkpointDetail) => checkpointDetail.id)
  ));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(performFetchCheckpoints());
  }, []);

  const handleLoadCheckpoint = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selectedId) {
      setError('Invalid selection!');
      return;
    }
    dispatch(performLoadCheckpoint(selectedId));
    dispatch(toggleModal(ModalMode.None));
  };

  return (
    <>
      <div className="flex flex-col justify-center">
        {ids.length > 0
          ? (
            <ul className="divide-y divide-gray-300">
              {ids.map((id) => <CheckpointDetail key={id} id={id} selectedId={selectedId} setSelectedId={setSelectedId} />)}
            </ul>
          )
          : <span className="m-4">{loading ? 'Loading...' : 'No checkpoint has been created'}</span>}
      </div>
      <div className="flex justify-end items-center w-100 border-t px-2">
        {error && <span className="px-4 py-2 text-red-500">{error}</span>}
        <button onClick={handleLoadCheckpoint} type="submit" className="button bg-blue-600 hover:bg-blue-700">Load</button>
      </div>
    </>
  );
}