import React, { useEffect, useState } from "react";
import basket_icon from "../../assets/img/basket/basket.svg";
import wishlist_icon from "../../assets/img/basket/wishlist.svg";
import arrow_icon from "../../assets/img/basket/strelka.svg";
import type_card1 from "../../assets/img/basket/type_card1.svg";
import type_card2 from "../../assets/img/basket/type_card2.svg";
import type_card3 from "../../assets/img/basket/type_card3.svg";
import type_card4 from "../../assets/img/basket/type_card4.svg";
import type_card5 from "../../assets/img/basket/type_card5.svg";
import type_card6 from "../../assets/img/basket/type_card6.svg";

import "./Basket.css";

function Basket() {
    const [card, setCard] = useState([]);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchCards = async () => {
            const response = await fetch("https://localhost:7290/api/carts", {
                credentials: "include"
            });
            const data = await response.json();
            setCard(data);
        };
        fetchCards();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!card) return;

            try {
                const productCopies = [];

                for (const cartItem of card) {
                    const res = await fetch(`https://localhost:7290/api/products/${cartItem.productId}`);
                    const productData = await res.json();

                    for (let i = 0; i < cartItem.quantity; i++) {
                        productCopies.push({ ...productData, cartInfo: cartItem });
                    }
                }

                setProduct(productCopies);
            } catch (error) {
                console.error("Ошибка при загрузке продуктов:", error);
            }
        };

        fetchProducts();
    }, [card]);


    return (
        // <div className="container-fluid basket-container">
        //     <div className="basket-title-wrapper">
        //         <h2 className="basket-title fw-bold">ВАША КОРЗИНА ПУСТА...</h2>
        //     </div>

        //     <div className="basket-images">
        //         <img
        //             src="/src/assets/img/favorites/face.png"
        //             alt="face"
        //             className="basket-circle-img"
        //         />
        //         <img
        //             src="/src/assets/img/favorites/smile.png"
        //             alt="smile"
        //             className="basket-face-img"
        //         />
        //     </div>
        // </div>
        <>
            <div className="basket-box">
                <div className="items-in-cart">
                    <h1>Кошик</h1>
                    {product && product.map((item, index) => (
                        <div key={index} className="card-product-item">
                            <div className="main-card-inform">
                                <img src={item.mainImage} className="card-img" />
                                <div>{item.article}</div>
                            </div>
                            <div className="card-product-desctiption">
                                <h3>{item.name}</h3>
                                <div>
                                    <span>{item.packageContents}</span>
                                    <span>{item.materials}, </span>
                                    <span>{item.dimensions} cm</span>
                                </div>
                                <div className="basket-card-icons">
                                    <img src={wishlist_icon} />
                                    <img src={basket_icon} />
                                </div>

                            </div>
                            <div className="card-extra-info">
                                <p>{item.price} ₴</p>

                            </div>
                        </div>
                    ))}
                </div>

                <div className="payment-block">
                    <h3>Резюме замовлення</h3>
                    <div className="sum-details">
                        <div>Загальна сума:</div>
                        <div>{card.reduce((sum, item) => sum + item.totalSum, 0)} ₴</div>
                    </div>
                    <div className="proceed-payment-block">
                        <div>Перейти до оформлення замовлення</div>
                        <img src={arrow_icon} />
                    </div>
                    <div className="paymant-cards-box">
                        <img src={type_card1} />
                        <img src={type_card2} />
                        <img src={type_card3} />
                        <img src={type_card4} />
                        <img src={type_card5} />
                        <img src={type_card6} />
                    </div>
                    <p>Купуйте зараз, сплачуйте потроху з 0% відсотковою ставкою. Фінансова послуга BCR. <a href="">Дізнайтесь більше тут</a></p>
                    <a href="">Политика возврата</a>
                </div>
            </div >
        </>
    );
}

export default Basket;
