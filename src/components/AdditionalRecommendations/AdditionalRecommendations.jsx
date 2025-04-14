import React from 'react';
import "./AdditionalRecommendations.css";


const AdditionalRecommendations = ({ title, showButtons, data }) => {

    const { images = [], buttons = [] } = data || {};

    const col1 = images.filter(item => item.column === 1);
    const col2 = images.filter(item => item.column === 2);
    const col3 = images.filter(item => item.column === 3);

    return (
        <div className="recommendations-container">
            <div className="section-title">
                <h1>{title}</h1>
            </div>

            {showButtons && (
                <div className="filters-row">
                    {buttons.map(btn => (
                        <a key={btn.id} href={btn.link} className="filter-button">
                            {btn.text}
                        </a>
                    ))}
                </div>
            )}

            <div className="images-row">
                <div className="column">
                    {col1.map(img => (
                        <div
                            key={img.id}
                            className={`image-wrapper ratio-${img.heightRatio}`}
                        >
                            <a href={img.link}>
                                <img src={img.src} alt={`Recommended ${img.id}`} />
                            </a>
                        </div>
                    ))}
                </div>

                <div className="column">
                    {col2.map(img => (
                        <div
                            key={img.id}
                            className={`image-wrapper ratio-${img.heightRatio}`}
                        >
                            <a href={img.link}>
                                <img src={img.src} alt={`Recommended ${img.id}`} />
                            </a>
                        </div>
                    ))}
                </div>

                <div className="column">
                    {col3.map(img => (
                        <div
                            key={img.id}
                            className={`image-wrapper ratio-${img.heightRatio}`}
                        >
                            <a href={img.link}>
                                <img src={img.src} alt={`Recommended ${img.id}`} />
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {showButtons && (
                <div className="filters-row mt-3">
                    {buttons.map(btn => (
                        <a key={btn.id} href={btn.link} className="filter-button">
                            {btn.text}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdditionalRecommendations;
