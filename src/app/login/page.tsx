"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { dangNhap } from "@/redux/slices/authSlice";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();
            console.log("LOGIN DATA:", data); // để bạn tự kiểm tra

            if (res.ok) {
                // 🔥 1. LẤY ĐÚNG TOKEN TỪ DUMMYJSON
                const accessToken = data.accessToken || data.token; // ưu tiên accessToken

                // Nếu vẫn không có thì báo lỗi cho dễ debug
                if (!accessToken) {
                    setError("Không lấy được accessToken từ API!");
                    setLoading(false);
                    return;
                }

                // 🔥 2. LƯU TOKEN VÀO COOKIE (trùng với authSlice đọc)
                Cookies.set("token", accessToken, { expires: 7 });

                // 🔥 3. CẬP NHẬT REDUX AUTH
                dispatch(
                    dangNhap({
                        user: data,
                        daDangNhap: true,
                    })
                );

                // 🔥 4. CHUYỂN TRANG
                router.push("/");
            } else {
                setError("Sai tài khoản hoặc mật khẩu!");
            }
        } catch (err) {
            console.error(err);
            setError("Lỗi khi đăng nhập!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
        >
            <div className="bg-white p-5 rounded shadow" style={{ width: 400 }}>
                <h3 className="text-center mb-4 text-primary fw-bold">Đăng Nhập</h3>

                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Tên đăng nhập"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <div className="position-relative mb-3">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="position-absolute top-50 end-0 translate-middle-y px-3"
                            style={{ cursor: "pointer" }}
                        >
              👁️
            </span>
                    </div>

                    {error && <p className="text-danger small">{error}</p>}

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                </form>
            </div>
        </div>
    );
}
