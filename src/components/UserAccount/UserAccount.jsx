import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./UserAccount.css";
import UserProfile from "../UserProfile/UserProfile";
import UserOrder from "../UserOrder/UserOrder";

function UserAccount() {
    const [activeSection, setActiveSection] = useState("purchases");
    const { id } = useParams();

    return (
        <section className="user-account">
            <nav className="user-menu custom-menu-bg">
                <ul className="user-menu-list">
                    <li
                        className={activeSection === "purchases" ? "active" : ""}
                        onClick={() => setActiveSection("purchases")}
                    >
                        <span className="underline-text">ПОКУПКИ</span>
                    </li>
                    <li
                        className={activeSection === "profile" ? "active" : ""}
                        onClick={() => setActiveSection("profile")}
                    >
                        <span className="underline-text">ПРОФІЛЬ</span>
                    </li>
                    <li
                        className={activeSection === "wishlist" ? "active" : ""}
                        onClick={() => setActiveSection("wishlist")}
                    >
                        <span className="underline-text">ВІШЛІСТ</span>
                    </li>
                    <li
                        className={activeSection === "basket" ? "active" : ""}
                        onClick={() => setActiveSection("basket")}
                    >
                        <span className="underline-text">КОШИК</span>
                    </li>
                </ul>
            </nav>

            <main className="show-container">
                {activeSection === "purchases" &&
                    <UserOrder Id={id} />
                }
                {activeSection === "profile" &&
                    <UserProfile Id={id} />
                }
                {activeSection === "wishlist" && <div>WISHLIST BLOCK</div>}
                {activeSection === "basket" && <div>BASKET BLOCK</div>}
            </main>
        </section>
    );
}

export default UserAccount;
