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

    const items = [
        { value: "ГОЛОВНА", href: "/" },
        { value: "ТОВАРИ", href: "/products" },
        { value: "КІМНАТИ", href: "/" },
        { value: "ІДЕЇ", href: "/Idea" },
        { value: "ДИЗАЙН", href: "/" }
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
                                <a href="" className="menu__link">Товари</a>
                            </li>
                            <li className="menu__item">
                                <a href="" className="menu__link">Кімнати</a>
                            </li>
                            <li className="menu__item">
                                <a href="" className="menu__link">Дизайн</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <nav className="header_menu">
                    <ul className="menu__list">
                        <li className="menu__item right__menu">
                            <img src={GeoIcon} alt="Гео" />
                            <a href="" className="menu__link">Київ</a>
                        </li>
                        <li className="menu__item right__menu">
                            <img src={UserIcon} alt="Гео" />
                            {user ? (
                                <Link to={`http://localhost:5173/account/${user.userId}`} className="menu__link">
                                    {user.userName}
                                </Link>
                            ) : (
                                <a href="/login" className="menu__link">Привіт! Увійдіть в Систему</a>
                            )}
                        </li>
                        <li className="menu__item right__menu__icons">
                            <a href="">
                                <img src={BuyIcon} alt="Гео" />
                            </a>
                            <a href="">
                                <img src={likeIkon} alt="Гео" />
                            </a>
                        </li>
                    </ul>
                    <li className="menu__item hidden__buttons">
                        <a href="">
                            <img src={GeoIcon} alt="Гео" />
                        </a>
                        <a href="">
                            <img src={UserIcon} alt="Гео" />
                        </a>
                        <a href="">
                            <img src={BuyIcon} alt="Гео" />
                        </a>
                        <a href="">
                            <img src={likeIkon} alt="Гео" />
                        </a>
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