import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { performLoadCheckpoint } from './checkpoint';
import { DatabaseModel, ModalMode } from '../types';
import { UploadDatasetPayload, uploadDataset, fetchDatasets } from '../api/dataset';
import { resetSessionContext } from '../api/notebook';

export type NotebookState = {
  databaseModel: DatabaseModel | null;
  datasets: string[];
  selectedDataset: string | null;
  modalMode: ModalMode;
}

const initialState: NotebookState = {
  databaseModel: null,
  datasets: [],
  selectedDataset: null,
  modalMode: ModalMode.None,
};

export const clearNotebookSession = createAsyncThunk(
  'notebook/clearNotebookSession',
  async (_, { rejectWithValue }) => {
    try {
      return await resetSessionContext();
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

export const performFetchDatasets = createAsyncThunk(
  'notebook/fetchDatasets',
  async (_, { getState, rejectWithValue }) => {
    const { notebook: { databaseModel } } = getState() as {notebook: {databaseModel: DatabaseModel | null}};

    if (!databaseModel) return rejectWithValue('Unable to fetch datasets. No database model selected');

    try {
      return await fetchDatasets(databaseModel);
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

export const performUploadDataset = createAsyncThunk(
  'notebook/uploadDataset',
  async (payload: UploadDatasetPayload, { rejectWithValue }) => {
    try {
      return await uploadDataset(payload);
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

export const notebookSlice = createSlice({
  name: 'notebook',
  initialState,
  reducers: {
    selectDatabaseModel: (state: NotebookState, { payload }: PayloadAction<DatabaseModel | null>) => {
      state.databaseModel = payload;
    },

    selectDataset: (state: NotebookState, { payload }: PayloadAction<string>) => {
      state.selectedDataset = payload;
    },

    toggleModal: (state: NotebookState, { payload }: PayloadAction<ModalMode>) => {
      state.modalMode = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(performUploadDataset.fulfilled, (state, action) => {
      state.selectedDataset = action.payload;
    });

    builder.addCase(performLoadCheckpoint.fulfilled, (state, action) => {
      state.selectedDataset = action.payload.selectedDataset;
    });

    builder.addCase(performFetchDatasets.fulfilled, (state, action) => {
      state.datasets = action.payload;
    });
  },
});

export const {
  selectDatabaseModel,
  selectDataset,
  toggleModal,
} = notebookSlice.actions;
