import React from 'react';

import { dispatch } from '../store';
import { performUploadDataset } from '../slices/notebook';

export default function UploadDataset(): React.ReactElement {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    // Attach to a `FormData` with an encoding type of "multipart/form-data"
    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    dispatch(performUploadDataset(formData));
  };

  return (
    <div className="mx-auto w-64">
      <label htmlFor="file" className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue-600 rounded-lg shadow-lg tracking-wide uppercase border border-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white">
        <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
        <span className="mt-2 text-base leading-normal">Select a CSV file</span>
        <input
          id="file"
          type="file"
          name="dataset"
          accept=".csv"
          onChange={handleChange}
          className="hidden"
        />
      </label>
    </div>
  );
}
