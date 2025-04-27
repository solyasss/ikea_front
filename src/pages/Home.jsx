import React from "react";
import {Link} from "react-router-dom";

import HeroSection from "../components/HeroSection/HeroSection";
import PromoSection from "../components/PromoSection/PromoSection";
import informImg from "../assets/img/InformationCard/inform-1.png"
import CategoryCards from "../components/CategorySlider/CategorySlider"
import FurnitureCards from "../components/FurnitureCards/FurnitureCards";
import NewOptions from '../components/NewOptions/NewOptions'
import buyNowImg from "../assets/img/icons_svg/BuyNow.svg";

import InformationCard from "../components/InformationCard/InformationCard";
import sliderData from "../mocks/sliderData.json";
import AdditionalRecommendations from "../components/AdditionalRecommendations/AdditionalRecommendations.jsx";
import recommendationsData from '/src/mocks/recommendations.json';


function Home() {

    return (
        <>
            <HeroSection/>
            <div className="container">
            <div style={{padding: "2rem"}}>
                <h1>Welcome to BuyNow</h1>

                <img
                    src={buyNowImg}
                    alt="logo"
                    style={{width: 250, height: 100, objectFit: "fill"}}
                />

                <ul>
                    <li><Link to="/registration">Go to Registration</Link></li>
                    <li><Link to="/products">View Products</Link></li>
                    <li><Link to="/login">Go to Login</Link></li>
                    <li><Link to="/favorites">Go to Favorites</Link></li>
                    <li><Link to="/basket">Go to Basket</Link></li>
                    <li><Link to="/idea">Go to Ideas</Link></li>
                    <li><Link to="/admin">Go to Admin Panel</Link></li>
                </ul>
            </div>

                <PromoSection title="ЗНАЙДИ ТЕ, ЩО ШУКАЄШ!"/>
                <CategoryCards title="РЕКОМЕНДАЦІЇ" cards={sliderData}/>
                <CategoryCards title="НАЙКРАЩІ НАБОРИ" cards={sliderData}/>
                <AdditionalRecommendations
                    title={recommendationsData.title}
                    showButtons={true}
                    data={recommendationsData}
                />
                <FurnitureCards/>
                <NewOptions />

                <InformationCard
                    image={informImg}
                    title="ВАЖЛИВА ІНФОРМАЦІЯ"
                    InternalTitle="ВАЖЛИВА ІНФОРМАЦІЯ"
                    text="Lorem ipsum dolor sit amet consectetur.
                Bibendum neque at em integer integer. Tempus a mi in enim dui rhoncus vulputate nulla et. 
                Ornare sed cursus sed viverra."
                />


            </div>
        </>
    );
}

export default Home;
