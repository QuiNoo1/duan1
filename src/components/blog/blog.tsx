'use client'
import Header from "@/UI/header";
import Footer from "@/UI/footer";

export default function Blog() {
    return (
        <>
            <Header />
            <main>
                {/* Hero Area Start */}
                <div className="slider-area">
                    <div className="single-slider slider-height2 d-flex align-items-center">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="hero-cap text-center">
                                        <h2>Blog</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Hero Area End */}

                {/* Blog Area Start */}
                <section className="blog_area section-padding">
                    <div className="container">
                        <div className="row">
                            {/* LEFT SIDE */}
                            <div className="col-lg-8 mb-5 mb-lg-0">
                                <div className="blog_left_sidebar">

                                    {[1,2,3,4,5].map((num) => (
                                        <article key={num} className="blog_item">
                                            <div className="blog_item_img">
                                                <img
                                                    className="card-img rounded-0"
                                                    src={`/assets/img/blog/single_blog_${num}.png`}
                                                    alt=""
                                                />
                                                <a href="#" className="blog_item_date">
                                                    <h3>15</h3>
                                                    <p>Jan</p>
                                                </a>
                                            </div>
                                            <div className="blog_details">
                                                <a className="d-inline-block" href="#">
                                                    <h2>Google inks pact for new 35-storey office</h2>
                                                </a>
                                                <p>
                                                    That dominion stars lights dominion divide years for fourth
                                                    have dont stars is that he earth it first without heaven in
                                                    place seed it second morning saying.
                                                </p>
                                                <ul className="blog-info-link">
                                                    <li>
                                                        <a href="#"><i className="fa fa-user" /> Travel, Lifestyle</a>
                                                    </li>
                                                    <li>
                                                        <a href="#"><i className="fa fa-comments" /> 03 Comments</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </article>
                                    ))}

                                    {/* Pagination */}
                                    <nav className="blog-pagination justify-content-center d-flex">
                                        <ul className="pagination">
                                            <li className="page-item">
                                                <a href="#" className="page-link" aria-label="Previous">
                                                    <i className="ti-angle-left" />
                                                </a>
                                            </li>
                                            <li className="page-item"><a href="#" className="page-link">1</a></li>
                                            <li className="page-item active"><a href="#" className="page-link">2</a></li>
                                            <li className="page-item">
                                                <a href="#" className="page-link" aria-label="Next">
                                                    <i className="ti-angle-right" />
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>

                                </div>
                            </div>

                            {/* RIGHT SIDE */}
                            <div className="col-lg-4">
                                <div className="blog_right_sidebar">

                                    {/* Search */}
                                    <aside className="single_sidebar_widget search_widget">
                                        <form action="#">
                                            <div className="input-group mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search Keyword"
                                                    onFocus={(e) => (e.target.placeholder = "")}
                                                    onBlur={(e) => (e.target.placeholder = "Search Keyword")}
                                                />
                                                <div className="input-group-append">
                                                    <button className="btns" type="button">
                                                        <i className="ti-search" />
                                                    </button>
                                                </div>
                                            </div>
                                            <button className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn" type="submit">
                                                Search
                                            </button>
                                        </form>
                                    </aside>

                                    {/* Category */}
                                    <aside className="single_sidebar_widget post_category_widget">
                                        <h4 className="widget_title">Category</h4>
                                        <ul className="list cat-list">
                                            {[
                                                ["Restaurant food", 37],
                                                ["Travel news", 10],
                                                ["Modern technology", 3],
                                                ["Product", 11],
                                                ["Inspiration", 21],
                                                ["Health Care", 9],
                                            ].map(([name, count]) => (
                                                <li key={name}>
                                                    <a href="#" className="d-flex">
                                                        <p>{name}</p>
                                                        <p>({count})</p>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </aside>

                                    {/* Recent Posts */}
                                    <aside className="single_sidebar_widget popular_post_widget">
                                        <h3 className="widget_title">Recent Post</h3>

                                        {[1,2,3,4].map((num) => (
                                            <div key={num} className="media post_item">
                                                <img src={`/assets/img/post/post_${num}.png`} alt="post" />
                                                <div className="media-body">
                                                    <a href="#"><h3>Example post title</h3></a>
                                                    <p>January 12, 2019</p>
                                                </div>
                                            </div>
                                        ))}
                                    </aside>

                                    {/* Tag Cloud */}
                                    <aside className="single_sidebar_widget tag_cloud_widget">
                                        <h4 className="widget_title">Tag Clouds</h4>
                                        <ul className="list">
                                            {["project","love","technology","travel","restaurant","life style","design","illustration"].map(tag => (
                                                <li key={tag}><a href="#">{tag}</a></li>
                                            ))}
                                        </ul>
                                    </aside>

                                    {/* Newsletter */}
                                    <aside className="single_sidebar_widget newsletter_widget">
                                        <h4 className="widget_title">Newsletter</h4>
                                        <form action="#">
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Enter email"
                                                onFocus={(e) => (e.target.placeholder = "")}
                                                onBlur={(e) => (e.target.placeholder = "Enter email")}
                                            />
                                            <button className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn" type="submit">
                                                Subscribe
                                            </button>
                                        </form>
                                    </aside>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Blog Area End */}
            </main>
        <Footer />
        </>
    )
}