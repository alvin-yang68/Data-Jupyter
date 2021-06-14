import React from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../store';
import DatasetSelection from '../components/DatasetSelection';
import DataBrowser from '../components/DataBrowser';
import CellsList from '../components/editor/CellsList';
import CheckpointsList from '../components/checkpoint/CheckpointsList';

function HomeView(): React.ReactElement {
  const showCheckpointModal = useSelector<AppState, boolean>((state) => state.notebook.showCheckpointModal);

  return (
    <div className="h-full w-screen flex flex-col justify-center">
      <nav className="flex flex-row items-center px-8 py-1 bg-blue-600 border-b-8 border-blue-200">
        <div className="flex flex-row items-center text-white">
          <a href="index" className="no-underline py-2 hover:text-gray-300"><h1 className="font-bold text-3xl">Data Jupyter</h1></a>
        </div>
      </nav>
      {showCheckpointModal ? <CheckpointsList /> : (
        <div className="bg-gray-100">
          <main className="h-full container mx-auto px-4 py-4 text-center">
            <div className="pt-16">
              <h1 className="font-bold text-3xl uppercase p-4">Choose a demo dataset</h1>
              <DatasetSelection />
            </div>
            <div className="grid grid-cols-2 gap-6 py-4">
              <CellsList />
              <DataBrowser />
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

export default HomeView;
