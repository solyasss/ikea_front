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
                    <li>
                        <span>Color: </span>
                        <span
                            className="color-box"
                            style={{ backgroundColor: productData.color.toLowerCase() }}
                            title={productData.color}
                        />
                    </li>
                    <li><span>Weight: </span> {productData.weight} kg</li>
                    <li><span>Type: </span> {productData.type}</li>
                    <li><span>Country of origin: </span> {productData.countryOfOrigin}</li>
                    <li><span>Warranty: </span> {productData.warranty}</li>
                    <li><span>Materials: </span> {productData.materials}</li>
                </ul>
            </div>
        </div>
    );
}

export default ProductCharacteristics;
