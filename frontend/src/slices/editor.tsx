import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { updateBrowser } from '../api/browser';
import { Cell } from '../entities';
import { performLoadCheckpoint } from './checkpoint';
import { NotebookState } from './notebook';

export type EditorState = {
  cells: Cell[];
  cellCounter: number;
  execCounter: number;
  lastExecutedCellId: number | null;
  updateBrowserCellId: number | null;
}

const initialState: EditorState = {
  cells: [],
  cellCounter: 0,
  execCounter: 0,
  lastExecutedCellId: null,
  updateBrowserCellId: null,
};

export const performRunCell = createAsyncThunk(
  'editor/runCell',
  async (index: number, { getState, rejectWithValue }) => {
    const { notebook, editor } = getState() as {notebook: NotebookState, editor: EditorState};

    if (index >= editor.cells.length || !notebook.selectedDataset) {
      return rejectWithValue(null);
    }

    const targetCell = editor.cells[index];

    try {
      return await updateBrowser({
        selectedDataset: notebook.selectedDataset,
        editorContent: targetCell.editorContent,
      });
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    addCell: (state: EditorState, { payload }: PayloadAction<number | null>) => {
      state.cellCounter += 1;

      const newCell = {
        id: state.cellCounter,
        execStatus: ' ',
        errorStatus: false,
        editorContent: '',
        numOfLines: 0,
      };

      if (payload !== null) {
        // Add a new cell after the focused cell.
        state.cells.splice(payload + 1, 0, newCell);
      } else {
        // If no cell or none focused yet, add the new cell at the end.
        state.cells.push(newCell);
      }
    },

    changeCell: (state: EditorState, { payload: { index, value } }: PayloadAction<{index: number, value: string}>) => {
      state.cells[index].numOfLines = value.split('\n').length;
      state.cells[index].editorContent = value;
    },

    deleteCell: (state: EditorState, { payload }: PayloadAction<number | null>) => {
      if (payload !== null) {
        // Remove focused cell.
        state.cells.splice(payload, 1);
      } else {
        // Remove the cell at the end.
        state.cells.pop();
      }
    },

    swapCell: (state: EditorState, { payload: { focusedCellIndex, step } }: PayloadAction<{focusedCellIndex: number, step: number}>) => {
      const from = focusedCellIndex;
      const to = from + step;

      // Swap the cells with `from` index and `to` index.
      state.cells.splice(to, 0, state.cells.splice(from, 1)[0]);
    },

    loadCells: (state: EditorState, { payload }: PayloadAction<Cell[]>) => {
      state.cells = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(performRunCell.pending, (state, action) => {
      const targetCellIndex = action.meta.arg;
      const targetCell = state.cells[targetCellIndex];

      targetCell.execStatus = '*';
      targetCell.errorStatus = false;
    });

    builder.addCase(performRunCell.fulfilled, (state, action) => {
      const targetCellIndex = action.meta.arg;
      const targetCell = state.cells[targetCellIndex];

      state.execCounter += 1;

      targetCell.execStatus = state.execCounter;
      targetCell.errorStatus = action.payload.hasCellError;
      state.lastExecutedCellId = targetCell.id;
      if (action.payload.shouldUpdateBrowser) state.updateBrowserCellId = targetCell.id;
    });

    builder.addCase(performLoadCheckpoint.fulfilled, (state, action) => action.payload.editorState);
  },
});

export const {
  addCell,
  changeCell,
  deleteCell,
  swapCell,
  loadCells,
} = editorSlice.actions;
