// src/redux/slices/authSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const kiemTraDangNhap = createAsyncThunk(
    "auth/kiemTraDangNhap",
    async () => {
        const token = Cookies.get("token");

        if (!token) return undefined;

        try {
            const kQ = await axios.get("https://dummyjson.com/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return { user: kQ.data, daDangNhap: true };
        } catch (err) {
            console.error("Lỗi kiểm tra đăng nhập:", err);
            throw err;
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: {},
        daDangNhap: false,
        isLoading: true,
    },
    reducers: {
        dangNhap(state, action) {
            state.user = action.payload.user;
            state.daDangNhap = true;
            state.isLoading = false;
        },
        dangXuat(state) {
            state.user = {};
            state.daDangNhap = false;
            state.isLoading = false;
            Cookies.remove("token");
        },
    },

    extraReducers: (builder) => {
        builder.addCase(kiemTraDangNhap.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(kiemTraDangNhap.fulfilled, (state, action) => {
            if (action.payload) {
                state.user = action.payload.user;
                state.daDangNhap = true;
            }
            state.isLoading = false;
        });

        builder.addCase(kiemTraDangNhap.rejected, (state) => {
            state.user = {};
            state.daDangNhap = false;
            state.isLoading = false;
        });
    },
});

export const { dangNhap, dangXuat } = authSlice.actions;
export default authSlice.reducer;
