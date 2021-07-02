import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { performRunCell } from './editor';
import { performFetchCheckpoints, performLoadCheckpoint, performSaveCheckpoint } from './checkpoint';
import { DatabaseModel, ModalMode } from '../types';
import { uploadDataset } from '../api/dataset';

export type NotebookState = {
  loading: boolean;
  error: string | null;
  databaseModel: DatabaseModel | null;
  selectedDataset: string | null;
  modalMode: ModalMode;
}

const initialState: NotebookState = {
  loading: false,
  error: null,
  databaseModel: null,
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

    builder.addCase(performRunCell.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(performRunCell.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });

    builder.addCase(performRunCell.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });

    builder.addCase(performFetchCheckpoints.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(performFetchCheckpoints.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });

    builder.addCase(performFetchCheckpoints.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });

    builder.addCase(performSaveCheckpoint.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(performSaveCheckpoint.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });

    builder.addCase(performSaveCheckpoint.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });

    builder.addCase(performLoadCheckpoint.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(performLoadCheckpoint.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.selectedDataset = action.payload.selectedDataset;
    });

    builder.addCase(performLoadCheckpoint.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
  },
});

export const {
  selectDatabaseModel,
  selectDataset,
  toggleModal,
} = notebookSlice.actions;
