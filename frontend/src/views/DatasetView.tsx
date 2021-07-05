import React from 'react';

import UploadDataset from '../components/UploadDataset';

export default function DatasetView(): React.ReactElement {
  return (
    <div className="h-full container mx-auto px-4 pt-16 text-center">
      <h1 className="font-bold text-5xl p-4 border-b-2 border-gray-300">
        Dataset
      </h1>

      <div className="my-8 grid grid-cols-4">
        <div />

        <div className="py-8 col-span-2 bg-white rounded-lg shadow">
          <h1 className="mb-4 font-bold text-3xl uppercase">
            Upload a dataset
          </h1>

          <UploadDataset />
        </div>
      </div>

      <div />
    </div>
  );
}
