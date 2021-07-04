import React, { useState } from 'react';

import { dispatch } from '../store';
import { ModalMode } from '../types';
import { performSaveCheckpoint } from '../slices/checkpoint';
import { toggleModal } from '../slices/notebook';

export default function SaveCheckpoint(): React.ReactElement {
  const [checkpointName, setCheckpointName] = useState<string>('');

  const timestamp = new Date().toLocaleString();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If no name provided, then defaults to the current timestamp
    if (checkpointName === '') setCheckpointName(timestamp);

    dispatch(performSaveCheckpoint(checkpointName));
    dispatch(toggleModal(ModalMode.None));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex justify-center">
        <div className="my-4">
          <input
            autoFocus
            type="text"
            placeholder={timestamp}
            value={checkpointName}
            onChange={(e) => setCheckpointName(e.target.value)}
            className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
          />

          <button
            type="submit"
            className="button-reliefpx-8 rounded-r-lg bg-blue-700  text-white font-bold p-4 uppercase border-blue-800 border-t border-b border-r"
          >
            Save

          </button>
        </div>
      </form>
    </>
  );
}
