import React from "react";
import UnionIcon from "../../assets/img/icons_svg/BuyNow.svg";
import CloseIcon from "../../assets/img/burger_menu/colse.svg"
import "./BasketMenu.css"

function BasketMenu({ header, items, active, setActive }) {
    return (
        <>
            <div className={active ? 'basket-burger_menu active' : 'basket-burger_menu'} onClick={() => setActive(false)}>
                <div className="basket-burger__blur" />
                <div className="basket-menu__content" onClick={e => e.stopPropagation()}>
                    <div className="basket-basket-buttons">
                        <button className="basket-continue__shopping">Продолжить покупки</button>
                        <button className="basket-go-basket">Перейти в корзину</button>
                    </div>
                </div> 
            </div>
        </>
    );
}

export default BasketMenu;
