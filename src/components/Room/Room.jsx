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
import setImg1 from "../../assets/img/rooms_img/set_img1.png";
import setImg2 from "../../assets/img/rooms_img/set_img2.png"
import setImg3 from "../../assets/img/rooms_img/set_img3.png"




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
            <div className="room-gallery">
                <ProductsOneSet
                    title={roomsOneSet.title2}
                    data={{ images: roomsOneSet.images2 }}
                />
            </div>

            <h1>ЗАТИШНІ НАБОРИ</h1>
            <div className="set-box">
                <img src={setImg1} />
                <img src={setImg2} />
                <img src={setImg3} />
            </div>

            <h1>ДОДАТКОВО</h1>
            <div className="additional-information">
                Lorem ipsum dolor sit amet consectetur. Habitasse consequat egestas lectus blandit consequat. A sed placerat sapien amet scelerisque ullamcorper amet. Elementum consequat risus nullam augue lorem turpis rutrum enim. Sagittis magnis adipiscing non pulvinar ut lacus et montes molestie. Purus vitae risus laoreet vel quis volutpat facilisi justo sed. Sit morbi cras vel non et ut. Ut cursus justo leo nulla ridiculus pharetra egestas libero sed. Pellentesque odio feugiat volutpat amet
                sed id scelerisque. Ipsum cras vivamus sit ultrices pulvinar. Aliquam donec leo aliquam ornare in enim proin proin eget. Pellentesque tempus eget viverra volutpat nunc hac. Elementum ut ridiculus et eget eu viverra et. Lorem lorem habitant pulvinar sapien cras. Phasellus leo amet purus luctus cursus morbi turpis nibh non. Rhoncus etiam feugiat dolor ac cursus in
                ac semper. Et urna magna aliquam in sagittis. Eget ultrices ipsum rutrum lacus eu scelerisque sit. Et nibh eget morbi felis fringilla quis habitant. Ipsum aenean integer amet morbi tincidunt. Posuere cras commodo lobortis sit risus dictum nibh. Commodo risus dolor turpis suspendisse convallis.
            </div>
        </>
    );
}

export default Room;    