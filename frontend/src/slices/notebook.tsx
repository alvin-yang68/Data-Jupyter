import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { performRunCell } from './editor';
import { performFetchCheckpoints, performLoadCheckpoint, performSaveCheckpoint } from './checkpoint';
import { DatabaseModel, ModalMode } from '../types';
import { uploadDataset } from '../api/dataset';

export type NotebookState = {
  loading: boolean;
  error: {timestamp: number, message: string} | null;
  databaseModel: DatabaseModel | null;
  datasets: string[];
  selectedDataset: string | null;
  modalMode: ModalMode;
}

const initialState: NotebookState = {
  loading: false,
  error: null,
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

    setNotebookError: (state: NotebookState, { payload }: PayloadAction<string | null>) => {
      if (payload) {
        state.error = { timestamp: Date.now(), message: payload };
      } else {
        state.error = null;
      }
    },

    toggleModal: (state: NotebookState, { payload }: PayloadAction<ModalMode>) => {
      state.modalMode = payload;
    },
  },
  extraReducers: (builder) => {
    const pendingAction = (state: NotebookState) => {
      state.loading = true;
      state.error = null;
    };

    const rejectedAction = (state: NotebookState, action: AnyAction) => {
      const errorMessage: string | undefined = action.payload as string | undefined || action.error.message;

      state.loading = false;

      if (errorMessage) {
        state.error = { timestamp: Date.now(), message: errorMessage };
      } else {
        state.error = null;
      }
    };

    builder.addCase(performUploadDataset.pending, pendingAction);

    builder.addCase(performUploadDataset.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.selectedDataset = action.payload;
    });

    builder.addCase(performRunCell.pending, pendingAction);

    builder.addCase(performRunCell.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });

    builder.addCase(performRunCell.rejected, rejectedAction);

    builder.addCase(performFetchCheckpoints.pending, pendingAction);

    builder.addCase(performFetchCheckpoints.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });

    builder.addCase(performFetchCheckpoints.rejected, rejectedAction);

    builder.addCase(performSaveCheckpoint.pending, pendingAction);

    builder.addCase(performSaveCheckpoint.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });

    builder.addCase(performSaveCheckpoint.rejected, rejectedAction);

    builder.addCase(performLoadCheckpoint.pending, pendingAction);

    builder.addCase(performLoadCheckpoint.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.selectedDataset = action.payload.selectedDataset;
    });

    builder.addCase(performLoadCheckpoint.rejected, rejectedAction);
  },
});

export const {
  selectDatabaseModel,
  selectDataset,
  toggleModal,
  setNotebookError,
} = notebookSlice.actions;
