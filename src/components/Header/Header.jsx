import "./Header.css";
import burgerIcon from '../../assets/img/header/burger copy.svg';
import UnionIcon from "../../assets/img/icons_svg/BuyNow.svg";
import GeoIcon from "../../assets/img/header/Vector.svg";
import UserIcon from "../../assets/img/header/uil_user1.svg";
import BuyIcon from "../../assets/img/header/BuyIcon.svg";
import likeIkon from "../../assets/img/header/Component 1.svg";
import Search from "../Search/Search";
import RunningLine from "../RunningLine/RunningLine";
import BurgerMenu from "../Menu/Menu";
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";


export default function Headers() {

    const [menuActive, setMenuActive] = useState(false);
    const [user, setUser] = useState(null);
    const [city, setCity] = useState("Київ");

    const items = [
        { value: "ГОЛОВНА", href: "/" },
        { value: "ТОВАРИ", href: "/products" },
        { value: "КІМНАТИ", href: "/room" },
        { value: "ІДЕЇ", href: "/idea" },
        { value: "ДИЗАЙН", href: "/design" }
    ];

    useEffect(() => {
        fetch("https://localhost:7290/api/auth/me", { credentials: "include" })
            .then(res => {
                if (res.ok) return res.json();
                throw new Error("Not authenticated");
            })
            .then(data => setUser(data))
            .catch(() => setUser(null));
    }, []);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    try {
                        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
                        const data = await res.json();

                        if (data.address && data.address.city) {
                            setCity(data.address.city);
                        } else if (data.address && data.address.town) {
                            setCity(data.address.town);
                        } else if (data.address && data.address.village) {
                            setCity(data.address.village);
                        }
                    } catch (error) {
                        console.error("Ошибка при определении города:", error);
                    }
                },
                (error) => {
                    console.warn("Геолокация отклонена или недоступна:", error);
                }
            );
        } else {
            console.warn("Геолокация не поддерживается");
        }
    }, []);

    return (
        <>
            <RunningLine />
            <header className="hedaer__container">
                <div className="left__menu">
                    <div className="burger_container">
                        <nav className="parrent__block">
                            <div className="burger-btn" onClick={() => setMenuActive(!menuActive)}>
                                <span />
                            </div>
                        </nav>
                        <BurgerMenu active={menuActive} setActive={setMenuActive} header={"БУРГЕР МЕНЮ"} items={items} />
                    </div>

                    <div>
                        <img src={UnionIcon} className="logo" width={112} height={36} alt="Лого" />
                    </div>

                    <nav className="header_menu">
                        <ul className="menu__list">
                            <li className="menu__item">
                                <Link to="/products" className="menu__link">Товари</Link>
                            </li>
                            <li className="menu__item">
                                <Link to="/room" className="menu__link">Кімнати</Link>
                            </li>
                            <li className="menu__item">
                                <Link to="/design" className="menu__link">Дизайн</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <nav className="header_menu">
                    <ul className="menu__list">
                        <li className="menu__item right__menu">
                            <img src={GeoIcon} alt="Гео" />
                            <Link to="/city" className="menu__link">{city}</Link>
                        </li>
                        <li className="menu__item right__menu">
                            <img src={UserIcon} alt="Гео" />
                            {user ? (
                                <Link to={`/account/${user.userId}`} className="menu__link">
                                    {user.userName}
                                </Link>
                            ) : (
                                <Link to="/login" className="menu__link">Привіт! Увійдіть в Систему</Link>
                            )}
                        </li>
                        <li className="menu__item right__menu__icons">
                            <Link to="/basket">
                                <img src={BuyIcon} alt="Купити" />
                            </Link>
                            <Link to="/favorites">
                                <img src={likeIkon} alt="Вподобання" />
                            </Link>
                        </li>
                    </ul>
                    <li className="menu__item hidden__buttons">
                        <Link to="/city">
                            <img src={GeoIcon} alt="Гео" />
                        </Link>
                        <Link to="/login">
                            <img src={UserIcon} alt="Користувач" />
                        </Link>
                        <Link to="/buy">
                            <img src={BuyIcon} alt="Купити" />
                        </Link>
                        <Link to="/favorites">
                            <img src={likeIkon} alt="Вподобання" />
                        </Link>
                        <div className="burger_container burger_container-adaptive">
                            <nav className="parrent__block">
                                <div className="burger-btn" onClick={() => setMenuActive(!menuActive)}>
                                    <span />
                                </div>
                            </nav>
                            <BurgerMenu active={menuActive} setActive={setMenuActive} header={"БУРГЕР МЕНЮ"} items={items} />
                        </div>
                    </li>
                </nav>
            </header>
            <Search />
        </>
    );
}