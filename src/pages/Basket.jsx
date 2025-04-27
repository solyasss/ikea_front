import React from "react";
import BasketBlock from "../components/Basket/Basket";
import { Link } from "react-router-dom";

function Basket() {
    return (
        <div className="container">
            <Link to="/" style={{ color: "#007bff", textDecoration: "underline" }}>
                Вернуться на главную
            </Link>
            <BasketBlock />
        </div>
    );
}

export default Basket;
