import React from "react";
import data from "../mocks/products.json";
import ProductCard from "../components/ProductCard/ProductCard";
import { Link } from "react-router-dom";
import Headers from "../components/Header/Header";

function Products() {
    return (
        <>
            <Headers />
            <div className="product-list">
                <h2>Products Page</h2>
                <Link to="/" style={{ color: "#007bff", textDecoration: "underline" }}>
                    Вернуться на главную
                </Link>
                {data.map((item) => (
                    <ProductCard
                        key={item.id}
                        name={item.name}
                        price={item.price}
                        image={item.image}
                    />
                ))}
            </div>
        </>
    );
}

export default Products;
