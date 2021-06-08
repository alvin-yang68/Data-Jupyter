import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Cell } from '../entities';
import { performFetchDataset } from './notebook';

export type EditorState = {
  editor: Cell[];
  editorMaxId: number;
  selectedCellId: number | null;
}

const initialState: EditorState = {
  editor: [],
  editorMaxId: 0,
  selectedCellId: null,
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
  },
  extraReducers: (builder) => {
    builder.addCase(performFetchDataset.fulfilled, (state, action) => {
      state.editor = [{
        id: 1,
        editor: '',
        data: action.payload.data,
      }];
      state.editorMaxId = 1;
    });
  },
});

export const { cellAdded, cellSelected } = editorSlice.actions;
