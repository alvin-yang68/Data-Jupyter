import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";

import { statusSlice } from "./slices/status";
import { notebookSlice } from "./slices/notebook";
import { editorSlice } from "./slices/editor";
import { browserSlice } from "./slices/browser";
import { checkpointSlice } from "./slices/checkpoint";

const combinedReducer = combineReducers({
  status: statusSlice.reducer,
  notebook: notebookSlice.reducer,
  browser: browserSlice.reducer,
  editor: editorSlice.reducer,
  checkpoint: checkpointSlice.reducer,
});

export type AppState = ReturnType<typeof combinedReducer>;

const rootReducer = (state: AppState | undefined, action: AnyAction) => {
  if (action.type === "notebook/clearNotebookSession/pending") {
    // Reset the slices to their `initialState`.
    // When the state passed to a reducer is `undefined`, redux will set
    // the state of a reducer to its default value: `initialState`.
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export const { dispatch } = store;
