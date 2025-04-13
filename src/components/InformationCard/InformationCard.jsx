import './InformationCard.css';

function InformationCard({ image, title, InternalTitle, text }) {
    return (
        <div className="card custom-card" style={{ maxWidth: "1480px" }} >
            <div className="row g-0 align-items-stretch">
                <div className="col-md-7">
                    <img src={image} className="img-fluid rounded-start h-100 w-100 object-fit-cover" alt="..." />
                </div>
                <div className="col-md-5 text-block">
                    <div className="card-body">
                        <h2 className="card-title">{InternalTitle}</h2>
                        <p className="card-text">{text}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InformationCard;
