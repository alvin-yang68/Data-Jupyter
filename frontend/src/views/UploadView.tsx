import React from 'react';

import UploadDataset from '../components/UploadDataset/UploadFile';

export default function UploadView(): React.ReactElement {
  return (
    <div className="h-full container mx-auto px-4 pt-16 text-center">
      <h1 className="font-bold text-5xl p-4 border-b-2 border-gray-300">
        Dataset
      </h1>

      <div className="my-4 bg-white rounded-lg shadow">
        <h1 className="font-semibold text-2xl p-4">
          Upload
        </h1>

        <h3 className="font-bold text-xl uppercase p-4">1. Select a database model</h3>

        <h3 className="font-bold text-xl uppercase p-4">2. Upload a CSV</h3>

        <UploadDataset />
      </div>
    </div>
  );
}
