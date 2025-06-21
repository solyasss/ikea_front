import { useState, useEffect } from "react";
import "./UserProfile.css";
import editIcon from "../../assets/img/user_account/edit_icon.svg";

function UserProfile({ Id }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [card, setCard] = useState(null);
    const [activeSection, setActiveSection] = useState("account");
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        birthDate: "",
        country: "",
        address: "",
        phone: "",
        email: ""
    });
    const [passwordData, setPasswordData] = useState({
        newPassword: "",
        confirmPassword: "",
    });
    // const [addressData, setaddressData] = useState({
        
    // });

    const [formError, setFormError] = useState(null);

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
                setFormData({
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    birthDate: data.birthDate ? new Date(data.birthDate).toISOString().split('T')[0] : "",
                    country: data.country || "",
                    address: data.address || "",
                    phone: data.phone || "",
                    email: data.email || "",
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [Id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);

        try {
            const response = await fetch(`https://localhost:7290/api/users/${Id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Failed to update user");
            }

            const result = await response.json();
            if (result) {
                setUser({
                    ...user,
                    ...formData,
                    birthDate: new Date(formData.birthDate)
                });
                setIsEditing(false);
            } else {
                throw new Error("User not found or update failed");
            }
        } catch (err) {
            setFormError(err.message);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormError(null);
        setFormData({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            birthDate: data.birthDate ? new Date(data.birthDate).toISOString().split('T')[0] : "",
            country: data.country || "",
            address: data.address || "",
            phone: data.phone || "",
            email: data.email || ""
        });
    };

    const handlePasswordInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("Паролі не співпадають");
            return;
        }

        try {
            const response = await fetch(`https://localhost:7290/api/users/${Id}/change-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password: passwordData.newPassword }),
            });

            if (response.ok) {
                alert("Пароль змінено успішно");
                setPasswordData({ newPassword: "", confirmPassword: "" });
            } else {
                const error = await response.text();
                alert("Помилка зміни пароля: " + error);
            }
        } catch (err) {
            console.error("Помилка зміни пароля", err);
            alert("Сервер недоступний або сталася інша помилка");
        }
    };

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm("Ви впевнені, що хочете видалити акаунт? Цю дію не можна скасувати.");
        if (!confirmed) return;

        try {
            const response = await fetch(`https://localhost:7290/api/users/${Id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Акаунт видалено");
                window.location.href = "/";
            } else {
                alert("Помилка при видаленні акаунта");
            }
        } catch (err) {
            console.error("Помилка при видаленні акаунта", err);
            alert("Сервер недоступний або сталася інша помилка");
        }
    };

    useEffect(() => {
        if (!Id) return;

        const fetchUserAndCard = async () => {
            try {
                const userRes = await fetch(`https://localhost:7290/api/users/${Id}`);
                if (!userRes.ok) throw new Error("Не вдалося завантажити користувача");

                const userData = await userRes.json();
                setUser(userData);

                setFormData({
                    firstName: userData.firstName || "",
                    lastName: userData.lastName || "",
                    birthDate: userData.birthDate ? new Date(userData.birthDate).toISOString().split("T")[0] : "",
                    country: userData.country || "",
                    address: userData.address || "",
                    phone: userData.phone || "",
                    email: userData.email || ""
                });

                // Запрос карты
                const cardRes = await fetch(`https://localhost:7290/api/user-cards/by-user/${Id}`);
                if (cardRes.ok) {
                    const cardData = await cardRes.json();
                    setCard(cardData);
                } else if (cardRes.status !== 404) {
                    // Если это не 404 (нет карты) — тогда показать ошибку
                    throw new Error("Помилка при завантаженні карти");
                }

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserAndCard();
    }, [Id]);


    const handleAddCard = async (e) => {
        e.preventDefault();
        const form = e.target;

        const newCard = {
            userId: Id,
            cardNumber: form.cardNumber.value,
            validDay: parseInt(form.validDay.value),
            validYear: parseInt(form.validYear.value),
            cardType: form.cardType.value.toLowerCase(),
            cvv: form.cvv.value
        };

        try {
            const response = await fetch("https://localhost:7290/api/user-cards", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCard)
            });

            if (!response.ok) {
                const errMsg = await response.text();
                throw new Error(errMsg);
            }

            const cardRes = await fetch(`https://localhost:7290/api/user-cards/by-user/${Id}`);
            const cardData = await cardRes.json();
            setCard(cardData);

            alert("Карту додано успішно!");
        } catch (err) {
            alert("Помилка додавання карти: " + err.message);
        }
    };

    const handleDeleteCard = async () => {
        if (!card || !card.id) return;

        const confirmed = window.confirm("Ви впевнені, що хочете видалити карту?");
        if (!confirmed) return;

        try {
            const response = await fetch(`https://localhost:7290/api/user-cards/${card.id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                alert("Карту видалено");
                setCard(null);
            } else {
                alert("Помилка при видаленні карти");
            }
        } catch (err) {
            alert("Сервер недоступний або сталася інша помилка");
        }
    };

    // const EditAddress =  async ()  => {
    //     if () 
    // }


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
                    {!isEditing ? (
                        <>
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
                            <button onClick={() => setIsEditing(true)}>
                                <img src={editIcon} alt="edit icon" width={30} />
                            </button>
                        </>
                    ) : (
                        <div className="edit-form">
                            {formError && <p className="error">{formError}</p>}
                            <form onSubmit={handleSubmit}>
                                <div className="form-field">
                                    <label>Ім'я</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-field">
                                    <label>Прізвище</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-field">
                                    <label>Дата народження</label>
                                    <input
                                        type="date"
                                        name="birthDate"
                                        value={formData.birthDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-field">
                                    <label>Країна</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-field">
                                    <label>Адреса</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-field">
                                    <label>Телефон</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-field">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-actions">
                                    <button type="submit">Зберегти</button>
                                    <button type="button" onClick={handleCancel}>Скасувати</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            )}

            {activeSection === "wallet" && (
                <div className="user-profile">
                    <h1>Гаманець</h1>
                    {card ? (
                        <>
                            <div className="profile-field"><strong>Тип карти:</strong> <div>{card.cardType.toUpperCase()}</div></div>
                            <div className="profile-field"><strong>Номер карти:</strong> <div>{card.cardNumber}</div></div>
                            <div className="profile-field"><strong>Дійсна до:</strong> <div>{String(card.validDay).padStart(2, "0")}/{card.validYear}</div></div>
                            <button onClick={handleDeleteCard} className="btn-delete">Видалити карту</button>
                        </>
                    ) : (
                        <>
                            <p>Немає збереженої карти.</p>
                            <form onSubmit={handleAddCard} className="profile-form">
                                <div className="form-field">
                                    <label htmlFor="cardNumber">Номер карти</label>
                                    <input className="input" name="cardNumber" placeholder="Номер карти" required />
                                </div>

                                <div className="form-field">
                                    <label htmlFor="validDay">Місяць</label>
                                    <input className="input" name="validDay" type="number" min="1" max="12" placeholder="Місяць" required />
                                </div>

                                <div className="form-field">
                                    <label htmlFor="validYear">Рік</label>
                                    <input className="input" name="validYear" type="number" min="2024" placeholder="Рік" required />
                                </div>

                                <div className="form-field">
                                    <label htmlFor="cardType">Тип карти</label>
                                    <select className="input" name="cardType" required>
                                        <option value="">Виберіть тип</option>
                                        <option value="visa">Visa</option>
                                        <option value="mastercard">MasterCard</option>
                                    </select>
                                </div>

                                <div className="form-field">
                                    <label htmlFor="cvv">CVV</label>
                                    <input className="input" name="cvv" type="password" placeholder="CVV" required />
                                </div>

                                <div className="form-actions">
                                    <button type="submit" className="primary-button">Додати карту</button>
                                </div>
                            </form>

                        </>
                    )}
                </div>
            )}

            {activeSection === "address" && (
                <div className="user-profile">
                    <h1>Адреса доставки</h1>
                    <div className="profile-field">
                        <strong>Країна</strong>
                        <div>{user.country || "Не указано"}</div>
                    </div>
                    <div className="profile-field">
                        <strong>Адреса</strong>
                        <div>{user.address || "Не указано"}</div>
                    </div>
                    <div className="profile-actions">
                        {/* {!user.address ? (
                            <button onClick={() => handleAddAddress()}>Добавить</button>
                        ) : (
                            <button onClick={() => handleDeleteAddress()}>Удалить</button>
                        )} */}
                        <button type="submit"> <img src={editIcon} alt="edit icon" width={30} /></button>
                    </div>
                </div>
            )}

            {activeSection === "manage" && (
                <div className="user-profile">
                    <h1 className="section-title">Управління</h1>

                    <form onSubmit={handlePasswordChange} className="profile-form">
                        <div className="profile-field">
                            <label className="field-label">Новий пароль</label>
                            <input
                                type="password"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordInputChange}
                                className="input"
                                required
                            />
                        </div>
                        <div className="profile-field">
                            <label className="field-label">Підтвердження пароля</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordInputChange}
                                className="input"
                                required
                            />
                        </div>
                        <div className="user-control-box">
                            <button type="submit" className="primary-button">Змінити пароль</button>
                            <button onClick={handleDeleteAccount} className="danger-button">
                                Видалити акаунт
                            </button>
                        </div>

                    </form>


                </div>
            )}


        </>
    );
}

export default UserProfile;