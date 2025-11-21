'use client'

import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/slices/cartSlice";

const products = [
    {
        id: 1,
        name: "Thermo Ball Etip Gloves",
        img: "assets/img/gallery/popular1.png",
        price: 45743,
    },
    {
        id: 2,
        name: "Thermo Ball Etip Gloves",
        img: "assets/img/gallery/popular2.png",
        price: 45743,
    },
    {
        id: 3,
        name: "Thermo Ball Etip Gloves",
        img: "assets/img/gallery/popular3.png",
        price: 45743,
    },
    {
        id: 4,
        name: "Thermo Ball Etip Gloves",
        img: "assets/img/gallery/popular4.png",
        price: 45743,
    },
    {
        id: 5,
        name: "Thermo Ball Etip Gloves",
        img: "assets/img/gallery/popular5.png",
        price: 45743,
    },
    {
        id: 6,
        name: "Thermo Ball Etip Gloves",
        img: "assets/img/gallery/popular6.png",
        price: 45743,
    },
];

export default function Popular_items() {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart?.items ?? []);

    const handleAddToCart = (p) => {
        dispatch(
            addToCart({
                sp: {
                    id: p.id,
                    name: p.name,
                    img: p.img,
                    price: p.price,
                },
                sl: 1,
            })
        );
    };

    const isInCart = (id) => cartItems.some((item) => item.id === id);

    return (
        <>
            {/*? Popular Items Start */}
            <div className="popular-items section-padding30">
                <div className="container">
                    {/* Section tittle */}
                    <div className="row justify-content-center">
                        <div className="col-xl-7 col-lg-8 col-md-10">
                            <div className="section-tittle mb-70 text-center">
                                <h2>Popular Items</h2>
                                <p>
                                    Consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                    ut labore et dolore magna aliqua. Quis ipsum suspendisse
                                    ultrices gravida.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {products.map((p) => (
                            <div
                                key={p.id}
                                className="col-xl-4 col-lg-4 col-md-6 col-sm-6"
                            >
                                <div className="single-popular-items mb-50 text-center">
                                    <div className="popular-img">
                                        <img src={p.img} alt={p.name} />
                                        <div
                                            className="img-cap"
                                            onClick={() => handleAddToCart(p)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <span>{isInCart(p.id) ? "In cart" : "Add to cart"}</span>
                                        </div>
                                        <div className="favorit-items">
                                            <span className="flaticon-heart" />
                                        </div>
                                    </div>
                                    <div className="popular-caption">
                                        <h3>
                                            <Link href="/product_details">{p.name}</Link>
                                        </h3>
                                        <span>$ {p.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Button */}
                    <div className="row justify-content-center">
                        <div className="room-btn pt-70">
                            <Link href="/catagori" className="btn view-btn1">
                                View More Products
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* Popular Items End */}
        </>
    );
}
