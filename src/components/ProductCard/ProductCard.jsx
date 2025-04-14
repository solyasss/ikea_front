import React from "react";
import "./ProductCard.css";
import topLabel from "../../assets/img/products/label/top.svg";

function ProductCard({name, title, price, image}) {
    return (
        <div className="product-card p-0 position-relative">
            <img src={topLabel} alt="Top" className="product-label-top" />
            <img src={image} alt={name} className="product-image mb-0" />
            <div className="product-card-text">
                <h5 className="fw-sem-bold text-uppercase mb-1">{name}</h5>
                <h5 className="mb-3 text-truncate">{title}</h5>
                <h3 className="fw-ext-bold text-uppercase mb-0">{price}$</h3>
            </div>
        </div>
    );
}

export default ProductCard;
