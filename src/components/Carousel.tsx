import carousel_1 from "/carousel_1.png"
import carousel_2 from "/carousel_2.png"
import carousel_3 from "/carousel_3.png"
import { Link } from "react-router-dom";

const Carousel = () => {
    return (
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <Link to="/">
                        <img src={carousel_1} className="d-block w-100" style={{ maxHeight: "660px" }} alt="carousel_image_1" />
                    </Link>
                </div>
                <div className="carousel-item">
                    <Link to="/top">
                        <img src={carousel_2} className="d-block w-100" style={{ maxHeight: "660px" }} alt="carousel_image_2" />
                    </Link>
                </div>
                <div className="carousel-item">
                    <Link to="/camisa">
                        <img src={carousel_3} className="d-block w-100" style={{ maxHeight: "660px" }} alt="carousel_image_3" />
                    </Link>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Carousel;