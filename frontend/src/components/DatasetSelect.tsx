import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

import { AppState } from '../store';
import { performFetchDataset } from '../slices/notebook';

function DatasetSelect(): React.ReactElement {
  const dispatch = useDispatch();
  const loading = useSelector<AppState, boolean>((state) => state.notebook.loading);
  const loadError = useSelector<AppState, string | null>((state) => state.notebook.error);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(performFetchDataset(data.dataset));
  };

  return (
    <form
      className="flex flex-col items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="movies_incorrect">
        <input
          {...register('dataset', { required: true })}
          id="movies_incorrect"
          type="radio"
          value="movies_incorrect"
        />
        <span className="ml-2 inline-block">movies_incorrect</span>
      </label>
      <label htmlFor="nobel_prizes_incorrect">
        <input
          {...register('dataset', { required: true })}
          id="nobel_prizes_incorrect"
          type="radio"
          value="nobel_prizes_incorrect"
        />
        <span className="ml-2 inline-block">nobel_prizes_incorrect</span>
      </label>
      {errors.dataset && <span className="py-2 text-red-500">Please choose a dataset</span>}
      {loadError && <span className="py-2 text-red-500">{loadError}</span>}
      <button type="submit" className="rounded my-4 px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg bg-blue-700 border-blue-800 text-white">
        {loading && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 inline-block animate-spin transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        )}
        Load
      </button>
    </form>
  );
}

export default DatasetSelect;
