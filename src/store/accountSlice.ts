import { createSlice } from "@reduxjs/toolkit";

interface AccountState {
  accountId: string | null;
}

const initialState: AccountState = {
  accountId: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccountId: (state, action) => {
      state.accountId = action.payload;
    },
  },
});

export const { setAccountId } = accountSlice.actions;
export default accountSlice.reducer;
