import React, { useEffect, useState } from 'react';
import './HeroSection.css';
import Headers from "../Header/Header";
import data from "../../mocks/products.json";
import ProductCard from "../ProductCard/ProductCard";

export default function HeroSection() {
    const TITLE = 'ВСЕ ДЛЯ ДОМУ';
    const BUTTON_TEXT = 'СТВОРИТИ АКАУНТ ТА ПОЧАТИ!';
    const CATALOG_OPTIONS = ['Меблі', 'Освітлення', 'Кухня', 'Декор'];

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        fetch("https://localhost:7290/api/auth/me", {
            credentials: 'include'
        })
            .then(res => {
                if (res.status === 200) return res.json();
                throw new Error("Not authenticated");
            })
            .then(data => {
                setIsAuthenticated(true);
            })
            .catch(() => {
                setIsAuthenticated(false);
            });
    }, []);

    return (
        <section className="hero-section">
            <Headers />
            <h1>{TITLE}</h1>
            <div className="hero-block-navigations">
                <div className="hero-block-buttons">
                    {!isAuthenticated && (
                        <button className="start-accaunt-button">{BUTTON_TEXT}</button>
                    )}
                    <select className="catalog-dropdown">
                        <option disabled selected>КАТАЛОГ</option>
                        {CATALOG_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="hero-cards">
                    {data.map((item) => (
                        <ProductCard
                            key={item.id}
                            name={item.name}
                            title={item.title}
                            price={item.price}
                            image={item.image}
                        />
                    ))}
                </div>
                <div className="discount__block">
                    ЛОВИ МОМЕНТ | <span className="discount-text"> Знижки до 60%</span> на вибрані категорії товарів!
                </div>
            </div>
        </section>
    );
}
