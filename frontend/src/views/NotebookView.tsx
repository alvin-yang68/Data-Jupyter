import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { BrowserMode, DatabaseModel, ModalMode } from '../types';
import { AppState, dispatch } from '../store';
import { selectDatabaseModel } from '../slices/notebook';
import Modal from '../components/Modal';
import DatasetSelect from '../components/DatasetSelect';
import Editor from '../components/Editor';
import DataBrowser from '../components/DataBrowser';
import LoadCheckpoint from '../components/LoadCheckpoint';
import SaveCheckpoint from '../components/SaveCheckpoint';

const datasetOptions = {
  [DatabaseModel.Mongodb]: ['nobel_prizes_incorrect', 'movies_incorrect'],
  [DatabaseModel.Psql]: ['courses', 'enrolls', 'professors', 'students'],
};

interface IProps {
  databaseModel: DatabaseModel;
}

export default function NotebookView({ databaseModel }: IProps): React.ReactElement {
  const modalMode = useSelector<AppState, ModalMode>(
    (state) => state.notebook.modalMode,
  );

  useEffect(() => {
    dispatch(selectDatabaseModel(databaseModel));
  }, []);

  switch (modalMode) {
    case ModalMode.LoadCheckpoint:
      return <Modal title="Load Checkpoint"><LoadCheckpoint /></Modal>;

    case ModalMode.SaveCheckpoint:
      return <Modal title="Save Checkpoint"><SaveCheckpoint /></Modal>;

    default:
      return (
        <div className="h-full container mx-auto px-4 pt-16 text-center">
          <h1 className="font-bold text-5xl p-4 border-b-2 border-gray-300">
            {databaseModel === DatabaseModel.Mongodb ? 'MongoDB' : 'PostgreSQL'}
          </h1>

          <div className="py-4">
            <h1 className="font-bold text-3xl uppercase p-4">Choose a demo dataset</h1>
            <DatasetSelect demoDatasets={datasetOptions[databaseModel]} />
          </div>

          <div className="grid grid-cols-2 gap-6 py-4">
            <div>
              <h1 className="font-bold text-3xl uppercase px-4 py-6">Editor</h1>
              <Editor />
            </div>

            <div>
              <h1 className="font-bold text-3xl uppercase px-4 py-6">Data Browser</h1>
              {databaseModel === DatabaseModel.Psql
                ? <DataBrowser modes={[BrowserMode.Table, BrowserMode.Console]} />
                : <DataBrowser modes={[BrowserMode.Raw, BrowserMode.Table, BrowserMode.Console]} />}
            </div>
          </div>
        </div>
      );
  }
}
