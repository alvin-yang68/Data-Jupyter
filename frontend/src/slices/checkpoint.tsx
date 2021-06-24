import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchCheckpoints, loadCheckpoint, saveCheckpoint } from '../api/checkpoint';
import { CheckpointMeta } from '../types';
import { BrowserState } from './browser';
import { EditorState } from './editor';
import { NotebookState } from './notebook';

export type CheckpointState = CheckpointMeta[];

const initialState: CheckpointState = [];

export const performFetchCheckpoints = createAsyncThunk(
  'checkpoint/fetch',
  async (_, { getState, rejectWithValue }) => {
    const { notebook } = getState() as {notebook: NotebookState};

    if (!notebook.databaseModel) {
      return rejectWithValue('Rejected');
    }

    try {
      return await fetchCheckpoints(notebook.databaseModel);
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

export const performSaveCheckpoint = createAsyncThunk(
  'checkpoint/save',
  async (_, { getState, rejectWithValue }) => {
    const { editor, notebook, browser } = getState() as {editor: EditorState, notebook: NotebookState, browser: BrowserState};

    if (!notebook.selectedDataset || !notebook.databaseModel || browser === null) {
      return rejectWithValue('Rejected');
    }

    try {
      return await saveCheckpoint({
        editorState: editor,
        browserState: browser,
        databaseModel: notebook.databaseModel,
        selectedDataset: notebook.selectedDataset,
      });
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

export const performLoadCheckpoint = createAsyncThunk(
  'checkpoint/load',
  async (id: string, { rejectWithValue }) => {
    try {
      return await loadCheckpoint(id);
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

export const checkpointSlice = createSlice({
  name: 'checkpoint',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(performFetchCheckpoints.fulfilled, (state, action) => action.payload);
  },
});
