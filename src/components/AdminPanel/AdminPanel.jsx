import React, { useState } from "react";
import ManageСategories from "../ManageСategories/ManageСategories";
import ManageUsers from "../ManageUsers/ManageUsers";
import ManageProducts from "../ManageProducts/ManageProducts";
import "./AdminPanel.css";

function AdminPanel() {
    const [activeSection, setActiveSection] = useState("categories");

    return (
        <section className="main-admin-panel">
            <nav className="admin-menu admin-custom-menu-bg">
                <ul className="admin-menu-list">
                    <li
                        className={activeSection === "purchases" ? "active" : ""}
                        onClick={() => setActiveSection("categories")}
                    >
                        <span className="underline-text">Категории</span>
                    </li>
                    <li
                        className={activeSection === "profile" ? "active" : ""}
                        onClick={() => setActiveSection("user")}
                    >
                        <span className="underline-text">Пользователи</span>
                    </li>
                    <li
                        className={activeSection === "profile" ? "active" : ""}
                        onClick={() => setActiveSection("products")}
                    >
                        <span className="underline-text">Продукты</span>
                    </li>

                </ul>
            </nav>
            <main className="admin-show-container">
                {activeSection === "categories" && (
                    <div>
                        <ManageСategories />
                    </div>
                )}
                {activeSection === "user" && (
                    <div>
                        <ManageUsers />
                    </div>
                )}
                {activeSection === "products" && (
                    <div>
                        <ManageProducts /> 
                    </div>
                )}
                {/* test */}
            </main>
        </section>
    );
}

export default AdminPanel;
