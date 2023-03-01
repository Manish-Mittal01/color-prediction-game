import { configureStore } from '@reduxjs/toolkit'
import walletReducer from '../actions/walletDetails'

const store = configureStore({
    reducer: {
        getData: walletReducer,
    }
});

export default store;