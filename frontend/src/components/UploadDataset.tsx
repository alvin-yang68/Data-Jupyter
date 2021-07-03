import React, { useState } from 'react';

import { dispatch } from '../store';
import { performUploadDataset } from '../slices/notebook';

const uploadCloudIcon = (
  <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
  </svg>
);

const circleCheckIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function UploadDataset(): React.ReactElement {
  const [filename, setFilename] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setFilename(file.name);

    // Attach to a `FormData` with an encoding type of "multipart/form-data"
    const formData = new FormData();
    formData.append('file', file);

    dispatch(performUploadDataset(formData))
      .catch(() => setFilename(null));
  };

  return (
    <div className="mx-auto w-64">
      <label htmlFor="file" className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue-600 rounded-lg shadow-lg tracking-wide uppercase border border-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white">
        {filename ? circleCheckIcon : uploadCloudIcon}
        <span className="mt-2 text-base leading-normal">
          {filename || 'Select a CSV file'}
        </span>
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
