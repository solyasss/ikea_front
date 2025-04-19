import "./FeatureSection.css"
import FeatureCard from "../FeatureCard/FeatureCard";

export default function FeatureSection({ cards }) {
    return (
        <>
            <div className="feature-section">
                {cards && cards.map((card, index) => (
                    <FeatureCard key={index} image={card.icon} title={card.title} description={card.description}/>
                ))}
            </div>
        </>
    );
}