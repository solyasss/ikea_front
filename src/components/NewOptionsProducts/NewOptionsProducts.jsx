import React from "react";
import "./NewOptionsProducts.css";

import imgNov1 from "../../assets/img/new_options_products/set-1.png";
import imgNov2 from "../../assets/img/new_options_products/set-2.png";
import imgNov3 from "../../assets/img/new_options_products/set-3.png";

import imgSet1 from "../../assets/img/new_options_products/set-4.png";
import imgSet2 from "../../assets/img/new_options_products/set-5.png";
import imgSet3 from "../../assets/img/new_options_products/set-6.png";

const newItems = [
    {
        id: 1,
        img: imgNov1,
        text:
            "lorem ipsum dolor sit amet consectetur. gravida convallis id orci egestas non. rhoncus vitae quis sem."
    },
    {
        id: 2,
        img: imgNov2,
        text:
            "lorem ipsum dolor sit amet consectetur. gravida convallis id orci egestas non."
    },
    {
        id: 3,
        img: imgNov3,
        text: "lorem ipsum dolor sit amet consectetur."
    }
];

const cozyItems = [
    {
        id: 1,
        img: imgSet1,
        text:
            "lorem ipsum dolor sit amet consectetur. gravida convallis id orci egestas non. rhoncus vitae quis sem."
    },
    {
        id: 2,
        img: imgSet2,
        text:
            "lorem ipsum dolor sit amet consectetur. gravida convallis id orci egestas non."
    },
    {
        id: 3,
        img: imgSet3,
        text: "lorem ipsum dolor sit amet consectetur."
    }
];

function Section({ title, items }) {
    return (
        <section className="nop-section">
            <h1 className="nop-title">{title}</h1>

            <div className="nop-grid">
                {items.map((el) => (
                    <div key={el.id} className="nop-card">
                        <img src={el.img} alt={title} className="nop-img" />
                        <p className="nop-text">{el.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

function NewOptionsProducts() {
    return (
        <div className="new-options-products">
            <Section title="НОВИНКИ" items={newItems} />
            <Section title="ЗАТИШНІ НАБОРИ" items={cozyItems} />
        </div>
    );
}

export default NewOptionsProducts;
