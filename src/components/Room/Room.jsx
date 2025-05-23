import React from 'react';
import "./Room.css";
import CategoryCards from "../CategorySlider/CategorySlider"
import sliderData from "../../mocks/sliderData.json";
import RoomCards from "../SectionRoomsCard/SectionRoomsCard"
import RoomsCardData from "../../mocks/SectionRoomsCard.json"
import ProductsCards from "../HouseholdProductCards/HouseholdProductCards"
import ProductsCardsData from "../../mocks/HouseholdProductCards.json"
import InformationCard from "../InformationCard/InformationCard";
import informImg from "../../assets/img/rooms_img/inform1.png"
import FurnitureCards from "../FurnitureCards/FurnitureCards";
import ProductsOneSet from "../ProductsOneSet/ProductsOneSet"
import roomsOneSet from '../../mocks/RoomsOnSet.json';


function Room() {
    return (
        <>
            <div className="room-slider">
                <CategoryCards cards={sliderData} />
            </div>
            <div className='room-cards-box'>
                <RoomCards cards={RoomsCardData} />
            </div>
            <h1>ТОВАРИ</h1>
            <div className="product-cards_box">
                <ProductsCards cards={ProductsCardsData} />
            </div>
            <InformationCard
                image={informImg}
                title="ІНФОРМАЦІЯ"
                InternalTitle="ІНФОРМАЦІЯ"
                text="Lorem ipsum dolor sit amet consectetur.
                Bibendum neque at em integer integer. Tempus a mi in enim dui rhoncus vulputate nulla et. 
                Ornare sed cursus sed viverra."
            />
            <div className='room-cards-box'>
                <RoomCards cards={RoomsCardData} />
            </div>
            <FurnitureCards />
            <div className="room-gallery">
                <ProductsOneSet
                    title={roomsOneSet.title1}
                    data={{ images: roomsOneSet.images1 }}
                />

            </div>


        </>
    );
}

export default Room;    