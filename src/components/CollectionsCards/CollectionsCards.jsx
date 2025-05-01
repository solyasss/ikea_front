import "./CollectionsCards.css"

function CollectionsCards({ title, image }) {
    return (
        <>
            <div
                className={`collection_card ${image ? 'cardWithImage' : ''}`}
                style={{ backgroundImage: image ? `url(${image})` : 'none' }}
            >
                <a href="">{title}</a>  
            </div>
        </>
    );
}

export default CollectionsCards;