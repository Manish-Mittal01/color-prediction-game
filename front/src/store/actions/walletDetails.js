import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalAmount: 0,
    withdrawableAmount: 0,
    referralAmount: 0,
}


const walletSlice = createSlice({
    name: "walletSlice",
    initialState,
    reducers: {
        updateWallet: (state, action) => {
            console.log(action.payload)
            state = action.payload;
            console.log(state)
        },
    },

})

export default walletSlice.reducer;
export const { updateWallet } = walletSlice.actions
