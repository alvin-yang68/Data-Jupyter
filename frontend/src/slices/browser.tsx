import { createSlice } from '@reduxjs/toolkit';

import { DataEntity } from '../entities';
import { performSelectDataset } from './notebook';
import { performRunAllCells, performRunCell } from './editor';

export type BrowserState = DataEntity | null;

const initialState: BrowserState = null;

export const browserSlice = createSlice({
  name: 'browser',
  initialState: initialState as BrowserState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(performSelectDataset.fulfilled, (state, action) => {
      const { raw, table, console } = action.payload;
      return { raw, table, console };
    });

    builder.addCase(performRunCell.fulfilled, (state, action) => action.payload);

    builder.addCase(performRunAllCells.fulfilled, (state, action) => action.payload);
  },
});
