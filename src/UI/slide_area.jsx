'use client'

import Link from 'next/link';
import Image from 'next/image';

export default function Slide_area() {
    return (
        <>
            <main>
                {/* slider Area Start */}
                <div className="slider-area">
                    <div className="slider-active">
                        {/* Single Slider */}
                        <div className="single-slider slider-height d-flex align-items-center slide-bg">
                            <div className="container">
                                <div className="row justify-content-between align-items-center">
                                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8">
                                        <div className="hero__caption">
                                            <h1
                                                data-animation="fadeInLeft"
                                                data-delay=".4s"
                                                data-duration="2000ms"
                                            >
                                                Select Your New Perfect Style
                                            </h1>
                                            <p
                                                data-animation="fadeInLeft"
                                                data-delay=".7s"
                                                data-duration="2000ms"
                                            >
                                                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                                laboris nisi ut aliquip ex ea commodo consequat is aute irure.
                                            </p>
                                            {/* Hero-btn */}
                                            <div
                                                className="hero__btn"
                                                data-animation="fadeInLeft"
                                                data-delay=".8s"
                                                data-duration="2000ms"
                                            >
                                                <Link href="/industries" className="btn hero-btn">
                                                    Shop Now
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 d-none d-sm-block">
                                        <div
                                            className="hero__img"
                                            data-animation="bounceIn"
                                            data-delay=".4s"
                                        >
                                            <Image
                                                src="/assets/img/hero/watch.png"
                                                alt="New style watch"
                                                width={400}
                                                height={400}
                                                className="heartbeat"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Single Slider End */}
                    </div>
                </div>
                {/* slider Area End*/}
            </main>
        </>
    );
}
