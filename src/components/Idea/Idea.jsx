import React from "react";
import SectionDescription from "../SectionDescription/SectionDescription";
import InformationCard from "../InformationCard/InformationCard";
import CategorySlider from "../CategorySlider/CategorySlider";
import IdeasRecommendations from "../IdeasRecommendations/IdeasRecommendations";
import AllCollectionsCards from "../AllCollectionsCards/AllCollectionsCards";

import informImg1 from "../../assets/img/ideas/idea_img1.png";
import informImg2 from "../../assets/img/ideas/idea_img2.png";

import sliderData from "../../mocks/sliderData.json";
import recommendationsData from '../../mocks/IdeasRecommendations.json';
import collectionCardData from "../../mocks/collectionsCard.json"


import "./idea.css"

function Idea() {
    return (
        <>
            <div className="ideas_box">
                <SectionDescription
                    title={"Ідеї для оформлення"}
                    description={"Lorem ipsum dolor sit amet consectetur. Habitasse consequat egestas lectus blandit consequat. A sed placerat sapien amet scelerisque ullamcorper amet. Elementum consequat risus nullam augue lorem turpis rutrum enim. Sagittis magnis adipiscing non pulvinar ut lacus et montes molestie. Purus vitae risus laoreet vel quis volutpat facilisi justo sed. Sit morbi cras vel non et ut. Ut cursus justo leo nulla ridiculus pharetra egestas libero sed. Pellentesque odio feugiat volutpat amet."}
                />
                <InformationCard
                    image={informImg1}
                    title="ІДЕЇ"
                    InternalTitle="ІНФОРМАЦІЯ"
                    text="Lorem ipsum dolor sit amet consectetur. Bibendum neque at em integer integer. Tempus a mi in enim dui rhoncus vulputate nulla et. Ornare sed cursus sed viverra.Lorem ipsum dolor sit amet ."
                />
                <InformationCard
                    image={informImg2}
                    title=""
                    InternalTitle="ІНФОРМАЦІЯ"
                    text="Lorem ipsum dolor sit amet consectetur. Bibendum neque at em integer integer. Tempus a mi in enim dui rhoncus vulputate nulla et. Ornare sed cursus sed viverra.Lorem ipsum dolor sit amet ."
                />
                <CategorySlider title="РЕКОМЕНДАЦІЇ" cards={sliderData} />
                <AllCollectionsCards cards={collectionCardData} />
                <IdeasRecommendations
                    title={recommendationsData.title}
                    showButtons={true}
                    data={recommendationsData}
                />
                <CategorySlider title="ІДЕЇ ДЛЯ ОФОРМЛЕННЯ" cards={sliderData} />
            </div>

        </>
    );
}

export default Idea;