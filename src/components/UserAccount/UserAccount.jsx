import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./UserAccount.css";
import UserProfile from "../UserProfile/UserProfile";
import UserOrder from "../UserOrder/UserOrder";

function UserAccount() {
    const [activeSection, setActiveSection] = useState("purchases");
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("https://localhost:7290/api/auth/me", { credentials: "include" })
            .then(res => {
                if (res.status === 401) throw new Error("Not authorized");
                return res.json();
            })
            .then(data => setUser(data))
            .catch(() => {
                window.location.href = "/login";
            });
    }, []);

    if (!user) return <div>Загрузка...</div>;

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
                    <UserOrder Id={user.userId} />
                }
                {activeSection === "profile" &&
                    <UserProfile Id={user.userId} />
                }
                {activeSection === "wishlist" && <div>WISHLIST BLOCK</div>}
                {activeSection === "basket" && <div>BASKET BLOCK</div>}
            </main>
        </section>
    );
}

export default UserAccount;
