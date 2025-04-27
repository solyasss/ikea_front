import React from "react";
import "./Favorites.css";

function Favorites() {
    return (
        <div className="container-fluid favorites-container">
            <div className="favorites-title-wrapper">
                <h2 className="favorites-title fw-bold">ВАШ ЛИСТ БАЖАНЬ ПУСТИЙ...</h2>
            </div>

            <div className="favorites-images">
                <img
                    src="/src/assets/img/favorites/face.png"
                    alt="face"
                    className="favorites-circle-img"
                />
                <img
                    src="/src/assets/img/favorites/smile.png"
                    alt="smile"
                    className="favorites-face-img"
                />
            </div>
        </div>
    );
}

export default Favorites;
