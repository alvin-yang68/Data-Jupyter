import { createSlice } from "@reduxjs/toolkit";

import { performRunCell } from "./editor";
import { performLoadCheckpoint } from "./checkpoint";

export type BrowserState = {
  raw: string;
  table: string;
  console: string;
  tableRowCount: number;
  tableHeaders: string[];
};

const initialState: BrowserState = {
  raw: "",
  table: "",
  console: "",
  tableRowCount: 0,
  tableHeaders: [],
};

export const browserSlice = createSlice({
  name: "browser",
  initialState: initialState as BrowserState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(performRunCell.fulfilled, (state, action) => {
      const { hasCellError, shouldUpdateBrowser, ...results } = action.payload;
      return { ...state, ...results };
    });

    builder.addCase(
      performLoadCheckpoint.fulfilled,
      (state, action) => action.payload.browserState
    );
  },
});
