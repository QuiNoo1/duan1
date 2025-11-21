'use client'
import Preloader from "@/UI/preloader";
import Header from "@/UI/header";
import Slide_area from "@/UI/slide_area";
import New_product from "@/UI/new_product";
import Gallery_area from "@/UI/gallery_area";
import Popular_items from "@/UI/popular_items";
import Video_area from "@/UI/video_area";
import Watch_choice from "@/UI/watch_choice";
import Footer from "@/UI/footer";
import Search_model from "@/UI/search_model";
import ShopMethod from "@/UI/shopmethod";
import OurProducts from "@/UI/ourproduct";

export default function Index() {
    return (
        <>
        <Preloader/>
        <Header/>

            <Slide_area/>
            <OurProducts/>
            <New_product />
            <Gallery_area/>
            <Popular_items/>
            <Video_area/>
            <Watch_choice/>
            <ShopMethod/>
            <Footer/>
            <Search_model/>

            </>
    )
}