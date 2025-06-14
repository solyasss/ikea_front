import React, { useEffect, useState } from "react";
import basket_icon from "../../assets/img/basket/basket.svg";
import wishlist_icon from "../../assets/img/basket/wishlist.svg";
import "./Basket.css";

function Basket() {
    const [card, setCard] = useState(null);
    const [product, setProduct] = useState(null);

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
                <div className="payment-block">Hello test block</div>
            </div>
        </>
    );
}

export default Basket;
