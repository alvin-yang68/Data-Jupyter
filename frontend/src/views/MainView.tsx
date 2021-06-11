import React from 'react';

import DatasetSelect from '../components/DatasetSelect';
import DataBrowser from '../components/DataBrowser';
import CellsList from '../components/editor/CellsList';

function MainView(): React.ReactElement {
  return (
    <div className="w-screen flex flex-col justify-center">
      <nav className="flex flex-row items-center px-8 py-1 bg-blue-600 border-b-8 border-blue-200">
        <div className="flex flex-row items-center text-white">
          <a href="index" className="no-underline py-2 hover:text-gray-300"><h1 className="font-bold text-3xl">Data Jupyter</h1></a>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-4 h-screen text-center">
        <div className="pt-16">
          <h1 className="font-bold text-3xl uppercase p-4">Choose a dataset</h1>
          <DatasetSelect />
        </div>
        <div className="grid grid-cols-2 gap-6 py-4">
          <CellsList />
          <DataBrowser />
        </div>
      </main>
    </div>
  );
}

export default MainView;
