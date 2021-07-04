import {
  PayloadAction,
  AnyAction,
  AsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

export type StatusState = {
  loading: boolean;
  success: {timestamp: number, message: string} | null;
  error: {timestamp: number, message: string} | null;
}

const initialState: StatusState = {
  loading: false,
  success: null,
  error: null,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;

function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith('/pending');
}

function isFulfilledAction(action: AnyAction): action is FulfilledAction {
  return action.type.endsWith('/fulfilled');
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('/rejected');
}

export const statusSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setError: (state: StatusState, { payload }: PayloadAction<string | null>) => {
      if (payload) {
        state.error = { timestamp: Date.now(), message: payload };
      } else {
        state.error = null;
      }
    },

    setSuccess: (state: StatusState, { payload }: PayloadAction<string | null>) => {
      if (payload) {
        state.success = { timestamp: Date.now(), message: payload };
      } else {
        state.success = null;
      }
    },
  },
  extraReducers: (builder) => {
    // Match any action that has type ending with '/pending'
    builder.addMatcher(isPendingAction, (state) => {
      state.loading = true;
      state.error = null;
    });

    // Match any action that has type ending with '/fulfilled'
    builder.addMatcher(isFulfilledAction, (state) => {
      state.loading = false;
      state.error = null;
    });

    // Match any action that has type ending with '/rejected'
    builder.addMatcher(isRejectedAction, (state, action: AnyAction) => {
      state.loading = false;
      state.success = null;

      const errorMessage: string | undefined = action.payload as string | undefined || action.error.message;

      if (errorMessage) {
        state.error = { timestamp: Date.now(), message: errorMessage };
      } else {
        state.error = null;
      }
    });
  },
});

export const {
  setError,
  setSuccess,
} = statusSlice.actions;
