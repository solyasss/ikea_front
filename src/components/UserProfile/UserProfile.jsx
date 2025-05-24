import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./UserProfile.css";

function UserProfile({ Id }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [card, setCard] = useState(null);


    const [activeSection, setActiveSection] = useState("account");

    useEffect(() => {
        if (!Id) return;

        const fetchUser = async () => {
            try {
                const response = await fetch(`https://localhost:7290/api/users/${Id}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [Id]);

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const response = await fetch(`https://localhost:7290/api/user-cards/${Id}`);
                if (!response.ok) throw new Error("Card fetch error");
                const data = await response.json();
                setCard(data);
            } catch (err) {
                console.error("Card error:", err);
            }
        };

        fetchCard();
    }, []);

    if (loading) return <p>Завантаження...</p>;
    if (error) return <p>Помилка: {error}</p>;
    if (!user) return null;

    return (
        <>
            <h1>Профіль користувача</h1>
            <div className="user-prodile-settings">
                <ul>
                    <li
                        className={activeSection === "account" ? "active" : ""}
                        onClick={() => setActiveSection("account")}
                    >
                        <span className="underline-text">Обліковий запис</span>
                    </li>
                    <li
                        className={activeSection === "wallet" ? "active" : ""}
                        onClick={() => setActiveSection("wallet")}
                    >
                        <span className="underline-text">Гаманець</span>
                    </li>
                    <li
                        className={activeSection === "address" ? "active" : ""}
                        onClick={() => setActiveSection("address")}
                    >
                        <span className="underline-text">Адреса доставки</span>
                    </li>
                    <li
                        className={activeSection === "manage" ? "active" : ""}
                        onClick={() => setActiveSection("manage")}
                    >
                        <span className="underline-text">Управління</span>
                    </li>
                </ul>
            </div>

            {activeSection === "account" && (
                <div className="user-profile">
                    <h1>Обліковий запис</h1>
                    <div className="profile-field">
                        <strong>Ім'я</strong>
                        <div>{user.firstName}</div>
                    </div>
                    <div className="profile-field">
                        <strong>Прізвище</strong>
                        <div>{user.lastName}</div>
                    </div>
                    <div className="profile-field">
                        <strong>Дата народження</strong>
                        <div>{new Date(user.birthDate).toLocaleDateString()}</div>
                    </div>
                    <div className="profile-field">
                        <strong>Країна</strong>
                        <div>{user.country}</div>
                    </div>
                    <div className="profile-field">
                        <strong>Адреса</strong>
                        <div>{user.address}</div>
                    </div>
                    <div className="profile-field">
                        <strong>Телефон</strong>
                        <div>{user.phone}</div>
                    </div>
                    <div className="profile-field">
                        <strong>Email</strong>
                        <div>{user.email}</div>
                    </div>
                </div>
            )}

            {activeSection === "wallet" && (
                <div className="user-profile">
                    <h1>Гаманець</h1>
                    {card ? (
                        <>
                            <div className="profile-field"><strong>Тип карти:</strong><div>{card.cardType.toUpperCase()}</div></div>
                            <div className="profile-field"><strong>Номер карти:</strong><div>{card.cardNumber}</div></div>
                            <div className="profile-field"><strong>Дійсна до:</strong><div>{String(card.validDay).padStart(2, "0")}/{card.validYear}</div></div>
                        </>
                    ) : (
                        <p>Немає збереженої карти.</p>
                    )}
                </div>
            )}

            {activeSection === "address" && (
                <div>
                    <h1>Адреса доставки</h1>

                </div>
            )}

            {activeSection === "manage" && (
                <div>
                    <h1>Управління</h1>

                </div>
            )}

        </>
    );
}

export default UserProfile;
