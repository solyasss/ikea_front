import React from "react";
import PromoCard from "../PromoCard/PromoCard";
import cardsData from "../../mocks/promoCards.json";
import "./PromoSection.css";

/**
 * Секция с заголовком и набором промо‑карточек.
 *
 * @param {string} title – текст заголовка секции
 */
function PromoSection({ title }) {
    return (
        <section className="promo-section">
            <h2 className="promo-section__title">
                <div>{title} </div>
            </h2>

            <div className="promo-section__grid">
                {cardsData.map((card) => (
                    <div
                        key={card.id}
                        className={`promo-section__col-${card.colSpan}`}
                    >
                        <PromoCard
                            image={card.image}
                            title={card.title}
                            link={card.link}
                            variant={card.variant}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default PromoSection;
