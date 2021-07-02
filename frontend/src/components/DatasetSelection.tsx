import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { AppState, dispatch } from '../store';
import { selectDataset } from '../slices/notebook';
import ErrorMessage from './errors/ErrorMessage';

interface IProps {
  demoDatasets: string[];
}

export default function DatasetSelection({ demoDatasets }: IProps): React.ReactElement {
  const selectedDataset = useSelector<AppState, string | null>((state) => state.notebook.selectedDataset);

  const [error, setError] = useState<string | null>(null);

  const [selection, setSelection] = useState<string>('NONE');

  // If `selectedDataset` changed (e.g. through a checkpoint load), then update the value of
  // the `select` form to match it
  useEffect(() => {
    if (selectedDataset === null) return;
    setSelection(selectedDataset);
  }, [selectedDataset]);

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelection(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selection === 'NONE') {
      setError('No dataset selected.');
      return;
    }

    dispatch(selectDataset(selection));
    setError(null);
  };

  const renderOption = (name: string) => (
    <option
      key={name}
      value={name}
      className={`ml-2 inline-block ${selectedDataset === name && 'font-bold'}`}
    >
      {name}
    </option>
  );

  return (
    <>
      <form onSubmit={handleSubmit} className="mx-auto flex flex-col gap-4 items-center">
        <select
          value={selection}
          onChange={handleSelectionChange}
          className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
        >

          <option disabled selected value="NONE"> -- select an option -- </option>

          {demoDatasets.map((name) => renderOption(name))}

        </select>

        <input type="submit" value="Select" className="cursor-pointer button-relief" />
      </form>
      <div className={`transition duration-500 ease-in-out ${error ? 'opacity-100' : 'opacity-0'}`}>
        {!!error && <ErrorMessage error={error} setError={setError} />}
      </div>
    </>
  );
}
