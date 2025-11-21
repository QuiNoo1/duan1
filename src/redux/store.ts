'use client';

import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './slices/cartSlice';

import orderReducer from './slices/orderSlice';

import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer ,
        cart: cartReducer,
        order: orderReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
