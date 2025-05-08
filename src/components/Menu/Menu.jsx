import React from "react";
import UnionIcon from "../../assets/img/icons_svg/BuyNow.svg";
import CloseIcon from "../../assets/img/burger_menu/colse.svg"
import "./Menu.css"

function BurgerMenu({ header, items, active, setActive }) {
    return (
        <>
            <div className={active ? 'burger_menu active' : 'burger_menu'} onClick={() => setActive(false)}>

                <div className="burger__blur" >
                    <div className="menu__content" onClick={e => e.stopPropagation()}>
                        <div className="burger__close-wrapper" onClick={() => setActive(false)}>
                            <img src={CloseIcon} className="burger__logo" width={20} height={20} alt="Лого" />
                        </div>
                        <div className="burger__logo-wrapper">
                            <img src={UnionIcon} className="burger__logo" width={112} height={36} alt="Лого" />
                        </div>
                        <ul className="burger__list">
                            {items.map(item =>
                                <li>
                                    <a href={item.href}>{item.value}</a>

                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BurgerMenu;
