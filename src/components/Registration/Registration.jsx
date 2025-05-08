import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Registration.css"//ready

function Registration() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [country, setCountry] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [agree, setAgree] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!agree) return
        const response = await fetch(
            "http://localhost:5123/api/users",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    IsAdmin: false,
                    FirstName: firstName,
                    LastName: lastName,
                    BirthDate: birthDate,
                    Country: country,
                    Address: address,
                    Phone: phone,
                    Email: email,
                    Password: password
                })
            }
        )
        if (response.ok) navigate("/login")
    }

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
                    <form style={{ maxWidth: "400px" }} onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="form-label fw-med">Ім'я</label>
                            <input
                                type="text"
                                className="form-control"
                                style={{ minHeight: "48px" }}
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label fw-med">Прізвище</label>
                            <input
                                type="text"
                                className="form-control"
                                style={{ minHeight: "48px" }}
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label fw-med">Дата народження</label>
                            <input
                                type="date"
                                className="form-control"
                                style={{ minHeight: "48px" }}
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label fw-med">Країна</label>
                            <input
                                type="text"
                                className="form-control"
                                style={{ minHeight: "48px" }}
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label fw-med">Адреса</label>
                            <input
                                type="text"
                                className="form-control"
                                style={{ minHeight: "48px" }}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label fw-med">Мобільний номер</label>
                            <input
                                type="text"
                                className="form-control mb-2"
                                style={{ minHeight: "48px" }}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
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
                                type="email"
                                className="form-control mb-2"
                                style={{ minHeight: "48px" }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <h6 className="text-muted mt-1 lt-grey">
                                <div className="fw-reg lt-grey">Вам потрібно буде пройти верифікацію</div>
                            </h6>
                        </div>
                        <div className="mb-4">
                            <label className="form-label fw-med">Пароль</label>
                            <input
                                type="password"
                                className="form-control"
                                style={{ minHeight: "48px" }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="row mb-4">
                            <div className="col-1 d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    className="cust-checkbox"
                                    checked={agree}
                                    onChange={(e) => setAgree(e.target.checked)}
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
    )
}

export default Registration
