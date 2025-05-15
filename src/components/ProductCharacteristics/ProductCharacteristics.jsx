import React, { useState } from "react";
import './ProductCharacteristics.css';
import upArrow from "../../assets/img/product_details/up_arrow.png";
import downArrow from "../../assets/img/product_details/down_arrow.png";

function ProductCharacteristics({ productData }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div className="characteristics">
            <div className="characteristics-title" onClick={toggleOpen}>
                <h3 className="specs-title">Характеристики</h3>
                <img
                    className="arrow"
                    src={isOpen ? upArrow : downArrow}
                    alt={productData.name}
                    width={16}
                />
            </div>

            <div className={`specs-content ${isOpen ? "open" : ""}`}>
                <ul className="product-specs-list">
                    <li>Color: {productData.color}</li>
                    <li>Weight: {productData.weight} kg</li>
                    <li>Type: {productData.type}</li>
                    <li>Country of origin: {productData.countryOfOrigin}</li>
                    <li>Warranty: {productData.warranty}</li>
                    <li>Materials: {productData.materials}</li>
                </ul>
            </div>
        </div>
    );
}

export default ProductCharacteristics;
