import CollectionsCards from "../CollectionsCards/CollectionsCards";
import "./AllCollectionsCards.css"

function AllCollectionsCards({ cards }) {
    return (
        <>
            <div className="all_collection">
                {cards && cards.map((card, index) => (
                    <CollectionsCards key={index} image={card.image} title={card.title} />
                ))}
            </div>
        </>
    );
}

export default AllCollectionsCards; 