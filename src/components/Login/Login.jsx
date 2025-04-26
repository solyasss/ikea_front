import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

export default function Login() {
    const [showPwd, setShowPwd] = useState(false);

    return (
        <div className="container-fluid px-0 login-page">
            <div className="row gx-0 h-100 align-items-center">
                {/* Левая панель */}
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
                        ЗАПОВНІТЬ&nbsp;ВХІД&nbsp;ДО<br />
                        ОБЛІКОВОГО&nbsp;ЗАПИСУ
                    </h1>
                </div>

                <div className="col-12 col-lg-7 d-flex justify-content-center align-items-center">
                    <form className="login-form">
                        <div className="mb-3">
                            <label htmlFor="login" className="form-label fw-med">
                                Електронна пошта або мобільний номер
                            </label>
                            <input
                                id="login"
                                type="text"
                                className="form-control login-input"
                                placeholder=""
                            />
                            <p className="info-text lt-grey mt-2">
                                By entering your mobile number and one-time code sign-in option,
                                you agree to receive a one-time verification code via SMS from
                                IKEA. Message and data rates may apply.
                            </p>
                            <Link className="info-text mt-0">
                                More info about Privacy Policy
                            </Link>
                        </div>

                        <div className="mb-3 position-relative pwd-group">
                            <label htmlFor="pwd" className="form-label fw-med">
                                Пароль
                            </label>
                            <input
                                id="pwd"
                                type={showPwd ? "text" : "password"}
                                className="form-control login-input pe-5"
                            />
                            <img
                                src="/src/assets/img/login/eye.png"
                                alt="toggle password"
                                className="pwd-icon"
                                onClick={() => setShowPwd((v) => !v)}
                            />

                            <Link className="d-block forgot-link fw-med mt-2 ">
                                Забули свій пароль?
                            </Link>
                        </div>

                        <div className="form-check mb-4 d-flex align-items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                className="form-check-input cust-checkbox"
                            />
                            <label
                                htmlFor="remember"
                                className="form-check-label info-text lt-grey mt-2 ms-3 mb-0"
                            >
                                Зберегти інформацію
                            </label>
                            <img
                                src="/src/assets/img/login/import.png"
                                alt="info"
                                className="info-icon ms-auto"
                            />
                        </div>

                        <button type="submit" className="btn btn-dark w-100 mb-5">
                            ПРОДОВЖИТИ
                        </button>

                        <p className="register-text fw-bold mb-2">
                            У вас ще немає облікового запису? Створіть його:
                        </p>
                        <Link to="/registration" className="btn btn-outline w-100">
                            СТВОРИТИ АККАУНТ
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
