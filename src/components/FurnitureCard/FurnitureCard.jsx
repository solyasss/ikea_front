import React from "react";
import { Link } from "react-router-dom"; // Используем роутинг React
import furnitureData from "../../mocks/furniture.json";
import "./FurnitureCard.css";

/**
 * FurnitureCard — отображает одну карточку набора
 * @param {string} name  — название набора (опц.)
 * @param {string} image — путь к картинке (опц.)
 * @param {string} link  — ссылка для перехода (опц.)
 * Если какие-то пропсы не переданы, берем данные из первого элемента furnitureData.
 */
export default function FurnitureCard({ name, image, link }) {
    // Если пропсы не заданы, берём "первый элемент" из JSON
    const fallbackItem = furnitureData[0] || {};
    const finalName = name || fallbackItem.name;
    const finalImage = image || fallbackItem.image;
    const finalLink = link || fallbackItem.link || "#";

    return (
        <Link to={finalLink} className="furniture-card">
            <div className="furniture-card__image-container">
                <img src={finalImage} alt={finalName} className="furniture-card__image" />
            </div>

            <div className="furniture-card__name-container">
                <h5 className="furniture-card__name fw-sem-bold">{finalName}</h5>
            </div>
        </Link>
    );
}
