// ...existing code...
'use client'
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";

export default function OurProducts() {
    const [data, setData] = useState({ products: [], isLoading: true });

    useEffect(() => {
        axios
            .get('https://dummyjson.com/products')
            .then(kQ => {
                setData({ products: kQ.data.products, isLoading: false });
            })
            .catch(e => console.error(e));
    }, []);

    if (data.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <section className="popular-items section-padding30">
            <div className="container">
                <div className="row">
                    {data.products.slice(0, 8).map(p => (
                        <Item key={p.id} p={p} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function Item({ p }) {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart?.items ?? []);
    const itemInCart = cartItems.find(item => item.id === p.id);

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                sp: {
                    id: p.id,
                    name: p.title,
                    img: p.thumbnail,
                    price: p.price,
                },
                sl: 1,
            })
        );
    };

    return (
        <div className="col-md-6 col-lg-4 col-xl-3">
            <div className="product-item rounded wow fadeInUp" data-wow-delay="0.1s">
                <div className="product-item-inner border rounded">
                    <div className="product-item-inner-item">
                        <div style={{ position: 'relative', width: '100%', height: 200 }}>
                            <Image
                                src={p.thumbnail || '/assets/img/gallery/card1.png'}
                                alt={p.title || 'Product'}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                style={{ objectFit: 'cover', borderRadius: '6px 6px 0 0' }}
                            />
                        </div>
                        <div className="product-new">New</div>
                        <div className="product-details">
                            <Link href={`/product/${p.id}`} className="btn btn-link p-0" aria-label={`View ${p.title}`}>
                                    <i className="fa fa-eye fa-1x" />
                                </Link>
                        </div>
                    </div>
                    <div className="text-center rounded-bottom p-4">
                        <Link href={`/shop/${p.category?.toLowerCase().replaceAll(" ", "-")}`} className="d-block mb-2">
                            {p.category}
                        </Link>
                        <Link href={`/product/${p.id}`} className="d-block h4">
                            {p.title}
                        </Link>
                        <span className="text-primary fs-5">${p.price}</span>
                    </div>
                </div>
                <div className="product-item-add border border-top-0 rounded-bottom text-center p-4 pt-0">
                    {itemInCart ? (
                        <div className="d-flex flex-column gap-2 align-items-center">
                            <div className="d-flex align-items-center gap-3 mb-2">
                                <button
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => dispatch(addToCart({ sp: p, sl: -1 }))}
                                    disabled={itemInCart.quantity <= 1}
                                >
                                    <i className="fas fa-minus" />
                                </button>
                                <span className="fs-5">{itemInCart.quantity}</span>
                                <button
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => dispatch(addToCart({ sp: p, sl: 1 }))}
                                >
                                    <i className="fas fa-plus" />
                                </button>
                            </div>
                            <div className="d-flex gap-2">
                                <Link href="/cart" className="btn btn-sm btn-success">
                                    <i className="fas fa-shopping-cart me-2" />
                                    View Cart
                                </Link>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => dispatch(removeFromCart(p.id))}
                                >
                                    <i className="fas fa-trash" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                            onClick={handleAddToCart}
                            type="button"
                        >
                            <i className="fas fa-shopping-cart me-2" /> Add To Cart
                        </button>
                    )}
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex">
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star text-primary" />
                            <i className="fas fa-star" />
                        </div>
                        <div className="d-flex">
                            <button className="text-primary d-flex align-items-center justify-content-center me-3 btn btn-link p-0" aria-label="Compare">
                                <span className="rounded-circle btn-sm-square border">
                                  <i className="fas fa-random" />
                                </span>
                            </button>
                            <button className="text-primary d-flex align-items-center justify-content-center me-0 btn btn-link p-0" aria-label="Wishlist">
                                <span className="rounded-circle btn-sm-square border">
                                  <i className="fas fa-heart" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
// ...existing code...