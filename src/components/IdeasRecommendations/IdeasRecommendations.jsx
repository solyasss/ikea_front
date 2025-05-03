import React from 'react';
import "./IdeasRecommendations.css";

const IdeasRecommendations = ({ title, showButtons, data }) => {

    const { images = [], buttons = [] } = data || {};

    const col1 = images.filter(item => item.column === 1);
    const col2 = images.filter(item => item.column === 2);
    const col3 = images.filter(item => item.column === 3);

    return (
        <div className="ideas-recommendations-container">
            <div className="ideas-section-title">
                <h1>{title}</h1>
            </div>

            <div className="ideas-images-row">
                <div className="ideas-column">
                    {col1.map(img => (
                        <div
                            key={img.id}
                            className={`ideas-image-wrapper ideas-ratio-${img.heightRatio}`}
                        >
                            <a href={img.link}>
                                <img src={img.src} alt={`Recommended ${img.id}`} />
                            </a>
                        </div>
                    ))}
                </div>

                <div className="ideas-column">
                    {col2.map(img => (
                        <div
                            key={img.id}
                            className={`ideas-image-wrapper ideas-ratio-${img.heightRatio}`}
                        >
                            <a href={img.link}>
                                <img src={img.src} alt={`Recommended ${img.id}`} />
                            </a>
                        </div>
                    ))}
                </div>

                <div className="ideas-column">
                    {col3.map(img => (
                        <div
                            key={img.id}
                            className={`ideas-image-wrapper ideas-ratio-${img.heightRatio}`}
                        >
                            <a href={img.link}>
                                <img src={img.src} alt={`Recommended ${img.id}`} />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IdeasRecommendations;
