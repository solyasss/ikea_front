import React from "react";
import categories from "../../mocks/Category.json";
import "./Footer.css";

const iconSocial1 = "src/assets/img/footer/inst.svg";
const iconSocial2 = "src/assets/img/footer/twit.svg";
const iconSocial3 = "src/assets/img/footer/tg.svg";
const iconBrand1 = "src/assets/img/footer/visa.svg";
const iconBrand2 = "src/assets/img/footer/mastercard.svg";
const iconBrand3 = "src/assets/img/footer/paypal.svg";
const iconBrand4 = "src/assets/img/footer/applepay.svg";
const iconBrand5 = "src/assets/img/footer/maestro.svg";

export default function Footer() {

    const firstBlockCategories = categories.slice(0, 4);
    const allCategories = categories;

    return (
        <footer className="footer-wrapper">
            <div className="container ">


                <div className="footer-row-1 mb-5">
                    <div className="row">
                        {firstBlockCategories.map((cat) => (
                            <div key={cat.id} className="col-3">
                                <h4 className="mb-3 fw-med">
                                    <a href={`/${cat.slug}`}>{cat.title}</a>
                                </h4>

                                {cat.subcategories.map((subcat, index) => (
                                    <h5 key={index} className="mb-3 fw-light">
                                        <a href={`/${cat.slug}/${subcat.slug}`}>
                                            {subcat.title}
                                        </a>
                                    </h5>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="footer-row-2 marg-y">
                    <div className="row">
                        <div className="col-xl-5 col-md-12">
                            <div className="row">

                                <div className="row col-4">
                                    <div className="col-4">
                                        <img src={iconSocial1} alt="Social icon 1" />
                                    </div>
                                    <div className="col-4">
                                        <img src={iconSocial2} alt="Social icon 2" />
                                    </div>
                                    <div className="col-4">
                                        <img src={iconSocial3} alt="Social icon 3" />
                                    </div>
                                </div>

                                <div className="row col-9">
                                    <div className="col-2" />
                                    <div className="col-2">
                                        <img src={iconBrand1} alt="Brand icon 1" />
                                    </div>
                                    <div className="col-2">
                                        <img src={iconBrand2} alt="Brand icon 2" />
                                    </div>
                                    <div className="col-2">
                                        <img src={iconBrand3} alt="Brand icon 3" />
                                    </div>
                                    <div className="col-2">
                                        <img src={iconBrand4} alt="Brand icon 4" />
                                    </div>
                                    <div className="col-2">
                                        <img src={iconBrand5} alt="Brand icon 5" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-row-3 marg-y marg-bot">
                    <div className="row">

                        <div className="col-4">
                            <h5 className="mb-2">
                                <a className="fw-light" href={`/${allCategories[0].slug}`}>
                                    {allCategories[0].title}
                                </a>
                            </h5>
                        </div>

                        {allCategories.slice(1).map((cat) => (
                            <div key={cat.id} className="col-2">
                                <h5 className="mb-2 fw-light">
                                    <a href={`/${cat.slug}`}>{cat.title}</a>
                                </h5>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
