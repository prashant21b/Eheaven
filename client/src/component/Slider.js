import React from 'react'
import './Slider.css';
import { Link } from 'react-router-dom';
export const Slider = () => {
  return (
    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="false">

    <div className="carousel-inner">
        <div className="carousel-item active">
            <img src="https://img.lovepik.com/background/20211020/large/lovepik-blue-technology-background-of-e-commerce-image_400052849.jpg"className="d-block w-100" alt="..."/>
            <div className="carousel-caption d-none d-md-block">
                <div className="custom-carousel-content">
                    <h1>
                        <span>Best Ecommerce Solutions 1 </span>
                        to Boost your Brand Name &amp; Sales
                    </h1>
                    <p>
                        We offer an industry-driven and successful digital marketing strategy that helps our clients
                        in achieving a strong online presence and maximum company profit.
                    </p>
                    <div>
                        <Link to="#" className="btn btn-slider">
                            Get Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        <div className="carousel-item">
            <img src="https://webfeb.in/wp-content/uploads/2017/11/ecommerce-solution.jpg" className="d-block w-100" alt="..."/>
            <div className="carousel-caption d-none d-md-block">
                <div className="custom-carousel-content">
                    <h1>
                        <span>Best Ecommerce Solutions 2 </span>
                        to Boost your Brand Name &amp; Sales
                    </h1>
                    <p>
                        We offer an industry-driven and successful digital marketing strategy that helps our clients
                        in achieving a strong online presence and maximum company profit.
                    </p>
                    <div>
                        <Link to="#" className="btn btn-slider">
                            Get Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        <div className="carousel-item">
            <img src="https://cdn.ttgtmedia.com/visuals/ComputerWeekly/Hero%20Images/Online-shopping-retail-2-adobe.jpg" className="d-block w-100" alt="..."/>
            <div className="carousel-caption d-none d-md-block">
                <div className="custom-carousel-content">
                    <h1>
                        <span>Best Ecommerce Solutions 3 </span>
                        to Boost your Brand Name &amp; Sales
                    </h1>
                    <p>
                        We offer an industry-driven and successful digital marketing strategy that helps our clients
                        in achieving a strong online presence and maximum company profit.
                    </p>
                    <div>
                        <Link to="#" className="btn btn-slider">
                            Get Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
    </button>
</div>
  )
}
