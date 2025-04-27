import "./FeatureCard.css"

export default function FeatureCard({ title, description, image }) {
    return (
        <>
            <div className="feature-card">
                <img src={image} alt="no_image" />
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </>
    );
}

