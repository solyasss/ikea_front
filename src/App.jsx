import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";


import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/products" element={<Products />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
