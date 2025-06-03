import React from 'react';
import "./ProductsOneSet.css";

const ProductsOneSet = ({ title, description, data }) => {
    const { images = [], buttons = [] } = data || {};

    const col1 = images.filter(item => item.column === 1);
    const col2 = images.filter(item => item.column === 2);

    return (
        <div className="gallery-products-container">
            <div className="section-title section-title__productsOneSet">
                <h1>{title}</h1>
                <div>{description}</div>
            </div>

            <div className="images-row">
                <div className="column horizontal">
                    {col1.map(img => (
                        <div
                            key={img.id}
                            className={`image-wrapper ratio-${img.heightRatio}`}
                            style={{
                                ...(img.width ? { width: img.width } : {}),
                                ...(img.style || {})
                            }}
                        >
                            <a href={img.link}>
                                <img src={img.src} alt={`Recommended ${img.id}`} />
                            </a>
                        </div>
                    ))}
                </div>

                <div className="column vertical">
                    {col2.map(img => (
                        <div
                            key={img.id}
                            className={`image-wrapper ratio-${img.heightRatio}`}
                            style={{
                                ...(img.width ? { width: img.width } : {}),
                                ...(img.style || {})
                            }}
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

export default ProductsOneSet;
