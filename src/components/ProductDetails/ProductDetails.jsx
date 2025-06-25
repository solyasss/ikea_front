import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Heder from "../Header/Header";
import BasketMenu from "../BasketMenu/BasketMenu";
import likeIkon from "../../assets/img/header/Component 1.svg";
import shopIkon from "../../assets/img/product_details/shop.svg";
import trukIkon from "../../assets/img/product_details/truk.svg";
import rightIkon from "../../assets/img/product_details/right_arrow.svg";
import Characteristic from "../ProductCharacteristics/ProductCharacteristics";
import CommentCard from "../CommentCard/CommentCard";
import favorites_black from "../../assets/img/basket/favorite.svg";

import './ProductDetails.css';

function ProductDetails() {
    const { id } = useParams();
    const [productData, setProductData] = useState(null);
    const [menuActive, setMenuActive] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [commentText, setCommentText] = useState("");
    const [rating, setRating] = useState(5);
    const [selectedImage, setSelectedImage] = useState(null);
    const [user, setUser] = useState(null);
    const [isInWishlist, setIsInWishlist] = useState(false);

    useEffect(() => {
        const checkWishlist = async () => {
            if (!user) return;

            try {
                const response = await fetch("https://localhost:7290/api/wishlists", {
                    credentials: "include"
                });
                if (response.ok) {
                    const wishlistItems = await response.json();
                    const found = wishlistItems.some(item => item.productId === parseInt(id));
                    setIsInWishlist(found);
                }
            } catch (error) {
                console.error("Помилка при отриманні списку бажаного:", error);
            }
        };

        checkWishlist();
    }, [user, id]);

    useEffect(() => {
        async function fetchUser() {
            const response = await fetch("https://localhost:7290/api/auth/me", {
                credentials: "include"
            });
            if (response.ok) {
                const data = await response.json();
                setUser({
                    id: data.userId,
                    fullName: data.userName
                });
            } else {
                setUser(null);
            }
        }
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://localhost:7290/api/products/${id}`);
                if (!response.ok) throw new Error("Товар не знайдено");
                const data = await response.json();

                const allImages = data.images ? [data.mainImage, ...data.images] : [data.mainImage];

                setProductData({ ...data, allImages });
                setSelectedImage(data.mainImage);
            } catch (error) {
                console.error("Помилка при завантаженні товару:", error);
            }
        };
        fetchProduct();
    }, [id]);

    const renderStars = (rating) => {
        if (!rating) return "Немає оцінок";
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

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    const handleAddComment = async () => {
        if (!commentText.trim()) {
            alert("Коментар не може бути порожнім");
            return;
        }

        const dto = {
            productId: id,
            commentText,
            rating,
        };

        const response = await fetch("https://localhost:7290/api/productComments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(dto),
        });

        if (response.ok) {
            alert("Коментар додано");
            setCommentText("");
            setRating(5);

            const res = await fetch(`https://localhost:7290/api/products/${id}`);
            const updatedProduct = await res.json();
            const allImages = updatedProduct.images ? [updatedProduct.mainImage, ...updatedProduct.images] : [updatedProduct.mainImage];
            setProductData({ ...updatedProduct, allImages });
        } else if (response.status === 401) {
            alert("Будь ласка, увійдіть у систему, щоб залишити коментар.");
        } else {
            alert("Помилка при додаванні коментаря.");
        }
    };

    const handleAddToWishlist = async () => {
        if (!user) {
            alert("Будь ласка, увійдіть у систему, щоб додати товар до бажаного.");
            return;
        }

        const dto = {
            productId: parseInt(id),
        };

        try {
            const response = await fetch("https://localhost:7290/api/wishlists/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(dto),
            });

            if (response.ok) {
                alert("Товар додано до улюблених!");
                setIsInWishlist(true);
            } else if (response.status === 401) {
                alert("Потрібно увійти в систему, щоб додати до улюблених.");
            } else {
                alert("Помилка при додаванні в улюблені.");
            }
        } catch (error) {
            console.error("Помилка при додаванні до списку бажаного:", error);
            alert("Помилка з'єднання з сервером.");
        }
    };

    const handleAddToCart = async () => {
        const dto = {
            productId: parseInt(id),
            quantity: quantity,
            isCash: true,
            totalSum: parseFloat((productData.price * quantity).toFixed(2)),
        };

        try {
            const response = await fetch("https://localhost:7290/api/carts/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(dto),
            });

            if (response.ok) {
                alert("Товар додано до кошика!");
            } else if (response.status === 401) {
                alert("Будь ласка, увійдіть у систему, щоб додати товар до кошика.");
            } else {
                alert("Помилка при додаванні товару до кошика.");
            }
        } catch (error) {
            console.error("Помилка при додаванні в кошик:", error);
            alert("Помилка з'єднання з сервером.");
        }
    };

    if (!productData) return <div>Завантаження...</div>;

    return (
        <>
            <Heder />
            <div className="_container">
                <div className="details-box">
                    <div className="gallery">
                        <img
                            className="main-image"
                            src={selectedImage}
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
                                <img
                                    src={likeIkon}
                                    alt="Додати до улюблених"
                                    onClick={handleAddToWishlist}
                                    style={{ cursor: "pointer" }}
                                    title="Додати до улюблених"
                                />
                            </li>
                            <li>{productData.price}₴</li>
                            <li>
                                <div className="rating-stars">{renderStars(productData.rating)}</div>
                            </li>
                        </ul>
                        <div className="credit-info">
                            Купуйте зараз — платіть пізніше з 0% ставкою.
                            Послуга фінансування від BCR. <a className="more-info-link" href="#">Дізнатися більше</a>
                        </div>
                        <Characteristic productData={productData} />
                        <div className="thumbnails">
                            {productData.allImages.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Мініатюра ${index}`}
                                    className="slider-image"
                                    onClick={() => setSelectedImage(img)}
                                    style={{
                                        cursor: "pointer",
                                        border: selectedImage === img ? "2px solid #000" : "none",
                                    }}
                                />
                            ))}
                        </div>
                        <div className="add-basket-products-box">
                            <ul>
                                <li onClick={increaseQuantity}><button>+</button></li>
                                <li>{quantity}</li>
                                <li onClick={decreaseQuantity}><button>-</button></li>
                            </ul>
                            <button className="basket-button" onClick={handleAddToCart}>
                                Додати до кошика
                            </button>
                        </div>
                    </div>
                </div>
                <div className="product-description-text">
                    <h3>Опис товару</h3>
                    <p>{productData.description}</p>
                </div>
                {user ? (
                    <div className="add-comment-form">
                        <h4>Залишити відгук</h4>
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Ваш коментар"
                        />
                        <select value={rating} onChange={e => setRating(Number(e.target.value))}>
                            <option value={1}>1 ★</option>
                            <option value={2}>2 ★</option>
                            <option value={3}>3 ★</option>
                            <option value={4}>4 ★</option>
                            <option value={5}>5 ★</option>
                        </select>
                        <button onClick={handleAddComment}>Надіслати</button>
                    </div>
                ) : (
                    <div className="login-notice">
                        Щоб залишити коментар, потрібно <a href="/login">увійти</a> у систему.
                    </div>
                )}

                {productData.comments.map((comment) => (
                    <CommentCard
                        key={comment.id}
                        comment={comment}
                        currentUser={user}
                        productId={id}
                        onUpdated={() => {
                            fetch(`https://localhost:7290/api/products/${id}`)
                                .then(res => res.json())
                                .then(data => {
                                    const allImages = data.images ? [data.mainImage, ...data.images] : [data.mainImage];
                                    setProductData({ ...data, allImages });
                                });
                        }}
                    />
                ))}
            </div>
        </>
    );
}

export default ProductDetails;
