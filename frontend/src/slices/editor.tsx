import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { updateBrowser } from '../api/browser';
import { Cell } from '../entities';
import { performLoadCheckpoint } from './checkpoint';
import { NotebookState } from './notebook';

export type EditorState = {
  cells: Cell[];
  cellCounter: number;
  execCounter: number;
  focusedCellId: number | null;
  lastExecutedCellId: number | null;
  updateBrowserCellId: number | null;
}

const initialState: EditorState = {
  cells: [],
  cellCounter: 0,
  execCounter: 0,
  focusedCellId: null,
  lastExecutedCellId: null,
  updateBrowserCellId: null,
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    focusCell: (state: EditorState, { payload }: PayloadAction<number | undefined>) => {
      if (payload) {
        state.focusedCellId = payload;
      } else {
        state.focusedCellId = null;
      }
    },
    addCell: (state: EditorState) => {
      state.cellCounter += 1;
      const newCell = {
        id: state.cellCounter,
        execStatus: '',
        errorStatus: false,
        editorContent: '',
        numOfLines: 0,
      };
      if (state.focusedCellId) {
        const focusedCellIdx = state.cells.findIndex((cell) => cell.id === state.focusedCellId);
        if (focusedCellIdx > -1) state.cells.splice(focusedCellIdx + 1, 0, newCell);
      } else {
        state.cells.push(newCell);
      }
    },
    changeCell: (state: EditorState, { payload }: PayloadAction<string>) => {
      const index = state.cells.findIndex((cell) => cell.id === state.focusedCellId);
      if (index > -1) {
        state.cells[index].numOfLines = payload.split('\n').length;
        state.cells[index].editorContent = payload;
      }
    },
    setCellStatus: (state: EditorState, { payload }: PayloadAction<{id: number, execStatus?: string, errorStatus: boolean }>) => {
      let execStatus: (string | number);
      if (payload.execStatus) {
        execStatus = payload.execStatus;
      } else {
        state.execCounter += 1;
        execStatus = state.execCounter;
      }
      const index = state.cells.findIndex((cell) => cell.id === payload.id);
      if (index > -1) {
        state.cells[index].execStatus = execStatus;
        state.cells[index].errorStatus = payload.errorStatus;
      }
    },
    deleteCell: (state: EditorState) => {
      const index = state.cells.findIndex((cell) => cell.id === state.focusedCellId);
      if (index > -1) state.cells.splice(index, 1);
    },
    moveCell: (state: EditorState, { payload }: PayloadAction<number>) => {
      const from = state.cells.findIndex((cell) => cell.id === state.focusedCellId);
      const to = Math.min(Math.max(from + payload, 0), state.cells.length - 1);
      if (from > -1) state.cells.splice(to, 0, state.cells.splice(from, 1)[0]);
    },
    loadCells: (state: EditorState, { payload }: PayloadAction<Cell[]>) => {
      state.cells = payload;
    },
    setLastExecutedCellId: (state: EditorState, { payload }: PayloadAction<number>) => {
      state.lastExecutedCellId = payload;
    },
    setBrowserUpdateCellId: (state: EditorState, { payload }: PayloadAction<number>) => {
      state.updateBrowserCellId = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(performLoadCheckpoint.fulfilled, (state, action) => action.payload.editorState);
  },
});

export const {
  focusCell,
  addCell,
  changeCell,
  setCellStatus,
  deleteCell,
  moveCell,
  loadCells,
  setLastExecutedCellId,
  setBrowserUpdateCellId,
} = editorSlice.actions;

export const performRunCell = createAsyncThunk(
  'editor/runCell',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { notebook, editor } = getState() as {notebook: NotebookState, editor: EditorState};

    const targetCell = editor.cells.find((cell) => cell.id === editor.focusedCellId);
    if (!targetCell || !notebook.selectedDataset) return rejectWithValue('Rejected');

    try {
      dispatch(setCellStatus({ id: targetCell.id, execStatus: '*', errorStatus: false }));
      const { hasCellError, shouldUpdateBrowser, ...results } = await updateBrowser({
        selectedDataset: notebook.selectedDataset,
        editorContent: targetCell.editorContent,
      });
      dispatch(setCellStatus({ id: targetCell.id, errorStatus: hasCellError }));
      dispatch(setLastExecutedCellId(targetCell.id));
      if (shouldUpdateBrowser) dispatch(setBrowserUpdateCellId(targetCell.id));
      return results;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

export const performRunAllCells = createAsyncThunk(
  'editor/runAllCells',
  async (_, { dispatch, getState, rejectWithValue }) => {
    const { notebook, editor } = getState() as {notebook: NotebookState, editor: EditorState};

    if (!notebook.selectedDataset) return rejectWithValue('Rejected');

    try {
      let results;
      for (const targetCell of editor.cells) {
        dispatch(setCellStatus({ id: targetCell.id, execStatus: '*', errorStatus: false }));
        const { hasCellError, shouldUpdateBrowser, ...rest } = await updateBrowser({
          selectedDataset: notebook.selectedDataset,
          editorContent: targetCell.editorContent,
        });
        results = rest;
        dispatch(setCellStatus({ id: targetCell.id, errorStatus: hasCellError }));
        dispatch(setLastExecutedCellId(targetCell.id));
        if (shouldUpdateBrowser) dispatch(setBrowserUpdateCellId(targetCell.id));
      }
      return results;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);
