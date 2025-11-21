'use client';
import React, { useMemo, useState } from 'react';
import Header from '@/UI/header';
import Footer from '@/UI/footer';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setItemsFromCart, placeOrderFromCart, setShippingInfo, setPaymentMethod } from '@/redux/slices/orderSlice';
import { clearCart } from '@/redux/slices/cartSlice';
import { useRouter } from 'next/navigation';

export default function Checkout() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const cartItems = useAppSelector((state: any) => state.cart?.items ?? []);
    const orderState = useAppSelector((state: any) => state.order?.current ?? {});

    const subtotal = useMemo(() => (
        cartItems.reduce((s: number, it: any) => s + (Number(it.price || 0) * Number(it.quantity || 0)), 0)
    ), [cartItems]);

    const shippingFee = Number(orderState.shippingFee ?? 3);
    const total = subtotal + shippingFee;

    // Local form state for shipping
    const [fullName, setFullName] = useState(orderState.shipping?.fullName ?? '');
    const [phone, setPhone] = useState(orderState.shipping?.phone ?? '');
    const [address, setAddress] = useState(orderState.shipping?.address ?? '');
    const [city, setCity] = useState(orderState.shipping?.city ?? '');
    const [country, setCountry] = useState(orderState.shipping?.country ?? 'VN');
    const [note, setNote] = useState(orderState.shipping?.note ?? '');
    const [payment, setPayment] = useState<'cod' | 'card' | 'bank'>(orderState.paymentMethod ?? 'cod');

    const onPlaceOrder = () => {
        if (!cartItems.length) {
            alert('Giỏ hàng trống.');
            return;
        }

        if (!fullName || !phone || !address) {
            alert('Vui lòng nhập họ tên, số điện thoại và địa chỉ.');
            return;
        }

        // Normalize and set items into order slice
        const items = cartItems.map((it: any) => ({
            id: it.id,
            name: it.name ?? it.title ?? 'Product',
            price: Number(it.price || 0),
            img: it.img || it.thumbnail || '',
            quantity: Number(it.quantity || 0),
        }));

        // Update order info
        dispatch(setItemsFromCart(items));
        dispatch(setShippingInfo({ fullName, phone, address, city, country, note }));
        dispatch(setPaymentMethod(payment));

        // Place order and clear cart
        dispatch(placeOrderFromCart({}));
        dispatch(clearCart());

        alert('Đặt hàng thành công!');
        router.push('/');
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
                                        <h2>Checkout</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="checkout_area section_padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="billing_details">
                                    <h3>Billing Details</h3>
                                    <div className="row">
                                        <div className="col-md-12 form-group">
                                            <input type="text" className="form-control" placeholder="Full name"
                                                value={fullName} onChange={e => setFullName(e.target.value)} />
                                        </div>
                                        <div className="col-md-12 form-group">
                                            <input type="text" className="form-control" placeholder="Phone"
                                                value={phone} onChange={e => setPhone(e.target.value)} />
                                        </div>
                                        <div className="col-md-12 form-group">
                                            <input type="text" className="form-control" placeholder="Address"
                                                value={address} onChange={e => setAddress(e.target.value)} />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <input type="text" className="form-control" placeholder="City"
                                                value={city} onChange={e => setCity(e.target.value)} />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <input type="text" className="form-control" placeholder="Country"
                                                value={country} onChange={e => setCountry(e.target.value)} />
                                        </div>
                                        <div className="col-12 form-group">
                                            <textarea className="form-control" placeholder="Order note (optional)"
                                                value={note} onChange={e => setNote(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="order_box">
                                    <h2>Your Order</h2>
                                    <ul className="list">
                                        <li>
                                            <span>Product</span>
                                            <span>Total</span>
                                        </li>
                                        {cartItems.length === 0 ? (
                                            <li><span>Giỏ hàng trống</span></li>
                                        ) : (
                                            cartItems.map((it: any) => (
                                                <li key={String(it.id)}>
                                                    <span>{it.name} <span className="middle">x {it.quantity}</span></span>
                                                    <span className="last">${(Number(it.price || 0) * Number(it.quantity || 0)).toFixed(2)}</span>
                                                </li>
                                            ))
                                        )}
                                    </ul>

                                    <ul className="list list_2">
                                        <li><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></li>
                                        <li><span>Shipping</span><span>${shippingFee.toFixed(2)}</span></li>
                                        <li><span>Total</span><span>${total.toFixed(2)}</span></li>
                                    </ul>

                                    <div className="payment_item">
                                        <div className="radion_btn">
                                            <input type="radio" id="pay_cod" name="payment" checked={payment==='cod'} onChange={() => setPayment('cod')} />
                                            <label htmlFor="pay_cod">Cash on delivery</label>
                                            <div className="check" />
                                        </div>
                                    </div>

                                    <div className="payment_item">
                                        <div className="radion_btn">
                                            <input type="radio" id="pay_card" name="payment" checked={payment==='card'} onChange={() => setPayment('card')} />
                                            <label htmlFor="pay_card">Card payment</label>
                                            <div className="check" />
                                        </div>
                                    </div>

                                    <div className="creat_account mt-3">
                                        <button className="btn_3 w-100" type="button" onClick={onPlaceOrder} disabled={cartItems.length===0}>
                                            Place Order
                                        </button>
                                    </div>
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
