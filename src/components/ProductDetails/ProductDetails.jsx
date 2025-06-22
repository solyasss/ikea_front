import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Heder from "../Header/Header";
import BasketMenu from "../BasketMenu/BasketMenu";
import likeIkon from "../../assets/img/header/Component 1.svg";
import shopIkon from "../../assets/img/product_details/shop.svg"
import trukIkon from "../../assets/img/product_details/truk.svg"
import rightIkon from "../../assets/img/product_details/right_arrow.svg"
import Characteristic from "../ProductCharacteristics/ProductCharacteristics"
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
                console.error("Ошибка при получении вишлиста:", error);
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
                if (!response.ok) throw new Error("Product not found");
                const data = await response.json();

                const allImages = data.images ? [data.mainImage, ...data.images] : [data.mainImage];

                setProductData({ ...data, allImages });
                setSelectedImage(data.mainImage);
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

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    const handleAddComment = async () => {
        if (!commentText.trim()) {
            alert("Комментарий не может быть пустым");
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
            alert("Комментарий добавлен");
            setCommentText("");
            setRating(5);

            const res = await fetch(`https://localhost:7290/api/products/${id}`);
            const updatedProduct = await res.json();
            const allImages = updatedProduct.images ? [updatedProduct.mainImage, ...updatedProduct.images] : [updatedProduct.mainImage];
            setProductData({ ...updatedProduct, allImages });
        } else if (response.status === 401) {
            alert("Пожалуйста, войдите в систему чтобы оставить комментарий.");
        } else {
            alert("Ошибка при добавлении комментария.");
        }
    };

    const handleAddToWishlist = async () => {
        if (!user) {
            alert("Пожалуйста, войдите в систему чтобы добавить товар в вишлист.");
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
                alert("Товар добавлен в избранное!");
            } else if (response.status === 401) {
                alert("Необходимо войти в систему, чтобы добавить в избранное.");
            } else {
                alert("Ошибка при добавлении в избранное.");
            }
        } catch (error) {
            console.error("Ошибка при добавлении в вишлист:", error);
            alert("Ошибка соединения с сервером.");
        }

        if (response.ok) {
            alert("Товар добавлен в избранное!");
            setIsInWishlist(true);
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
                alert("Товар добавлен в корзину!");
            } else if (response.status === 401) {
                alert("Пожалуйста, войдите в систему чтобы добавить товар в корзину.");
            } else {
                alert("Ошибка при добавлении товара в корзину.");
            }
        } catch (error) {
            console.error("Ошибка при добавлении в корзину:", error);
            alert("Ошибка соединения с сервером.");
        }
    };


    if (!productData) return <div>Загрузка...</div>;

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
                                    alt="Добавить в избранное"
                                    onClick={handleAddToWishlist}
                                    style={{ cursor: "pointer" }}
                                    title="Добавить в избранное"
                                />
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
                        <Characteristic productData={productData} />
                        <div className="thumbnails">
                            {productData.allImages.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Thumb ${index}`}
                                    className="slider-image"
                                    onClick={() => setSelectedImage(img)}
                                    style={{
                                        cursor: "pointer",
                                        border: selectedImage === img ? "2px solid #000" : "none",
                                    }}
                                />
                            ))}
                        </div>
                        {/* <div className="buy-information-box">
                            <div className="order-box">
                                <div className="external-order-box">
                                    <img className="buy-information-icons" src={trukIkon}></img>
                                    <div>
                                        <div className="order-title">Доставка</div>
                                        <div>Проверить наличие</div>
                                    </div>
                                </div>
                                <img className="details-information-icons" src={rightIkon}></img>
                            </div>
                            <div className="separator-line" />
                            <div className="order-box">
                                <div className="external-order-box">
                                    <img className="buy-information-icons" src={shopIkon}></img>
                                    <div>
                                        <div className="order-title">В магазине</div>
                                        <div>Проверить наличие</div>
                                    </div>
                                </div>
                                <img className="details-information-icons" src={rightIkon}></img>
                            </div>
                        </div> */}
                        <div className="add-basket-products-box">
                            <ul>
                                <li onClick={increaseQuantity}><button>+</button></li>
                                <li>{quantity}</li>
                                <li onClick={decreaseQuantity}><button>-</button></li>
                            </ul>
                            <button className="basket-button" onClick={handleAddToCart}>
                                Добавить в корзину
                            </button>
                        </div>
                    </div>
                </div>
                <div className="product-description-text">
                    <h3>Описание товара</h3>
                    <p>{productData.description}</p>
                </div>
                {user ? (
                    <div className="add-comment-form">
                        <h4>Оставить отзыв</h4>
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Ваш комментарий"
                        />
                        <select value={rating} onChange={e => setRating(Number(e.target.value))}>
                            <option value={1}>1 ★</option>
                            <option value={2}>2 ★</option>
                            <option value={3}>3 ★</option>
                            <option value={4}>4 ★</option>
                            <option value={5}>5 ★</option>
                        </select>
                        <button onClick={handleAddComment}>Отправить</button>
                    </div>
                ) : (
                    <div className="login-notice">
                        Для оставления комментария необходимо <a href="/login">войти в систему</a>.
                    </div>
                )}


                {/* <div className="comments-section">
                    <h3>Отзывы</h3>
                    {productData.comments.length === 0 ? (
                        <p>Нет комментариев</p>
                    ) : (
                        <div className="comment-list">
                            {productData.comments.map((comment) => (
                                <CommentCard
                                    key={comment.id}
                                    comment={comment}
                                    currentUser={user}
                                    productId={id}
                                    onUpdated={() => {
                                        // Обновление данных после удаления или редактирования
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
                    )}
                </div> */}

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
