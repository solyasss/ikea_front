import React from "react";
import { Link } from "react-router-dom";
import "./PromoCard.css";

import IconLinkPromo from "../../assets/img/icons_svg/icon-link-promo.svg";

/**
 * @param {string} image
 * @param {string} title
 * @param {string} link
 * @param {'standard'|'icon'} variant
 */
function PromoCard({ image, title, link, variant = "standard" }) {
    return (
        <Link to={link} className={`promo-card promo-card--${variant}`}>
            <img src={image} alt={title || "promo"} className="promo-card__image" />

            {variant === "standard" && (
                <div className="promo-card__overlay">
                    <h2 className="promo-card__title mb-0 text-center">
                        {title}</h2>
                    <button className="promo-card__icon-btn" aria-label="Открыть">
                        <img src={IconLinkPromo} alt="Перейти" className="promo-card__icon" />
                    </button>
                </div>
            )}

            {variant === "icon" && (
                <div className="promo-card__icon-bar">
                    <img src={IconLinkPromo} alt="Перейти" className="promo-card__icon" />
                </div>
            )}
        </Link>
    );
}

export default PromoCard;
