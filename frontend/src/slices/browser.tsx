import { createSlice } from '@reduxjs/toolkit';

import { performLoadDataset } from './notebook';
import { performRunAllCells, performRunCell } from './editor';
import { performLoadCheckpoint } from './checkpoint';

export type BrowserState = {
  raw: string;
  table: string;
  console: string;
}

const initialState: BrowserState = {
  raw: '',
  table: '',
  console: '',
};

export const browserSlice = createSlice({
  name: 'browser',
  initialState: initialState as BrowserState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(performLoadDataset.fulfilled, (state, action) => ({ ...state, ...action.payload }));

    builder.addCase(performRunCell.fulfilled, (state, action) => ({ ...state, ...action.payload }));

    builder.addCase(performRunAllCells.fulfilled, (state, action) => ({ ...state, ...action.payload }));

    builder.addCase(performLoadCheckpoint.fulfilled, (state, action) => action.payload.browserState);
  },
});
