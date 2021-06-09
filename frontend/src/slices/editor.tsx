import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Cell } from '../entities';
import { performFetchDataset } from './notebook';

export type EditorState = {
  cells: Cell[];
  editorMaxId: number;
  selectedCellId: number | null;
  executionCounter: number;
}

const initialState: EditorState = {
  cells: [],
  editorMaxId: 0,
  selectedCellId: null,
  executionCounter: 0,
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    cellAdded: (state: EditorState) => {
      state.editorMaxId += 1;
    },
    cellSelected: (state: EditorState, action: PayloadAction<number>) => {
      state.selectedCellId = action.payload;
    },
    cellRan: (state: EditorState, action: PayloadAction<number>) => {
      state.executionCounter += 1;
      const targetCell = state.cells.find((cell) => cell.id === action.payload);
      if (targetCell) targetCell.runOrder = state.executionCounter;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(performFetchDataset.fulfilled, (state, action) => {
      state.cells = [{
        id: 1,
        editor: '',
        runOrder: null,
        data: action.payload.data,
      }];
      state.editorMaxId = 1;
    });
  },
});

export const { cellAdded, cellSelected } = editorSlice.actions;
