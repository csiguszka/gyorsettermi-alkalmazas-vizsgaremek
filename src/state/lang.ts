import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type langState = "hu" | "en";

interface CounterState {
  value: langState;
}

const initialState: CounterState = {
  value: "hu",
};

const lang = createSlice({
  name: "lang",
  initialState,
  reducers: {
    changeLang: (state, action: PayloadAction<langState>) => {
      state.value = action.payload;
    },
  },
});

export const { changeLang } = lang.actions;

export default lang.reducer;
