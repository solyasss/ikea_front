import React from "react";
import Ideas from "../components/Idea/Idea";
import Headers from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";

function Idea() {
    return (
        <>

            <Headers />
            <div className="container">
                <Ideas />
            </div>
            <Footer/>
        </>
    );
}

export default Idea;