import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type userState = {
  token: string | null;
  role: string | null;
};

interface CounterState {
  value: userState;
}

const initialState: CounterState = {
  value: {
    token: null,
    role: null,
  },
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeUser: (
      state,
      action: PayloadAction<{ token: string; role: string }>
    ) => {
      state.value = action.payload;
    },
    reduxSignOut: (state) => {
      state.value = {
        token: null,
        role: null,
      };
    },
  },
});

export const { changeUser, reduxSignOut } = user.actions;

export default user.reducer;



