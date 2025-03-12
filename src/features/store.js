import { configureStore } from '@reduxjs/toolkit';
import apiReducer from '../features/apiSlice';
import orderReducer from '../features/orderSlice';

const store = configureStore ({
    reducer: {
        api: apiReducer,
        order: orderReducer,
    },
})

export default store;