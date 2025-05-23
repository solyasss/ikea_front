import "./HouseholdProductCards.css"

function HouseholdProductCards({ cards }) {
    return (
      <>
            {cards.map((card, index) => (
                <article key={index} className="room-product-card">
                    <img src={card.img} alt={`Изображение товара ${card.product_name}`} />
                    <p>{card.product_name}</p>
                    <p>{card.description}</p>
                    <p><strong>{card.price}</strong></p>
                </article>
            ))}
        </>
    );
}

export default HouseholdProductCards;