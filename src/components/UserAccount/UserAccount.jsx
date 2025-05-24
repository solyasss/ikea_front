import { useState } from "react";
import "./UserAccount.css";

function UserAccount() {
    const [activeSection, setActiveSection] = useState("purchases");

    return (
        <section className="user-account">
            <nav className="user-menu custom-menu-bg">
                <ul className="user-menu-list">
                    <li onClick={() => setActiveSection("purchases")}>
                        <span className="underline-text">ВАШІ ПОКУПКИ</span>
                    </li>
                    <li onClick={() => setActiveSection("profile")}>
                        <span className="underline-text">ПРОФІЛЬ</span>
                    </li>
                    <li onClick={() => setActiveSection("wishlist")}>
                        <span className="underline-text">ВІШЛІСТ</span>
                    </li>
                    <li onClick={() => setActiveSection("basket")}>
                        <span className="underline-text">КОШИК</span>
                    </li>
                </ul>
            </nav>

            <main className="show-container">
                {activeSection === "purchases" && <div>FIRST BLOCK</div>}
                {activeSection === "profile" && <div>SECOND BLOCK</div>}
                {activeSection === "wishlist" && <div>WISHLIST BLOCK</div>}
                {activeSection === "basket" && <div>BASKET BLOCK</div>}
            </main>
        </section>
    );
}

export default UserAccount;
