import React from "react";
import data from "../mocks/products.json";
import ProductCard from "../components/ProductCard/ProductCard";
import NewOptionsProducts from "../components/NewOptionsProducts/NewOptionsProducts";
import { Link } from "react-router-dom";
import Headers from "../components/Header/Header";
import Footer from "../components/Footer/Footer.jsx";
import FeatureSection from "../components/FeatureSection/FeatureSection";
import FeatureData from "../mocks/FeatureCard.json"
import SectionDescriptionData from "../mocks/SectionDescription.json";
import SectionDescription from "../components/SectionDescription/SectionDescription";

function Products() {
    return (
        <>
            <Headers/>
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
                <FeatureSection cards={FeatureData}/>
                {SectionDescriptionData.map((item) => (
                    <SectionDescription 
                        key={item.id}
                        title={item.title}
                        description={item.description}
                    />
                ))}
            </div>
            <Footer/>
        </>
    );
}

export default Products;
