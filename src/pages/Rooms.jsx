import React from "react";
import Room from "../components/Room/Room"
import Headers from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function Rooms() {
    return (
        <>
            <Headers />
            <div className="container">
                <Room />
            </div>
            <Footer />
        </>
    );
}

export default Rooms;