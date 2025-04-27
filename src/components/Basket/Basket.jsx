import React from "react";
import "./Basket.css";

function Basket() {
    return (
        <div className="container-fluid basket-container">
            <div className="basket-title-wrapper">
                <h2 className="basket-title fw-bold">ВАША КОРЗИНА ПУСТА...</h2>
            </div>

            <div className="basket-images">
                <img
                    src="/src/assets/img/favorites/face.png"
                    alt="face"
                    className="basket-circle-img"
                />
                <img
                    src="/src/assets/img/favorites/smile.png"
                    alt="smile"
                    className="basket-face-img"
                />
            </div>
        </div>
    );
}

export default Basket;
