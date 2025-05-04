import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";


import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound.jsx";
import Promo from "./pages/Promo";
import Login from "./pages/Login.jsx";
import Favorites from "./pages/Favorites.jsx";
import Basket from "./pages/Basket.jsx";
import Idea from "./pages/Idea.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/products" element={<Products />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/promo" element={<Promo />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/Idea" element={<Idea />} />
            <Route path="/admin" element={<AdminPanel />} />

        </Routes>
    );
}

export default App;
