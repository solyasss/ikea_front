import React, { useEffect, useState } from "react";
import "./UserOrder.css";

function UserOrder({ Id }) {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!Id) return;

        const fetchOrder = async () => {
            try {
                const response = await fetch(`https://localhost:7290/api/orders/${Id}`);
                if (!response.ok) {
                    throw new Error("Не вдалося завантажити замовлення");
                }
                const data = await response.json();
                setOrder(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [Id]);

    if (loading) return <p>Завантаження...</p>;
    if (error) return <p>Помилка: {error}</p>;
    if (!order) return <p>Замовлення не знайдено</p>;

    return (
        <div className="user-order">
            <h2>Деталі замовлення #{order.orderNumber}</h2>
            <div className="order-info">
                <img src={order.productImage} alt={order.productName} className="order-product-image" />
                <div className="order-details">
                    <p><strong>Товар:</strong> {order.productName}</p>
                    <p><strong>Ціна:</strong> ${order.productPrice.toFixed(2)}</p>
                    <p><strong>Коментар:</strong> {order.commentText}</p>
                    <p><strong>Оцінка:</strong> {order.commentRating} / 5</p>
                    <p><strong>Дата замовлення:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                    <p><strong>Дата отримання:</strong> {new Date(order.receiveDate).toLocaleDateString()}</p>
                    <p><strong>Оплата:</strong> {order.isCash ? "Готівка" : "Карта"}</p>
                    <p><strong>Сума до сплати:</strong> ${order.totalSum.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
}

export default UserOrder;
