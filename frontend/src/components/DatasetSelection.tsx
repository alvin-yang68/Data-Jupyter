import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

import { AppState } from '../store';
import { selectDataset } from '../slices/notebook';

interface IProps {
  demoDatasets: string[];
}

function DatasetSelection({ demoDatasets }: IProps): React.ReactElement {
  const dispatch = useDispatch();
  const selectedDataset = useSelector<AppState, string | null>((state) => state.notebook.selectedDataset);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => dispatch(selectDataset(data.dataset));

  const radioField = (name: string) => (
    <label key={name} htmlFor={name}>
      <input
        {...register('dataset', { required: true })}
        id={name}
        type="radio"
        value={name}
      />
      <span className={`ml-2 inline-block ${selectedDataset === name && 'font-bold'}`}>
        {name}
      </span>
    </label>
  );

  return (
    <form
      className="flex flex-col items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      {demoDatasets.map((name) => radioField(name))}
      {errors.dataset && <span className="py-2 text-red-500">Please choose a dataset</span>}
      <button type="submit" className="button-relief">
        Select
      </button>
    </form>
  );
}

export default DatasetSelection;
