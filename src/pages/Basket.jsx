import React from "react";
import BasketBlock from "../components/Basket/Basket";
// import { Link } from "react-router-dom";
import Headers from "../components/Header/Header";
import Footer from "../components/Footer/Footer.jsx";

function Basket() {
    return (
        <>
            <Headers />
            <div className="container">
                {/*<Link to="/" style={{ color: "#007bff", textDecoration: "underline" }}>*/}
                {/*    Вернуться на главную*/}
                {/*</Link>*/}
                <BasketBlock />
            </div>
            <Footer/>
        </>
    );
}

export default Basket;
