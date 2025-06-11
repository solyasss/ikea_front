import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.css";

function Registration() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agree, setAgree] = useState(false);

    const navigate = useNavigate();

    const nameRegex = /^[A-Za-z\u0400-\u04FF]+$/;
    const countryRegex = /^[A-Za-z\u0400-\u04FF\s]+$/;
    const phoneRegex = /^\+\d{9,15}$/;
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    const addressMaxLength = 100;
    const maxLength50 = 50;
    const today = new Date().toISOString().split('T')[0];

    const validateForm = () => {
        if (
            !firstName.trim() ||
            !lastName.trim() ||
            !birthDate ||
            !country.trim() ||
            !address.trim() ||
            !phone.trim() ||
            !email.trim() ||
            !password ||
            !agree
        ) {
            return "All fields must be filled and the checkbox must be ticked";
        }

        if (firstName.length > maxLength50) return "First name cannot exceed 50 characters.";
        if (!firstName.match(nameRegex)) return "First name must contain only letters (Latin or Cyrillic).";

        if (lastName.length > maxLength50) return "Last name cannot exceed 50 characters.";
        if (!lastName.match(nameRegex)) return "Last name must contain only letters (Latin or Cyrillic).";

        if (!birthDate || birthDate >= today) return "Birth date must be in the past.";

        if (country.length > maxLength50) return "Country cannot exceed 50 characters.";
        if (!country.match(countryRegex)) return "Country must contain only letters and spaces (Latin or Cyrillic).";

        if (address.length > addressMaxLength) return "Address cannot exceed 100 characters.";

        if (!phone.match(phoneRegex)) return "Phone number must start with + and contain 9 to 15 digits.";

        if (!email.match(emailRegex)) return "Email must be a valid format.";

        if (password.length < 6) return "Password must be at least 6 characters.";

        return "";
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const error = validateForm();
        if (error) {
            window.toastError?.(error);
            return;
        }

        try {
            const response = await fetch("https://localhost:7290/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", 
                body: JSON.stringify({
                    IsAdmin: false,
                    FirstName: firstName,
                    LastName: lastName,
                    BirthDate: birthDate,
                    Country: country,
                    Address: address,
                    Phone: phone,
                    Email: email,
                    Password: password,
                }),
            });

            console.log("Status:", response.status);

            if (response.ok) {
                navigate("/login");
            } else {
                const data = await response.json();
                window.toastError?.(data.message || "Registration failed.");
            }
        } catch (err) {
            window.toastError?.("An error occurred during registration.");
        }
    };

    return (
        <div className="container-fluid registration-container">
            <div className="row">
                <div className="col-4 p-0">
                    <img
                        src="/src/assets/img/reg-bg.png"
                        alt="reg-bg"
                        className="registration-img"
                        style={{ maxHeight: "300vh" }}
                    />
                </div>

                <div className="col-8 d-flex justify-content-center align-items-center">
                    <form style={{ maxWidth: "400px" }} onSubmit={handleSubmit} noValidate>
                        <div className="mb-4">
                            <label className="form-label fw-med">Ім'я</label>
                            <input
                                required
                                type="text"
                                className="form-control"
                                style={{ minHeight: "48px" }}
                                value={firstName}
                                pattern="[A-Za-z\u0400-\u04FF]+"
                                onChange={(e) => setFirstName(e.target.value)}
                                title="Letters only (Latin or Cyrillic)"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-med">Прізвище</label>
                            <input
                                required
                                type="text"
                                className="form-control"
                                style={{ minHeight: "48px" }}
                                value={lastName}
                                pattern="[A-Za-z\u0400-\u04FF]+"
                                onChange={(e) => setLastName(e.target.value)}
                                title="Letters only (Latin or Cyrillic)"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-med">Дата народження</label>
                            <input
                                required
                                type="date"
                                className="form-control"
                                style={{ minHeight: "48px" }}
                                max={today}
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                title="Date must be in the past"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-med">Країна</label>
                            <input
                                required
                                type="text"
                                className="form-control"
                                style={{ minHeight: "48px" }}
                                value={country}
                                pattern="[A-Za-z\u0400-\u04FF\s]+"
                                onChange={(e) => setCountry(e.target.value)}
                                title="Letters and spaces only (Latin or Cyrillic)"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-med">Адреса</label>
                            <input
                                required
                                type="text"
                                className="form-control"
                                style={{ minHeight: "48px" }}
                                value={address}
                                maxLength={addressMaxLength}
                                onChange={(e) => setAddress(e.target.value)}
                                title="Max 100 characters"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-med">Мобільний номер</label>
                            <input
                                required
                                type="tel"
                                className="form-control mb-2"
                                style={{ minHeight: "48px" }}
                                value={phone}
                                pattern="\+\d{9,15}"
                                placeholder="+380XXXXXXXXX"
                                onChange={handlePhoneChange}
                                title="Phone number must start with + and contain 9 to 15 digits."
                            />
                            <h6>
                                <div className="fw-reg lt-grey">
                                    By entering your mobile number and one-time code sign-in option, you agree to receive a one-time verification code via SMS from IKEA. Message and data rates may apply.
                                </div>
                            </h6>
                            <a>
                                <h6>
                                    <div className="fw-reg lt-grey text-decoration-underline">
                                        More info about Privacy Policy
                                    </div>
                                </h6>
                            </a>
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-med">Електронна пошта</label>
                            <input
                                required
                                type="email"
                                className="form-control mb-2"
                                style={{ minHeight: "48px" }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                title="Must be a valid email address"
                            />
                            <h6 className="text-muted mt-1 lt-grey">
                                <div className="fw-reg lt-grey">Вам потрібно буде пройти верифікацію</div>
                            </h6>
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-med">Пароль</label>
                            <input
                                required
                                type="password"
                                className="form-control"
                                style={{ minHeight: "48px" }}
                                value={password}
                                minLength="6"
                                onChange={(e) => setPassword(e.target.value)}
                                title="At least 6 characters"
                            />
                        </div>

                        <div className="row mb-4">
                            <div className="col-1 d-flex align-items-center">
                                <input
                                    required
                                    type="checkbox"
                                    className="cust-checkbox"
                                    checked={agree}
                                    onChange={(e) => setAgree(e.target.checked)}
                                    title="You must agree before submitting"
                                />
                            </div>
                            <div className="col-11">
                                <h5>
                                    <div className="fw-reg lt-grey">
                                        Я ознайомлений з Політикою конфіденційності і даю згоду на обробку та захист персональних даних
                                    </div>
                                </h5>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-dark registration-button w-100">
                            ПРОДОВЖИТИ
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Registration;
