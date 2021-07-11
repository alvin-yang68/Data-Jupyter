import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { BrowserMode, DatabaseModel, ModalMode } from '../types';
import { AppState, dispatch } from '../store';
import { selectDatabaseModel, performFetchDatasets, clearNotebookSession } from '../slices/notebook';
import Modal from '../components/generics/Modal';
import DatasetSelect from '../components/DatasetSelect';
import Editor from '../components/Editor';
import DataBrowser from '../components/DataBrowser';
import LoadCheckpoint from '../components/LoadCheckpoint';
import SaveCheckpoint from '../components/SaveCheckpoint';

function getModes(databaseModel: DatabaseModel): BrowserMode[] {
  switch (databaseModel) {
    case DatabaseModel.Psql:
      return [BrowserMode.Table, BrowserMode.Console];

    case DatabaseModel.Mongodb:
      return [BrowserMode.Raw, BrowserMode.Table, BrowserMode.Console];

    default:
      return [];
  }
}

interface IProps {
  databaseModel: DatabaseModel;
}

export default function NotebookView({ databaseModel }: IProps): React.ReactElement {
  const modalMode = useSelector<AppState, ModalMode>(
    (state) => state.notebook.modalMode,
  );

  // Clear the redux store, flask session context in client cookies, set the
  // database model on the redux store based on the URL, and fetch datasets
  // on the first load of `NotebookView`.
  useEffect(() => {
    dispatch(clearNotebookSession());
    dispatch(selectDatabaseModel(databaseModel));
    dispatch(performFetchDatasets());
  }, []);

  if (modalMode === ModalMode.LoadCheckpoint) {
    return <Modal title="Load Checkpoint"><LoadCheckpoint /></Modal>;
  }

  if (modalMode === ModalMode.SaveCheckpoint) {
    return <Modal title="Save Checkpoint"><SaveCheckpoint /></Modal>;
  }

  return (
    <div className="h-full container mx-auto pt-16 text-center">
      <h1 className="font-bold text-5xl p-4 border-b-2 border-gray-300">
        {databaseModel === DatabaseModel.Mongodb ? 'MongoDB' : 'PostgreSQL'}
      </h1>

      <div className="py-4">
        <h1 className="font-bold text-3xl uppercase p-4">Choose a dataset</h1>
        <DatasetSelect />
      </div>

      <Editor />

      <DataBrowser modes={getModes(databaseModel)} />
    </div>
  );
}
