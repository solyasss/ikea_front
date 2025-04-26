import React from "react";
import LoginForm from "../components/Login/Login";
import { Link } from "react-router-dom";

function Login() {
    return (
        <div className="container">
            <h2>Login Page</h2>
            <Link to="/" style={{ color: "#007bff", textDecoration: "underline" }}>
                Вернуться на главную
            </Link>
            <LoginForm />
        </div>
    );
}

export default Login;
