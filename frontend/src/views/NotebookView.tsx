import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../store';
import { BrowserMode, DatabaseModel, ModalMode } from '../types';
import DatasetSelection from '../components/DatasetSelection';
import DataBrowser from '../components/DataBrowser';
import Editor from '../components/Editor';
import Modal from '../components/Modal';
import { LoadCheckpoint, SaveCheckpoint } from '../components/Checkpoint';
import { selectDatabaseModel } from '../slices/notebook';

const datasetOptions = {
  [DatabaseModel.Mongodb]: ['nobel_prizes_incorrect', 'movies_incorrect'],
  [DatabaseModel.Psql]: ['courses', 'enrolls', 'professors', 'students'],
};

interface IProps {
  databaseModel: DatabaseModel;
}

export default function NotebookView({ databaseModel }: IProps): React.ReactElement {
  const dispatch = useDispatch();

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
        <main className="h-full container mx-auto px-4 py-4 text-center">
          <h1 className="font-bold text-5xl p-4 border-b-2 border-gray-300">
            {databaseModel === DatabaseModel.Mongodb ? 'MongoDB' : 'PostgreSQL'}
          </h1>

          <div className="pt-16">
            <h1 className="font-bold text-3xl uppercase p-4">Choose a demo dataset</h1>
            <DatasetSelection demoDatasets={datasetOptions[databaseModel]} />
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
        </main>
      );
  }
}
