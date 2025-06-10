import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
    const [showPwd, setShowPwd] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    const navigate = useNavigate();

    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    const phoneRegex = /^\+\d{9,15}$/;

    const validateForm = () => {
        if (!login.trim() || !password.trim() || !remember) {
            return "All fields must be filled and the checkbox must be ticked";
        }

        const isEmail = emailRegex.test(login);
        const isPhone = phoneRegex.test(login);

        if (!isEmail && !isPhone) {
            return "Login must be a valid email or phone number";
        }

        if (password.length < 6) {
            return "Password must be at least 6 characters.";
        }

        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validateForm();
        if (error) {
            window.toastError?.(error);
            return;
        }

        try {
            const response = await fetch("https://localhost:7290/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", 
                body: JSON.stringify({
                    email: login,
                    password: password,
                }),
            });

            if (response.ok) {
                window.toastSuccess?.("Вход выполнен успешно");
                navigate("/");
            } else {
                const result = await response.json();
                window.toastError?.(result.message || "Ошибка входа");
            }
        } catch (err) {
            console.error(err);
            window.toastError?.("Ошибка соединения с сервером");
        }
    };


    return (
        <div className="container-fluid px-0 login-page">
            <div className="row gx-0 h-100 align-items-center">
                <div className="col-12 col-lg-5 position-relative login-left p-0">
                    <img
                        src="/src/assets/img/login/chair.png"
                        alt="bg"
                        className="w-100 h-100 login-bg"
                    />
                    <Link to="/" className="back-btn">
                        <img
                            src="/src/assets/img/login/icon.png"
                            alt="back"
                            className="back-icon"
                        />
                    </Link>
                    <h1 className="login-heading fw-med">
                        ЗАПОВНІТЬ ВХІД ДО<br />
                        ОБЛІКОВОГО ЗАПИСУ
                    </h1>
                </div>

                <div className="col-12 col-lg-7 d-flex justify-content-center align-items-center">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="login" className="form-label fw-med">
                                Email or Phone
                            </label>
                            <input
                                id="login"
                                type="text"
                                className="form-control login-input"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                placeholder="you@example.com or +380XXXXXXXXX"
                            />
                            <p className="info-text lt-grey mt-2">
                                By entering your mobile number and one-time code sign-in option,
                                you agree to receive a one-time verification code via SMS from IKEA.
                                Message and data rates may apply.
                            </p>
                            <Link className="info-text mt-0">
                                More info about Privacy Policy
                            </Link>
                        </div>

                        <div className="mb-3 position-relative pwd-group">
                            <label htmlFor="pwd" className="form-label fw-med">
                                Password
                            </label>
                            <input
                                id="pwd"
                                type={showPwd ? "text" : "password"}
                                className="form-control login-input pe-5"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <img
                                src="/src/assets/img/login/eye.png"
                                alt="toggle password"
                                className="pwd-icon"
                                onClick={() => setShowPwd((v) => !v)}
                            />
                            <Link className="d-block forgot-link fw-med mt-2">
                                Forgot your password?
                            </Link>
                        </div>

                        <div className="form-check mb-4 d-flex align-items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                className="form-check-input cust-checkbox"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                            />
                            <label
                                htmlFor="remember"
                                className="form-check-label info-text lt-grey mt-2 ms-3 mb-0"
                            >
                                Remember my login information
                            </label>
                            <img
                                src="/src/assets/img/login/import.png"
                                alt="info"
                                className="info-icon ms-auto"
                            />
                        </div>

                        <button type="submit" className="btn btn-dark w-100 mb-5">
                            CONTINUE
                        </button>

                        <p className="register-text fw-bold mb-2">
                            Don’t have an account yet? Create one:
                        </p>
                        <Link to="/registration" className="btn btn-outline w-100">
                            CREATE ACCOUNT
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
