'use client';
import React, { useMemo } from 'react';
import Header from '@/UI/header';
import Footer from '@/UI/footer';
import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { addToCart, removeFromCart, clearCart } from '@/redux/slices/cartSlice';
import { setItemsFromCart, placeOrderFromCart } from '@/redux/slices/orderSlice';

export default function Cart() {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state: any) => state.cart?.items ?? []);

    // Normalize items so UI always sees numeric price and quantity and an id
    const cart = useMemo(() => {
        return cartItems.map((item: any) => ({
            ...item,
            id: item.id ?? item._id ?? `${item.name}-${String(item.price ?? 0)}`,
            quantity: Number(item.quantity ?? item.soluong ?? item.sl ?? item.count ?? 0) || 0,
            price: Number(item.price ?? item.gia ?? 0) || 0,
            name: item.name || 'Product',
            img: item.img || '/assets/img/gallery/card1.png'
        }));
    }, [cartItems]);

    const subtotal = useMemo(
        () => cart.reduce((s: number, i: any) => s + i.price * i.quantity, 0),
        [cart]
    );
    const shipping = 3;
    const total = subtotal + shipping;

    const handleInc = (item: any) => {
        dispatch(addToCart({ sp: item, sl: 1 }));
    };

    const handleDec = (item: any) => {
        if (item.quantity <= 1) {
            dispatch(removeFromCart(item.id));
        } else {
            dispatch(addToCart({ sp: item, sl: -1 }));
        }
    };

    const handleRemove = (id: string | number) => {
        dispatch(removeFromCart(id));
    };

    const handleCheckout = () => {
        if (!cart.length) {
            return alert('Giỏ hàng trống!');
        }
        try {
            // Normalize items before sending to order
            const orderItems = cart.map((item: {
                id: string | number;
                name: string;
                price: number;
                quantity: number;
                img?: string;
            }) => ({
                id: item.id,
                name: item.name,
                price: Number(item.price),
                quantity: Number(item.quantity),
                img: item.img
            }));
            
            dispatch(setItemsFromCart(orderItems));
            dispatch(placeOrderFromCart({}));
            dispatch(clearCart());
            alert('Đặt hàng thành công!');
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!');
        }
    };

    return (
        <>
            <Header />
            <main>
                <div className="slider-area">
                    <div className="single-slider slider-height2 d-flex align-items-center">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="hero-cap text-center">
                                        <h2>Cart List</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="cart_area section_padding">
                    <div className="container">
                        <div className="cart_inner">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Product</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Total</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="text-center py-4">
                                                    Giỏ hàng đang trống
                                                </td>
                                            </tr>
                                        ) : (
                                            cart.map((item: any) => (
                                                <tr key={String(item.id)}>
                                                    <td>
                                                        <div className="media">
                                                            <div className="d-flex">
                                                                <Link href={`/product_details/${item.id}`}>
                                                                    <Image
                                                                        src={item.img}
                                                                        alt={item.name}
                                                                        width={80}
                                                                        height={80}
                                                                        style={{ objectFit: 'cover' }}
                                                                    />
                                                                </Link>
                                                            </div>
                                                            <div className="media-body ms-3">
                                                                <Link 
                                                                    href={`/product_details/${item.id}`} 
                                                                    className="text-decoration-none text-dark"
                                                                >
                                                                    <p className="mb-0">{item.name}</p>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <h5>${item.price.toFixed(2)}</h5>
                                                    </td>
                                                    <td>
                                                        <div className="product_count d-flex align-items-center">
                                                            <button
                                                                className="input-number-decrement me-2"
                                                                onClick={() => handleDec(item)}
                                                                aria-label={`Decrease ${item.name} quantity`}
                                                            >
                                                                <i className="ti-minus"></i>
                                                            </button>
                                                            <input
                                                                className="input-number text-center"
                                                                type="text"
                                                                value={item.quantity}
                                                                readOnly
                                                                style={{ width: '50px' }}
                                                            />
                                                            <button
                                                                className="input-number-increment ms-2"
                                                                onClick={() => handleInc(item)}
                                                                aria-label={`Increase ${item.name} quantity`}
                                                            >
                                                                <i className="ti-plus"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <h5>${(item.price * item.quantity).toFixed(2)}</h5>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex gap-2">
                                                            <Link 
                                                                href={`/product_details/${item.id}`}
                                                                className="btn btn-outline-primary btn-sm"
                                                                title="View product details"
                                                            >
                                                                <i className="ti-eye"></i>
                                                            </Link>
                                                            <button
                                                                className="btn btn-outline-danger btn-sm"
                                                                onClick={() => handleRemove(item.id)}
                                                                title={`Remove ${item.name} from cart`}
                                                            >
                                                                <i className="ti-trash"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}

                                        {cart.length > 0 && (
                                            <>
                                                <tr className="bottom_button">
                                                    <td colSpan={5}>
                                                        <div className="d-flex justify-content-end">
                                                            <button
                                                                className="btn btn-outline-danger"
                                                                onClick={() => dispatch(clearCart())}
                                                            >
                                                                Clear Cart
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={3}></td>
                                                    <td>
                                                        <h5>Subtotal</h5>
                                                    </td>
                                                    <td>
                                                        <h5>${subtotal.toFixed(2)}</h5>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={3}></td>
                                                    <td>
                                                        <h5>Shipping</h5>
                                                    </td>
                                                    <td>
                                                        <h5>${shipping.toFixed(2)}</h5>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={3}></td>
                                                    <td>
                                                        <h4>Total</h4>
                                                    </td>
                                                    <td>
                                                        <h4>${total.toFixed(2)}</h4>
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                    </tbody>
                                </table>

                                <div className="checkout_btn_inner d-flex justify-content-end gap-3 mt-4">
                                    <Link href="/" className="btn_1">
                                        Continue Shopping
                                    </Link>
                                    <button
                                        className="btn_1 checkout_btn_1"
                                        onClick={handleCheckout}
                                        disabled={cart.length === 0}
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
