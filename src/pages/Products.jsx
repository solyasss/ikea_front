import React from "react";
import data from "../mocks/products.json";
import ProductCard from "../components/ProductCard/ProductCard";
import NewOptionsProducts from "../components/NewOptionsProducts/NewOptionsProducts";
import { Link } from "react-router-dom";
import Headers from "../components/Header/Header";

function Products() {
    return (
        <>
            <div className="product-list container">
                <NewOptionsProducts />
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
