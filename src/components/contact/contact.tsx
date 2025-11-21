'use client';

import { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { addToCart } from '@/redux/slices/cartSlice';

import Preloader from '@/UI/preloader';
import Header from '@/UI/header';
import Footer from '@/UI/footer';
import Search_model from '@/UI/search_model';

export default function Contact() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    
    // --- Simple slider state ---
    const slides = useMemo(
        () => [
            '/assets/img/gallery/gallery1.png',
            '/assets/img/gallery/gallery01.png',
            '/assets/img/gallery/gallery1.png',
        ],
        []
    );
    const [slideIdx, setSlideIdx] = useState(0);
    const prevSlide = useCallback(
        () => setSlideIdx((i) => (i - 1 + slides.length) % slides.length),
        [slides.length]
    );
    const nextSlide = useCallback(
        () => setSlideIdx((i) => (i + 1) % slides.length),
        [slides.length]
    );

    // --- Quantity state ---
    const [qty, setQty] = useState(1);
    const MIN_QTY = 0;
    const MAX_QTY = 10;

    const dec = () => setQty((q) => Math.max(MIN_QTY, q - 1));
    const inc = () => setQty((q) => Math.min(MAX_QTY, q + 1));
    const onQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = Number(e.target.value);
        if (Number.isNaN(v)) return;
        setQty(Math.max(MIN_QTY, Math.min(MAX_QTY, v)));
    };

    // --- Subscribe form ---
    const [email, setEmail] = useState('');
    const onSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: call your API here
        // e.g., await fetch('/api/subscribe', { method:'POST', body: JSON.stringify({ email }) })
        alert(`Subscribed: ${email}`);
        setEmail('');
    };

    return (
        <>
            <Preloader />
            <Header />

            <main>
                {/* Hero Area Start*/}
                <div className="slider-area">
                    <div className="single-slider slider-height2 d-flex align-items-center">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="hero-cap text-center">
                                        <h2>Watch Shop</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Hero Area End*/}

                {/*================Single Product Area =================*/}
                <div className="product_image_area">
                    <div className="container">
                        <div className="row justify-content-center">
                            {/* Slider */}
                            <div className="col-lg-12">
                                {/* Bỏ owl-carousel; thay bằng slider thuần React */}
                                <div className="product_img_slide position-relative">
                                    <div className="single_product_img text-center">
                                        <Image
                                            src={slides[slideIdx]}
                                            alt={`Gallery image ${slideIdx + 1}`}
                                            className="img-fluid"
                                            width={960}
                                            height={640}
                                            priority
                                        />
                                    </div>

                                    {/* Controls */}
                                    <button
                                        aria-label="Previous"
                                        onClick={prevSlide}
                                        className="slider-prev btn btn-light"
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '10px',
                                            transform: 'translateY(-50%)',
                                            borderRadius: 9999,
                                            width: 40,
                                            height: 40,
                                        }}
                                    >
                                        ‹
                                    </button>
                                    <button
                                        aria-label="Next"
                                        onClick={nextSlide}
                                        className="slider-next btn btn-light"
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: '10px',
                                            transform: 'translateY(-50%)',
                                            borderRadius: 9999,
                                            width: 40,
                                            height: 40,
                                        }}
                                    >
                                        ›
                                    </button>

                                    {/* Dots */}
                                    <div
                                        className="slider-dots"
                                        style={{
                                            display: 'flex',
                                            gap: 8,
                                            justifyContent: 'center',
                                            marginTop: 12,
                                        }}
                                    >
                                        {slides.map((_, i) => (
                                            <button
                                                key={i}
                                                aria-label={`Go to slide ${i + 1}`}
                                                onClick={() => setSlideIdx(i)}
                                                style={{
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: '50%',
                                                    border: 'none',
                                                    background: i === slideIdx ? '#333' : '#ccc',
                                                    cursor: 'pointer',
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Product content */}
                            <div className="col-lg-8">
                                <div className="single_product_text text-center">
                                    <h3>
                                        Foam filling cotton slow <br />
                                        rebound pillows
                                    </h3>
                                    <p>
                                        Seamlessly empower fully researched growth strategies and interoperable
                                        internal or “organic” sources. Credibly innovate granular internal or
                                        “organic” sources whereas high standards in web-readiness. Credibly innovate
                                        granular internal or organic sources whereas high standards in web-readiness.
                                        Energistically scale future-proof core competencies vis-a-vis impactful
                                        experiences. Dramatically synthesize integrated schemas. with optimal
                                        networks.
                                    </p>

                                    <div className="card_area">
                                        <div className="product_count_area d-flex align-items-center justify-content-center gap-3">
                                            <p className="mb-0">Quantity</p>

                                            <div className="product_count d-inline-flex align-items-center">
                                                <button
                                                    type="button"
                                                    className="product_count_item inumber-decrement"
                                                    onClick={dec}
                                                    aria-label="Decrease quantity"
                                                    style={{ background: 'transparent', border: 0, cursor: 'pointer' }}
                                                >
                                                    <i className="ti-minus" />
                                                </button>

                                                <input
                                                    className="product_count_item input-number text-center"
                                                    type="number"
                                                    value={qty}
                                                    min={MIN_QTY}
                                                    max={MAX_QTY}
                                                    onChange={onQtyChange}
                                                    style={{ width: 64 }}
                                                />

                                                <button
                                                    type="button"
                                                    className="product_count_item number-increment"
                                                    onClick={inc}
                                                    aria-label="Increase quantity"
                                                    style={{ background: 'transparent', border: 0, cursor: 'pointer' }}
                                                >
                                                    <i className="ti-plus" />
                                                </button>
                                            </div>

                                            <p className="mb-0">$5</p>
                                        </div>

                                        <div className="add_to_cart mt-3 d-flex gap-2 justify-content-center">
                                            <button 
                                                type="button" 
                                                className="btn_3"
                                                onClick={() => {
                                                    dispatch(addToCart({
                                                        sp: {
                                                            id: '1', // ID sẽ được dùng trong URL /product_details/1
                                                            name: 'Foam filling cotton slow rebound pillows',
                                                            price: 5,
                                                            img: slides[slideIdx]
                                                        },
                                                        sl: qty
                                                    }));
                                                    alert('Đã thêm vào giỏ hàng!');
                                                }}
                                            >
                                                Add to Cart
                                            </button>
                                            <Link href="/checkout" className="btn_3">
                                                View Cart
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* /Product content */}
                        </div>
                    </div>
                </div>
                {/*================End Single Product Area =================*/}

                {/* subscribe part here */}
                <section className="subscribe_part section_padding">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="subscribe_part_content">
                                    <h2>Get promotions &amp; updates!</h2>
                                    <p>
                                        Seamlessly empower fully researched growth strategies and interoperable
                                        internal or “organic” sources credibly innovate granular internal.
                                    </p>

                                    <form className="subscribe_form" onSubmit={onSubscribe}>
                                        <input
                                            type="email"
                                            placeholder="Enter your mail"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <button type="submit" className="btn_1">
                                            Subscribe
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* subscribe part end */}
            </main>

            <Footer />
            <Search_model />
        </>
    );
}
