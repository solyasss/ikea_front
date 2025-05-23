import React from 'react';
import "./SectionRoomsCard.css";

function SectionRoomsCard({ title, cards }) {
    return (
        <>
            {cards.map((card, index) => (
                <div key={index} className='room-card'>
                    <img src={card.img} alt={`Room ${index}`} />
                    <p><span className="underline-text">{card.title}</span></p>
                </div>
            ))}
        </>
    );
}

export default SectionRoomsCard;