import React, { useState } from "react";
import "./AdminPanel.css";

function AdminPanel() {
    const [activeSection, setActiveSection] = useState("categories");

    return (
        <div className="main-admin-panel">
            <div className="sidebar">
                <button onClick={() => setActiveSection("categories")}>
                    Категории
                </button>
                <button onClick={() => setActiveSection("users")}>
                    Пользователи
                </button>
            </div>
            <div className="main-panel-content">
                {activeSection === "categories" && (
                    <div>
                        <h2>Категории</h2>
                        <p>Здесь отображаются категории товаров.</p>
                    </div>
                )}
                {activeSection === "users" && (
                    <div>
                        <h2>Пользователи</h2>
                        <p>Здесь отображаются данные пользователей.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminPanel;
