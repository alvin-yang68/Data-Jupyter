import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { notebookSlice } from './slices/notebook';
import { editorSlice } from './slices/editor';

const rootReducer = combineReducers({
  notebook: notebookSlice.reducer,
  editor: editorSlice.reducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
