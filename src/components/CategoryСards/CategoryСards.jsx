import "./CategoryCards.css";

function CategoryCards({ image, name }) {
    return (
        <>
            <div
                className={`card ${image ? 'cardWithImage' : ''}`}
                style={{ backgroundImage: image ? `url(${image})` : 'none' }}
            >
                <a href="#" className="link_category">{name}</a>
            </div>
        </>
    );
}

export default CategoryCards;