import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { updateBrowser } from '../api/browser';
import { CellEntity, DataEntity } from '../entities';
import { performLoadCheckpoint } from './checkpoint';

export type EditorState = {
  cells: CellEntity[];
  cellCounter: number;
  execCounter: number;
  focusedCellId: number | null;
}

const initialState: EditorState = {
  cells: [],
  cellCounter: 0,
  execCounter: 0,
  focusedCellId: null,
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
      const newCell = { id: state.cellCounter, execStatus: '', editorContent: '' };
      if (state.focusedCellId) {
        const focusedCellIdx = state.cells.findIndex((cell) => cell.id === state.focusedCellId);
        if (focusedCellIdx > -1) state.cells.splice(focusedCellIdx + 1, 0, newCell);
      } else {
        state.cells.push(newCell);
      }
    },
    changeCell: (state: EditorState, { payload }: PayloadAction<string>) => {
      const index = state.cells.findIndex((cell) => cell.id === state.focusedCellId);
      if (index > -1) state.cells[index].editorContent = payload;
    },
    setCellStatus: (state: EditorState, { payload }: PayloadAction<{id: number, execStatus?: string }>) => {
      let execStatus: (string | number);
      if (payload.execStatus) {
        execStatus = payload.execStatus;
      } else {
        state.execCounter += 1;
        execStatus = state.execCounter;
      }
      const index = state.cells.findIndex((cell) => cell.id === payload.id);
      if (index > -1) state.cells[index].execStatus = execStatus;
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
    loadCells: (state: EditorState, { payload }: PayloadAction<CellEntity[]>) => {
      state.cells = payload;
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
} = editorSlice.actions;

export const performRunCell = createAsyncThunk(
  'editor/runCell',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { editor } = getState() as {editor: EditorState};

    const targetCell = editor.cells.find((cell) => cell.id === editor.focusedCellId);
    if (!targetCell) return rejectWithValue('Rejected');

    try {
      dispatch(setCellStatus({ id: targetCell.id, execStatus: '*' }));
      const results = await updateBrowser(targetCell.editorContent);
      dispatch(setCellStatus({ id: targetCell.id }));
      return results;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

export const performRunAllCells = createAsyncThunk(
  'editor/runAllCells',
  async (_, { dispatch, getState, rejectWithValue }) => {
    const { editor } = getState() as {editor: EditorState};

    try {
      let results: DataEntity | undefined;
      for (const cell of editor.cells) {
        dispatch(setCellStatus({ id: cell.id, execStatus: '*' }));
        results = await updateBrowser(cell.editorContent);
        dispatch(setCellStatus({ id: cell.id }));
      }
      return results;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);
