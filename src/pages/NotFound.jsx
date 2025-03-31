import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div style={{ textAlign: "center", padding: "2rem" }}>
            <h1>404 - Page Not Found</h1>
            <p>Такой страницы не существует.</p>
            <Link to="/" style={{ color: "#007bff", textDecoration: "underline" }}>
                Вернуться на главную
            </Link>
        </div>
    );
}

export default NotFound;
