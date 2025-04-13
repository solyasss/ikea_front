import React from "react";
import { Link } from "react-router-dom";

import HeroSection from "../components/HeroSection/HeroSection";
import PromoSection from "../components/PromoSection/PromoSection";

import buyNowImg from "../assets/img/icons_svg/BuyNow.svg";
import CategoryCards from "../components/CategorySlider/CategorySlider"
import sliderData from "../mocks/sliderData.json"; 

function Home() { 

    return (
        <>
            <HeroSection />

            <div style={{ padding: "2rem" }}>
                <h1>Welcome to BuyNow</h1>

                <img
                    src={buyNowImg}
                    alt="logo"
                    style={{ width: 250, height: 100, objectFit: "fill" }}
                />

                <ul>
                    <li><Link to="/registration">Go to Registration</Link></li>
                    <li><Link to="/products">View Products</Link></li>
                </ul>
            </div>

            <PromoSection title="ЗНАЙДИ ТЕ, ЩО ШУКАЄШ!" />
            <CategoryCards title="РЕКОМЕНДАЦІЇ" cards={sliderData}/>
            <CategoryCards title="НАЙКРАЩІ НАБОРИ" cards={sliderData}/>
        </>
    );
}

export default Home;
