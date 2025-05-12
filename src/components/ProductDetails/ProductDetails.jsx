import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Heder from "../Header/Header";
import BasketMenu from "../BasketMenu/BasketMenu";
import "./ProductDetails.css";

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
        ]

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://localhost:7290/api/products/${id}`);
                if (!response.ok) {
                    throw new Error("Product not found");
                }
                const data = await response.json();
                setProductData(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!productData) return <div>Загрузка...</div>;

    return (
        <>
            <Heder />
            <div className="_container">
                <h1>{productData.product.name}</h1>
                <img src={productData.product.mainImage} alt={productData.product.name} />
                <p>Категория: {productData.category?.title}</p>
                <p>Цена: ${productData.product.price}</p>

                <h3>Характеристики</h3>
                <ul>
                    {productData.productCharacteristics.map((char, index) => (
                        <li key={index}>{char.name}: {char.value}</li>
                    ))}
                </ul>

                <h3>Комментарии</h3>
                <ul>
                    {productData.productComments.map((comment, index) => (
                        <li key={index}>
                            <strong>{comment.userName}</strong>: {comment.commentText} ({comment.rating}/5)
                        </li>
                    ))}
                </ul>

                <h3>Другие изображения</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                    {productData.productImages.map((img, index) => (
                        <img key={index} src={img.imageUrl} alt={`Product ${index}`} style={{ width: '100px' }} />
                    ))}
                </div>
                <button className="basket__button" onClick={() => setMenuActive(!menuActive)} >Добавить в корзину</button>
                <BasketMenu active={menuActive} setActive={setMenuActive} header={"БУРГЕР МЕНЮ"} items={items} />
            </div>
        </>
    );
}

export default ProductDetails;
