export default function Video_area() {
    return(
        <>

                {/*? Video Area Start */}
                <div className="video-area">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-lg-12">
                                <div className="video-wrap">
                                    <div className="play-btn ">
                                        <a
                                            className="popup-video"
                                            href="https://www.youtube.com/watch?v=KMc6DyEJp04"
                                        >
                                            <i className="fas fa-play" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Arrow */}
                        <div className="thumb-content-box">
                            <div className="thumb-content">
                                <h3>Next Video</h3>
                                <a href="#">
                                    {" "}
                                    <i className="flaticon-arrow" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Video Area End */}


        </>
    )
}