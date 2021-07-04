import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { statusSlice } from './slices/status';
import { notebookSlice } from './slices/notebook';
import { editorSlice } from './slices/editor';
import { browserSlice } from './slices/browser';
import { checkpointSlice } from './slices/checkpoint';

const rootReducer = combineReducers({
  status: statusSlice.reducer,
  notebook: notebookSlice.reducer,
  browser: browserSlice.reducer,
  editor: editorSlice.reducer,
  checkpoint: checkpointSlice.reducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});

export const { dispatch } = store;
