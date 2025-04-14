import React from "react";
import furnitureData from "../../mocks/furniture.json";
import FurnitureCard from "../FurnitureCard/FurnitureCard";

export default function FurnitureCards() {
    return (
       <div className="mt-5">
        <div className="row mb-1">
            {furnitureData.map((item, index) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 my-1" key={index}>
                    <FurnitureCard
                        name={item.name}
                        image={item.image}
                        link={item.link}
                    />
                </div>

            ))}
        </div>
       </div>
    );
}
