import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Heder from "../Header/Header";
import BasketMenu from "../BasketMenu/BasketMenu";
import likeIkon from "../../assets/img/header/Component 1.svg";
import './ProductDetails.css';

function ProductDetails() {
    const { id } = useParams();
    const [productData, setProductData] = useState(null);
    const [menuActive, setMenuActive] = useState(false);

    const items = [
        { value: "ГОЛОВНА", href: "/" },
        { value: "ТОВАРИ", href: "/products" },
        { value: "КІМНАТИ", href: "/" },
        { value: "ІДЕЇ", href: "/Idea" },
        { value: "ДИЗАЙН", href: "/" }
    ];

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://localhost:7290/api/products/${id}`);
                if (!response.ok) throw new Error("Product not found");
                const data = await response.json();
                setProductData(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id]);

    const renderStars = (rating) => {
        if (!rating) return "No rating";
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <>
                {Array.from({ length: fullStars }, (_, i) => <span key={`full-${i}`}>★</span>)}
                {halfStar && <span key="half">☆</span>}
                {Array.from({ length: emptyStars }, (_, i) => <span key={`empty-${i}`}>☆</span>)}
            </>
        );
    };


    if (!productData) return <div>Загрузка...</div>;

    return (
        <>
            <Heder />
            <div className="_container">
                <div className="details-box">
                    <div className="gallery">
                        <div className="thumbnails">
                            {productData.images && productData.images.map((img, index) => (
                                <img key={index} src={img} alt={`Thumb ${index}`} style={{ width: '80px' }} />
                            ))}
                        </div>
                        <img
                            className="main-image"
                            src={productData.mainImage}
                            alt={productData.name}
                        />
                    </div>

                    <div className="product-description">
                        <h2>{productData.name}</h2>
                        <ul className="product-info-list">
                            <li className="info-line-with-icon">
                                <div>
                                    <span>{productData.packageContents},</span>
                                    <span> {productData.dimensions}</span>
                                </div>
                                <img src={likeIkon} alt="Гео" />
                            </li>
                            <li>{productData.price}₴</li>
                            <li>
                                <div className="rating-stars">{renderStars(productData.rating)}</div>
                            </li>

                        </ul>
                        <div className="credit-info">
                            Купите сейчас, платите постепенно с 0% процентной ставкой.
                            Услуга финансирования, предлагаемая BCR. <a className="more-info-link" href="">Узнайте больше здесь</a>
                        </div>

                        <div className="buy-information-box">
                            <div className="order-box">
                                🚚
                                <div>
                                    <div className="order-title">Доставка</div>
                                    <div>Проверить наличие</div>
                                </div>

                            </div>
                        </div>
                        <div className="characteristics">
                            <h3 className="specs-title">Характеристики</h3>
                            <ul className="product-specs-list">
                                <li>Color: {productData.color}</li>
                                <li>Weight: {productData.weight} kg</li>
                                <li>Type: {productData.type}</li>
                                <li>Country of origin: {productData.countryOfOrigin}</li>
                                <li>Warranty: {productData.warranty}</li>
                                <li>Materials: {productData.materials}</li>
                            </ul>
                        </div>
                        <button className="basket-button">Добавить в корзину</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetails;
