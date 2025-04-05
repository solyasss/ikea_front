import React from "react";
import { Link } from "react-router-dom";
import buyNowImg from "../assets/BuyNow.svg";
import HeroSection from "../components/HeroSection/HeroSection"; 

function Home() {
    return (
        <>
            <div>
                <HeroSection /> 
                <div style={{ padding: "2rem" }}>
                    <h1>Welcome to ByuNow</h1>

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
            </div>
        </>
    );
}

export default Home;
