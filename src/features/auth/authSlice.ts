import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: String | null;
  isAuthenticated: Boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveToken(state, { payload }: PayloadAction<String>) {
      payload && (state.token = payload);
    },
    clearToken(state) {
      state.token = null;
    },
    setAuthState(state, { payload }: PayloadAction<Boolean>) {
      state.isAuthenticated = payload;
    },
  },
});

export const { saveToken, clearToken, setAuthState } = auth.actions;
export default auth.reducer;
