import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../store';
import { performLoadCheckpoint } from '../../slices/checkpoint';
import { toggleCheckpointModal } from '../../slices/notebook';
import Checkpoint from './Checkpoint';

function CheckpointsList(): React.ReactElement {
  const dispatch = useDispatch();
  const ids = useSelector<AppState, string[]>((state) => (
    state.checkpoint.map((checkpointDetail) => checkpointDetail.id)
  ));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLoadCheckpoint = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selectedId) {
      setError('Invalid selection!');
      return;
    }
    dispatch(performLoadCheckpoint(selectedId));
    dispatch(toggleCheckpointModal(false));
  };

  return (
    <div className="bg-gray-400 h-screen w-screen flex justify-center items-center">
      <div className="mb-24 bg-white rounded shadow-lg w-2/12">
        <div className="border-b px-4 py-2 flex justify-between items-center">
          <h3 className="font-semibold text-lg uppercase">Load checkpoint</h3>
          <svg onClick={() => dispatch(toggleCheckpointModal(false))} xmlns="http://www.w3.org/2000/svg" className="button-icon hover:text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div className="flex flex-col justify-center">
          {ids.length > 0
            ? (
              <ul className="divide-y divide-gray-300">
                {ids.map((id) => <Checkpoint key={id} id={id} selectedId={selectedId} setSelectedId={setSelectedId} />)}
              </ul>
            )
            : 'No checkpoint available'}
        </div>
        <div className="flex justify-end items-center w-100 border-t px-2">
          {error && <span className="px-4 py-2 text-red-500">{error}</span>}
          <button onClick={handleLoadCheckpoint} type="submit" className="button bg-blue-600 hover:bg-blue-700">Load</button>
        </div>
      </div>
    </div>
  );
}

export default CheckpointsList;
