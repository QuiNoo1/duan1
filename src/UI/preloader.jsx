"use client";
import { useEffect } from "react";

export default function Preloader() {

    useEffect(() => {
        const timer = setTimeout(() => {
            const preloader = document.getElementById("preloader-active");
            if (preloader) {
                preloader.style.opacity = "0";
                preloader.style.visibility = "hidden";
                preloader.style.transition = "0.5s";
            }
        }, 500); // 0.5s giống template

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div id="preloader-active">
                <div className="preloader d-flex align-items-center justify-content-center">
                    <div className="preloader-inner position-relative">
                        <div className="preloader-circle" />
                        <div className="preloader-img pere-text">
                            <img src="/assets/img/logo/logo.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
