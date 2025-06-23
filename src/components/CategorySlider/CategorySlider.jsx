import CategoryCards from "../CategoryCards/CategoryCards"
import "./CategorySlider.css"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PrevArrow({ onClick }) {
    return (
        <button className="cat-arrow prev" onClick={onClick} aria-label="Попередня">
            ‹
        </button>
    );
}

function NextArrow({ onClick }) {
    return (
        <button className="cat-arrow next" onClick={onClick} aria-label="Наступна">
            ›
        </button>
    );
}

function CategorySlider({ title, cards }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 0,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };


    return (
        <>
            <div className="category-slider">
                <h1>{title}</h1>
                <div className="slider-wrapper">
                    <Slider {...settings}>
                        {cards?.map((card, i) => (
                            <CategoryCards key={i} image={card.image} name={card.name} />
                        ))}
                    </Slider>
                </div>
            </div>
        </>
    );
}

export default CategorySlider;