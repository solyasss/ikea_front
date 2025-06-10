import React, { useEffect, useState } from "react";
import "./UserOrder.css";

function UserOrder({ Id }) {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

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

    if (loading) return <p className="order-message">Завантаження...</p>;
    if (error) return <p className="order-message error-text">Помилка: {error}</p>;
    if (!order) return <p className="order-message">Замовлення не знайдено</p>;

    return (
        <>
            <div className="order-card">
                <img src={order.productImage} alt={order.productName} className="order-image-center" />
                <h3 className="order-title-small">{order.productName}</h3>
                <p className="order-price">${order.productPrice.toFixed(2)}</p>
                <button className="order-detail-btn" onClick={() => setShowModal(true)}>Детально</button>
            </div>

            {showModal && (
                <div className="order-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="order-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal-btn" onClick={() => setShowModal(false)}>×</button>
                        <h2 className="order-title">Деталі замовлення #{order.orderNumber}</h2>
                        <img src={order.productImage} alt={order.productName} className="order-modal-image" />
                        <div className="order-info">
                            <p><strong>Товар:</strong> {order.productName}</p>
                            <p><strong>Ціна:</strong> ${order.productPrice.toFixed(2)}</p>
                            <p><strong>Коментар:</strong> {order.commentText}</p>
                            <p><strong>Оцінка:</strong> {order.commentRating} / 5</p>
                            <p><strong>Дата замовлення:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                            <p><strong>Дата отримання:</strong> {new Date(order.receiveDate).toLocaleDateString()}</p>
                            <p><strong>Оплата:</strong> {order.isCash ? "Готівка" : "Карта"}</p>
                            <p className="total"><strong>Сума до сплати:</strong> ${order.totalSum.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserOrder;
