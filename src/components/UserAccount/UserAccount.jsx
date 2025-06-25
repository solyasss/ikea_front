import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // добавили useNavigate
import "./UserAccount.css";
import UserProfile from "../UserProfile/UserProfile";
import UserOrder from "../UserOrder/UserOrder";
import Headers from "../Header/Header";
import Footer from "../Footer/Footer";

function UserAccount() {
    const [activeSection, setActiveSection] = useState("purchases");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

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

    const handleLogout = async () => {
        await fetch("https://localhost:7290/api/auth/logout", {
            method: "POST",
            credentials: "include"
        });
        navigate("/login");
    };

    if (!user) return <div>Загрузка...</div>;

    return (
        <>
            <section className="user-account">
                <button className="logout-button" onClick={handleLogout}>Вийти</button>

                <main className="show-container">
                    <UserProfile Id={user.userId} />
                </main>
            </section>
        </>
    );
}

export default UserAccount;
