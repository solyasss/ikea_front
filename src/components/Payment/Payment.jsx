import React, { useEffect, useState } from "react";
import "./Payment.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Payment() {
    const [userId, setUserId] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [userData, setUserData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
        fetchCart();
    }, []);

    const fetchUser = async () => {
        const res = await axios.get("https://localhost:7290/api/auth/me", { withCredentials: true });
        setUserId(res.data.userId);

        const userRes = await axios.get(`https://localhost:7290/api/users/${res.data.userId}`);
        setUserData(userRes.data);

        if (userRes.data.address) setAddress(userRes.data.address);
        if (userRes.data.cardNumber) setCardNumber(userRes.data.cardNumber);
    };

    const fetchCart = async () => {
        const res = await axios.get("https://localhost:7290/api/carts", { withCredentials: true });
        setCartItems(res.data);
        const totalSum = res.data.reduce((acc, item) => acc + item.totalSum, 0);
        setTotal(totalSum);
    };

    const handleOrder = async () => {
        if (!address || !cardNumber) {
            alert("Заповніть всі обов'язкові поля.");
            return;
        }

        const orderPromises = cartItems.map(item =>
            axios.post("https://localhost:7290/api/orders", {
                orderNumber: `ORD-${Date.now()}`,
                userId: userId,
                productId: item.productId,
                orderDate: new Date(),
                receiveDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
                isCash: false, // Только карта
                totalSum: item.totalSum
            }, { withCredentials: true })
        );

        await Promise.all(orderPromises);
        await axios.post("https://localhost:7290/api/carts/clear", {}, { withCredentials: true });
        alert("Замовлення успішно оформлено!");
        navigate("/");
    };

    return (
        <div className="checkout-container">
            <div className="checkout-content">
                <div className="checkout-form">
                    <h2 className="checkout-title">Оформлення замовлення</h2>

                    <label>
                        Адреса доставки:
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Введіть адресу"
                        />
                    </label>

                    <label>
                        Номер картки:
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="Введіть номер картки"
                        />
                    </label>
                </div>

                <div className="checkout-summary">
                    <div className="checkout-sum-details">
                        <h3>Сума замовлення:</h3>
                        <div>{total} ₴</div>
                    </div>

                    <div className="checkout-pay-btn" onClick={handleOrder}>
                        <div>Сплатити</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;