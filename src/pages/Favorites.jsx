import React from "react";
import FavoritesBlock from "../components/Favorites/Favorites";
import { Link } from "react-router-dom";

function Favorites() {
    return (
        <div className="container">
            <Link to="/" style={{ color: "#007bff", textDecoration: "underline" }}>
                Вернуться на главную
            </Link>
            <FavoritesBlock />
        </div>
    );
}

export default Favorites;
