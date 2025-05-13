import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

export default function Login() {
    const [showPwd, setShowPwd] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    const emailOrPhoneRegex = /^([^\s@]+@[^\s@]+\.[^\s@]+|380\d{9})$/;
    const pwRegex = /^(?=.*[A-Za-z]).{8,30}$/;

    const validateForm = () => {
        if (!login.trim() || !password.trim() || !remember) {
            return "All fields must be filled and the checkbox must be ticked";
        }
        if (!emailOrPhoneRegex.test(login)) {
            return "Login must be a valid email";
        }
        if (!pwRegex.test(password)) {
            return "Password must be 8‑30 characters and contain at least one letter";
        }
        return "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const error = validateForm();
        if (error) {
            window.toastError?.(error);
            return;
        }


        console.log("✅ Login successful:", { login, password, remember });
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
                                Email
                            </label>
                            <input
                                id="login"
                                type="text"
                                className="form-control login-input"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                placeholder="you@example.com"
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
