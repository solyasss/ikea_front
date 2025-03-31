import React from "react";
import "./ProductCard.css";

function ProductCard({ name, price, image }) {
    return (
        <div className="product-card">
            <img src={image} alt={name} className="product-image" />
            <h4>{name}</h4>
            <p>${price}</p>
        </div>
    );
}

export default ProductCard;
