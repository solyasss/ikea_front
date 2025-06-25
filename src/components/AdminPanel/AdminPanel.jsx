import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ManageСategories from "../ManageСategories/ManageСategories";
import ManageUsers from "../ManageUsers/ManageUsers";
import ManageProducts from "../ManageProducts/ManageProducts";
import ManageCharacteristics from "../ManageProductCharacteristic/ManageProductCharacteristic";
import ManageProductImages from "../ManageProductImages/ManageProductImages";
import "./AdminPanel.css";

function AdminPanel() {
    const [activeSection, setActiveSection] = useState("categories");
    const navigate = useNavigate();

    const handleLogout = async () => {
        await fetch("https://localhost:7290/api/auth/logout", {
            method: "POST",
            credentials: "include"
        });
        navigate("/");
    };

    return (
        <section className="main-admin-panel">
            <nav className="admin-menu admin-custom-menu-bg">
                <div className="admin-menu-wrapper">
                    <ul className="admin-menu-list">
                        <li onClick={() => setActiveSection("categories")}>
                            <span className={`underline-text ${activeSection === "categories" ? "active" : ""}`}>Категорії</span>
                        </li>
                        <li onClick={() => setActiveSection("user")}>
                            <span className={`underline-text ${activeSection === "user" ? "active" : ""}`}>Користувачі</span>
                        </li>
                        <li onClick={() => setActiveSection("products")}>
                            <span className={`underline-text ${activeSection === "products" ? "active" : ""}`}>Товари</span>
                        </li>
                        <li onClick={() => setActiveSection("characteristic")}>
                            <span className={`underline-text ${activeSection === "characteristic" ? "active" : ""}`}>Характеристики</span>
                        </li>
                        <li onClick={() => setActiveSection("image")}>
                            <span className={`underline-text ${activeSection === "image" ? "active" : ""}`}>Зображення товару</span>
                        </li>
                    </ul>

                    <button className="admin-logout-btn" onClick={handleLogout}>Вийти з акаунту</button>
                </div>
            </nav>

            <main className="admin-show-container">
                {activeSection === "categories" && <ManageСategories />}
                {activeSection === "user" && <ManageUsers />}
                {activeSection === "products" && <ManageProducts />}
                {activeSection === "characteristic" && <ManageCharacteristics />}
                {activeSection === "image" && <ManageProductImages />}
            </main>
        </section>
    );
}

export default AdminPanel;
