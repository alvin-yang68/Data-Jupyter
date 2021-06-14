import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

import { AppState } from '../store';
import { selectDataset, performLoadDataset } from '../slices/notebook';

function DatasetSelection(): React.ReactElement {
  const dispatch = useDispatch();
  const loadError = useSelector<AppState, string | null>((state) => state.notebook.error);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(selectDataset(data.dataset));
    dispatch(performLoadDataset());
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
      <button type="submit" className="button-relief">
        Load
      </button>
    </form>
  );
}

export default DatasetSelection;
