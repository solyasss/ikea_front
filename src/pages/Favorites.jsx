import React from "react";
import FavoritesBlock from "../components/Favorites/Favorites";
import { Link } from "react-router-dom";
import Headers from "../components/Header/Header";
import Footer from "../components/Footer/Footer.jsx";

function Favorites() {
    return (
        <>

            <Headers />
            <div className="container">
                <Link to="/" style={{ color: "#007bff", textDecoration: "underline" }}>
                    Вернуться на главную
                </Link>
                <FavoritesBlock />
            </div>
            <Footer />
        </>
    );
}

export default Favorites;
