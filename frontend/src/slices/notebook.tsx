import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { loadDataset } from '../api/dataset';
import { performRunCell, performRunAllCells } from './editor';
import { performFetchCheckpoints, performLoadCheckpoint, performSaveCheckpoint } from './checkpoint';

export type NotebookState = {
  loading: boolean;
  error: string | null;
  selectedDataset: string | null;
  showCheckpointModal: boolean;
}

const initialState: NotebookState = {
  loading: false,
  error: null,
  selectedDataset: null,
  showCheckpointModal: false,
};

export const performSelectDataset = createAsyncThunk(
  'notebook/selectDataset',
  async (selectedDataset: string, { rejectWithValue }) => {
    try {
      const results = await loadDataset(selectedDataset);
      return { ...results, selectedDataset };
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

export const notebookSlice = createSlice({
  name: 'notebook',
  initialState,
  reducers: {
    selectDataset: (state: NotebookState, { payload }: PayloadAction<string>) => {
      state.selectedDataset = payload;
    },
    toggleCheckpointModal: (state: NotebookState, { payload }: PayloadAction<boolean>) => {
      state.showCheckpointModal = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(performSelectDataset.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(performSelectDataset.fulfilled, (state, action) => {
      const { selectedDataset } = action.payload;
      state.selectedDataset = selectedDataset;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(performSelectDataset.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
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

    builder.addCase(performRunAllCells.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(performRunAllCells.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });

    builder.addCase(performRunAllCells.rejected, (state, action) => {
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

    builder.addCase(performLoadCheckpoint.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });

    builder.addCase(performLoadCheckpoint.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
  },
});

export const { selectDataset, toggleCheckpointModal } = notebookSlice.actions;
