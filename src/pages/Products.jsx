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
import CategoryCards from "../components/CategorySlider/CategorySlider";
import sliderData from "../mocks/sliderData.json";
import ProductsOneSet from "../components/ProductsOneSet/ProductsOneSet.jsx"
import productsOneSet from '../mocks/ProductsOneSet.json';


function Products() {
    return (
        <>
            <Headers />
            <div className="product-list container">
                <CategoryCards title="ТОВАРИ" cards={sliderData} />
                <ProductsOneSet
                    title={productsOneSet.title1}
                    description={productsOneSet.description1}
                    data={{ images: productsOneSet.images1 }}
                />

                <NewOptionsProducts />

                <ProductsOneSet
                    title={productsOneSet.title2}
                    description={productsOneSet.description2}
                    data={{ images: productsOneSet.images2 }}
                />

                <FeatureSection cards={FeatureData} />
                {SectionDescriptionData.map((item) => (
                    <SectionDescription
                        key={item.id}
                        title={item.title}
                        description={item.description}
                    />
                ))}
            </div>
            <Footer />
        </>
    );
}

export default Products;
