import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DataEntity } from '../entities';
import { loadDataset } from '../api/dataset';
import { performRunCell, performRunAllCells } from './editor';

export type NotebookState = {
  loading: boolean;
  error: string | null;
  selectedDataset: string | null;
  results: DataEntity | null;
}

const initialState: NotebookState = {
  loading: false,
  error: null,
  selectedDataset: null,
  results: null,
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
  },
  extraReducers: (builder) => {
    builder.addCase(performSelectDataset.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(performSelectDataset.fulfilled, (state, action) => {
      const { selectedDataset, ...results } = action.payload;
      state.selectedDataset = selectedDataset;
      state.results = results;
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

    builder.addCase(performRunCell.fulfilled, (state, action) => {
      state.results = action.payload;
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

    builder.addCase(performRunAllCells.fulfilled, (state, action) => {
      if (action.payload) state.results = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(performRunAllCells.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
  },
});

export const { selectDataset } = notebookSlice.actions;
