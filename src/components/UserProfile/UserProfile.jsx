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
                    {user.card && user.card.length > 0 ? (
                        <>
                            <div className="profile-field"><strong>Тип карти:</strong><div>{user.card[0].cardType.toUpperCase()}</div></div>
                            <div className="profile-field"><strong>Номер карти:</strong><div>{user.card[0].cardNumber}</div></div>
                            <div className="profile-field"><strong>Дійсна до:</strong><div>{String(user.card[0].validDay).padStart(2, "0")}/{user.card[0].validYear}</div></div>
                        </>
                    ) : (
                        <p>Немає збереженої карти.</p>
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