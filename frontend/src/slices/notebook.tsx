import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { performLoadCheckpoint } from './checkpoint';
import { DatabaseModel, ModalMode } from '../types';
import { uploadDataset } from '../api/dataset';

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

export const performUploadDataset = createAsyncThunk(
  'notebook/uploadDataset',
  async (file: FormData, { getState, rejectWithValue }) => {
    const { notebook } = getState() as {notebook: NotebookState};

    if (!notebook.databaseModel) return rejectWithValue(null);

    try {
      return await uploadDataset({
        databaseModel: notebook.databaseModel,
        file,
      });
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
  },
});

export const {
  selectDatabaseModel,
  selectDataset,
  toggleModal,
} = notebookSlice.actions;
