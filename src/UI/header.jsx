'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { kiemTraDangNhap, dangXuat } from '@/redux/slices/authSlice';

export default function Header() {
    const dispatch = useAppDispatch();

    const { user, daDangNhap, isLoading } = useAppSelector((state) => state.auth);

    // Khi Header render lần đầu -> kiểm tra token trong cookie
    useEffect(() => {
        dispatch(kiemTraDangNhap());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(dangXuat());
    };

    return (
        <header>
            {/* Header Start */}
            <div className="header-area">
                <div className="main-header header-sticky">
                    <div className="container-fluid">
                        <div className="menu-wrapper">
                            {/* Logo */}
                            <div className="logo">
                                <Link href="/">
                                    <img src="assets/images/logo/logo.png" alt="" />
                                </Link>
                            </div>

                            {/* Main-menu */}
                            <div className="main-menu d-none d-lg-block">
                                <nav>
                                    <ul id="navigation">
                                        <li>
                                            <Link href="/">Home</Link>
                                        </li>
                                        <li>
                                            <Link href="/shop">shop</Link>
                                        </li>
                                        <li>
                                            <Link href="/about">about</Link>
                                        </li>
                                        <li className="hot">
                                            <a href="#">Latest</a>
                                            <ul className="submenu">
                                                <li>
                                                    <Link href="/shop"> Product list</Link>
                                                </li>
                                                <li>
                                                    <Link href="/product_details"> Product Details</Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Link href="/blog">Blog</Link>
                                            <ul className="submenu">
                                                <li>
                                                    <Link href="/blog">Blog</Link>
                                                </li>
                                                <li>
                                                    <Link href="#">Blog Details</Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="/page">Pages</a>
                                            <ul className="submenu">
                                                <li>
                                                    <Link href="/login">Login</Link>
                                                </li>
                                                <li>
                                                    <Link href="/cart">Cart</Link>
                                                </li>
                                                <li>
                                                    <Link href="#">Element</Link>
                                                </li>
                                                <li>
                                                    <Link href="#">Confirmation</Link>
                                                </li>
                                                <li>
                                                    <Link href="/checkout">Product Checkout</Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Link href="/contact">Contact</Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                            {/* Header Right */}
                            <div className="header-right">
                                <ul>
                                    <li>
                                        <div className="nav-search search-switch">
                                            <span className="flaticon-search" />
                                        </div>
                                    </li>

                                    {/* User area */}
                                    <li className="header-user">
                                        {isLoading ? (
                                            <span>...</span>
                                        ) : daDangNhap ? (
                                            <>
                                                <span className="flaticon-user" />
                                                <span className="header-username">
                          {user?.username ||
                              user?.firstName ||
                              user?.email ||
                              'User'}
                        </span>
                                                <button
                                                    type="button"
                                                    className="header-logout-btn"
                                                    onClick={handleLogout}
                                                >
                                                    Logout
                                                </button>
                                            </>
                                        ) : (
                                            <Link href="/login">
                                                <span className="flaticon-user" />
                                            </Link>
                                        )}
                                    </li>

                                    <li>
                                        <Link href="/cart">
                                            <span className="flaticon-shopping-cart" />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Mobile Menu */}
                        <div className="col-12">
                            <div className="mobile_menu d-block d-lg-none" />
                        </div>
                    </div>
                </div>
            </div>
            {/* Header End */}
        </header>
    );
}
