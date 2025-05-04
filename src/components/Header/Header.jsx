import "./Header.css";
import burgerIcon from '../../assets/img/header/burger copy.svg';
import UnionIcon from "../../assets/img/icons_svg/BuyNow.svg";
import GeoIcon from "../../assets/img/header/Vector.svg";
import UserIcon from "../../assets/img/header/uil_user1.svg";
import BuyIcon from "../../assets/img/header/BuyIcon.svg";
import likeIkon from "../../assets/img/header/Component 1.svg";
import Search from "../Search/Search";
import RunningLine from "../RunningLine/RunningLine";


export default function Headers() {
    return (
        <>
            <RunningLine />
            <header className="hedaer__container">
                <div className="leftMenu">
                    <div className="burger_container">
                        <img src={burgerIcon} alt="Меню" width={30} />
                        <span>Меню</span>
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
                            <a href="" className="menu__link">Привіт! Увійдіть в Систему</a>
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
                        <img src={burgerIcon} alt="Меню" width={30} />
                    </li>
                </nav>
            </header>
            <Search />
        </>
    );
}