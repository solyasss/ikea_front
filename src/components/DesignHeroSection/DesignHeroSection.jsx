import Headers from "../Header/Header";
import "./DesignHeroSection.css"
import create_design_icon from "../../assets/img/design_hero_section/card_img3.svg"
import сombine_ideas_icon from "../../assets/img/design_hero_section/card_img2.svg"
import result_icon from "../../assets/img/design_hero_section/card_img1.svg"

function DesignHeroSection() {
    return (
        <>
            <section className="disign-hero-section-box">
                <Headers />
                <div className="design_content">
                    <h1>СТВОРИ ДИЗАЙН СВОЄЇ МРІЇ</h1>
                    <div className="design_cards-box">
                        <div className="design_cards">
                            <div className="card-upper-content">
                                <img src={create_design_icon} />
                                <hr className="design-hero-divider" />
                                <div>СТВОРИ ДИЗАЙН</div>
                            </div>
                            <p>habitasse consequat egestas lectus blandit</p>
                        </div>
                        <div className="design_cards">
                            <div className="card-upper-content">
                                <img src={result_icon} />
                                <hr className="design-hero-divider" />
                                <div>КОМБІНУЙ ІДЕЇ</div>
                            </div>
                            <p>habitasse consequat egestas</p>
                        </div>
                        <div className="design_cards">
                            <div className="card-upper-content">
                                <img src={сombine_ideas_icon} />
                                <hr className="design-hero-divider" />
                                <div>РЕЗУЛЬТАТ</div>
                            </div>
                            <p>habitasse tus consequat egestas lectus blandit tus</p>
                        </div>
                    </div>
                    <div className="design_footer">
                        <h2 className="design_footer-title">ВТІЛЮЙ СВОЇ ІДЕЇ</h2>
                        <p className="design_footer-text">
                            lorem ipsum dolor sit amet consectetur. habitasse consequat egestas lectus
                            blandit consequat. a sed placerat sapien amet scelerisque ullamcorper amet.
                            elementum consequat risus nullam
                        </p>
                    </div>
                </div>


            </section>
             

        </>
    );
}

export default DesignHeroSection;  
