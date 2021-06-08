import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchDataset } from '../api/dataset';

export type NotebookState = {
  loading: boolean;
  error: string | null;
  sessionState: string | null;
}

const initialState: NotebookState = {
  loading: false,
  error: null,
  sessionState: null,
};

export const performFetchDataset = createAsyncThunk(
  'notebook/fetchDataset',
  async (datasetName: string, { rejectWithValue }) => {
    try {
      return await fetchDataset(datasetName);
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

export const notebookSlice = createSlice({
  name: 'notebook',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(performFetchDataset.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(performFetchDataset.fulfilled, (state, action) => {
      state.loading = true;
      state.error = null;
      state.sessionState = action.payload.sessionState;
    });

    builder.addCase(performFetchDataset.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
  },
});
