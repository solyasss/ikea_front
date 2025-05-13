import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Registration.css"

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

    const nameRegex    = /^[A-Za-zА-Яа-яЁёІіЇїҐґ’' -]+$/
    const countryRegex = /^[A-Za-zА-Яа-яЁёІіЇїҐґ’' -]+$/
    const addressRegex = /^[A-Za-zА-Яа-яЁёІіЇїҐґ’' -]+$/
    const uaPhoneRegex = /^380\d{9}$/
    const pwRegex      = /^(?=.*[A-Za-z]).{8,30}$/
    const maxBirth     = "2023-12-31"

    const handlePhoneChange = (e) => {
        const onlyDigits = e.target.value.replace(/\D/g, "")
        setPhone(onlyDigits)
    }

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
            return "All fields must be filled and the checkbox must be ticked"
        }

        if (!firstName.match(nameRegex))       return "First name must contain letters only"
        if (!lastName.match(nameRegex))        return "Last name must contain letters only"
        if (birthDate > maxBirth)              return "Birth date must be before 2024"
        if (!country.match(countryRegex))      return "Country must contain letters only"
        if (!address.match(addressRegex))      return "Address must contain letters only"
        if (!uaPhoneRegex.test(phone))         return "Phone must be a valid number: 380XXXXXXXXX"
        if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/))
            return "Email must be a valid format"
        if (!pwRegex.test(password))           return "Password must be 8‑30 characters and contain at least one letter"

        return ""
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const error = validateForm()
        if (error) {
            window.toastError?.(error)
            return
        }

        const response = await fetch("http://localhost:5123/api/users", {
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
        })
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
                    <form style={{ maxWidth: "400px" }} onSubmit={handleSubmit} noValidate>
                        <div className="mb-4">
                            <label className="form-label fw-med">Ім'я</label>
                            <input
                                required
                                type="text"
                                className="form-control"
                                style={{ minHeight: "48px" }}
                                value={firstName}
                                pattern={nameRegex.source}
                                onChange={(e) => setFirstName(e.target.value)}
                                title="Letters only"
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
                                pattern={nameRegex.source}
                                onChange={(e) => setLastName(e.target.value)}
                                title="Letters only"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-med">Дата народження</label>
                            <input
                                required
                                type="date"
                                className="form-control"
                                style={{ minHeight: "48px" }}
                                max={maxBirth}
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                title="Date must be before 2024"
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
                                pattern={countryRegex.source}
                                onChange={(e) => setCountry(e.target.value)}
                                title="Letters only"
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
                                pattern={addressRegex.source}
                                onChange={(e) => setAddress(e.target.value)}
                                title="Address must contain letters only"
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
                                pattern={uaPhoneRegex.source}
                                placeholder="380XXXXXXXXX"
                                onChange={handlePhoneChange}
                                title="Ukrainian phone: 380XXXXXXXXX"
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
                                pattern={pwRegex.source}
                                onChange={(e) => setPassword(e.target.value)}
                                title="8‑30 characters, at least one letter"
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
    )
}

export default Registration
