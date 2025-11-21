import axios from "axios";
import Cookies from "js-cookie";

export const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api",
    headers: { "Content-Type": "application/json" },
});

// Gắn Authorization từ cookie trước mỗi request
axiosClient.interceptors.request.use((config) => {
    const token = Cookies.get("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Nếu 401, tùy bạn: xóa token & điều hướng
axiosClient.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err?.response?.status === 401) {
            Cookies.remove("token");
            // window.location.href = "/login"; // nếu muốn
        }
        return Promise.reject(err);
    }
);
