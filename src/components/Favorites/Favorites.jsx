import React, { useEffect, useState } from "react";
import basket_icon from "../../assets/img/favorites/basket_icon.svg";
import delete_icon from "../../assets/img/basket/basket.svg";

import "./Favorites.css";

function Favorites() {
    const [wishlist, setwishlist] = useState([]);
    const [product, setProduct] = useState([]);

    const totalStars = 5;

    useEffect(() => {
        const fetchList = async () => {
            const response = await fetch("https://localhost:7290/api/wishlists", {
                credentials: "include"
            });
            const data = await response.json();
            setwishlist(data);
        };
        fetchList();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!wishlist || wishlist.length === 0) return;

            try {
                const productCopies = [];

                for (const listItem of wishlist) {
                    const response = await fetch(`https://localhost:7290/api/products/${listItem.productId}`);
                    const data = await response.json();

                    productCopies.push({ ...data, cartInfo: listItem });
                }

                setProduct(productCopies);
            } catch (error) {
                console.error("Ошибка при загрузке продуктов:", error);
            }
        };

        fetchProducts();
    }, [wishlist]);

    const handleRemoveFromWishlist = async (productId) => {
        try {
            const response = await fetch(`https://localhost:7290/api/wishlists/remove/${productId}`, {
                method: "DELETE",
                credentials: "include"
            });

            if (response.ok) {
                setwishlist(prev => prev.filter(item => item.productId !== productId));
            } else {
                const error = await response.json();
                console.error("Ошибка при удалении:", error.message);
            }
        } catch (err) {
            console.error("Ошибка запроса удаления:", err);
        }
    };

    const handleClearWishlist = async () => {
        try {
            const response = await fetch("https://localhost:7290/api/wishlists/clear", {
                method: "POST",
                credentials: "include"
            });

            if (response.ok) {
                setwishlist([]);
                setProduct([]);
            } else {
                const error = await response.json();
                console.error("Ошибка при очистке:", error.message);
            }
        } catch (err) {
            console.error("Ошибка запроса очистки:", err);
        }
    };




    return (
        <>
            {wishlist.length === 0 ? (
                <div className="container-fluid favorites-container">
                    <div className="favorites-title-wrapper">
                        <h2 className="favorites-title fw-bold">ВАШ ЛИСТ БАЖАНЬ ПУСТИЙ...</h2>
                    </div>
                    <div className="favorites-images">
                        <img
                            src="/src/assets/img/favorites/face.png"
                            alt="face"
                            className="favorites-circle-img"
                        />
                        <img
                            src="/src/assets/img/favorites/smile.png"
                            alt="smile"
                            className="favorites-face-img"
                        />
                    </div>
                </div>
            ) : (
                <div className="favorite-details-block">
                    <h1>Мій список</h1>
                    <div className="price-basket">
                        <div className="all-price">
                            {product.reduce((sum, item) => sum + item.price, 0)} ₴
                        </div>
                    </div>
                    <div className="wishlist-action-buttons">
                        <button onClick={handleClearWishlist}>
                            <img src={delete_icon} className="white-icon" alt="delete all" />
                            <p>Очистити список</p>
                        </button>
                        <button>
                            <img src={basket_icon} className="white-icon" alt="basket" />
                            <p>Додати всі товари до кошика</p>
                        </button>
                    </div>
                    {product.map((item, index) => (
                        <div key={index} className="favorite-product-card">
                            <img src={item.mainImage} className="product-main-image" />
                            <div className="favorite-product-description">
                                <h3>{item.name}</h3>
                                <div>
                                    <span>{item.packageContents}</span>
                                    <span>{item.materials}, </span>
                                    <span>{item.dimensions} cm, </span>
                                    <span>
                                        колір
                                        <div
                                            className="color-box"
                                            style={{ backgroundColor: item.color }}
                                            title={item.color}
                                        ></div>
                                    </span>
                                </div>
                                <div className="all-price">{item.price} ₴</div>
                                <div className="rating-reviews">
                                    <div className="star-rating">
                                        {Array.from({ length: totalStars }, (_, index) => (
                                            <span
                                                key={index}
                                                className={index < Math.round(item.rating) ? "star filled" : "star"}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                    <span className="number-reviews">({item.comments?.length || 0} відгуків)</span>
                                </div>
                                <div className="favorite-product-icons">
                                    <div>
                                        <img src={basket_icon} className="white-icon" alt="basket" />
                                    </div>
                                    <img
                                        src={delete_icon}
                                        width={25}
                                        alt="delete"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleRemoveFromWishlist(item.cartInfo.productId)}
                                    />

                                </div>
                            </div>
                            <div className="additional-information">
                                <ul className="custom-bullet">
                                    <li>Перевірте доставку додому та наявність на складі</li>
                                </ul>
                                <a href="">Більше варіантів</a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default Favorites;
