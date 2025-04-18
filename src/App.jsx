import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";


import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound.jsx";
import Promo from "./pages/Promo";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/products" element={<Products />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/promo" element={<Promo />} />
        </Routes>
    );
}

export default App;
