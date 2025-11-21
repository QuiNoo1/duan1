export default function Search_model() {
    return(
        <>
            {/*? Search model Begin */}
            <div className="search-model-box">
                <div className="h-100 d-flex align-items-center justify-content-center">
                    <div className="search-close-btn">+</div>
                    <form className="search-model-form">
                        <input type="text" id="search-input" placeholder="Searching key....." />
                    </form>
                </div>
            </div>
            {/* Search model end */}
        </>

    )
}