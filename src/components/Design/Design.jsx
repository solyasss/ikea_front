import inform_img from "../../assets/img/design_hero_section/inform.png"
import inform2_img from "../../assets/img/design_hero_section/inform2.png"
import inform3_img from "../../assets/img/design_hero_section/inform3.png"


import InformationCard from "../InformationCard/InformationCard"
import CategorySlider from "../CategorySlider/CategorySlider"
import sliderData from "../../mocks/sliderData.json";
import "./Design.css"

function Design() {
    return (
        <>
            <div className="design-card-box">
                <div className="design-offers-card first-backround-img-card">
                    <div className="design-card-description">
                        <h3>ЯК ОБРАТИ СТИЛЬ</h3>
                        <div>Lorem ipsum dolor sit amet consectetur. Habitasse consequat egestas lectus consequat egestas lectus blandit consequat. A sed  blandit consequat. A sed placerat sapien amet...</div>
                    </div>
                </div>
                <div className="design-offers-card second-backround-img-card">
                    <div className="design-card-description">
                        <h3>НАШІ ПОРАДИ</h3>
                        <div>Lorem ipsum dolor sit amet consectetur. Habitasse consequat egestas lectus consequat egestas lectus blandit consequat. A sed  blandit consequat. A sed placerat sapien amet...</div>
                    </div>
                </div>
                <div className="design-offers-card third-backround-img-card">
                    <div className="design-card-description">
                        <h3>ЯК СПАЛАНУВАТИ</h3>
                        <div>Lorem ipsum dolor sit amet consectetur. Habitasse consequat egestas lectus consequat egestas lectus blandit consequat. A sed  blandit consequat. A sed placerat sapien amet...</div>
                    </div>
                </div>
            </div>

            <InformationCard
                image={inform_img}
                InternalTitle="ВАЖЛИВА ІНФОРМАЦІЯ"
                text="Lorem ipsum dolor sit amet consectetur.
                Bibendum neque at em integer integer. Tempus a mi in enim dui rhoncus vulputate nulla et. 
                Ornare sed cursus sed viverra."
            />
            <CategorySlider title="ВАРІАНТИ ОФОРМЛЕННЯ" cards={sliderData} />
            <InformationCard
                image={inform2_img}
                title="ПОРАДИ"
                InternalTitle="ІНФОРМАЦІЯ"
                text="Lorem ipsum dolor sit amet consectetur.
                Bibendum neque at em integer integer. Tempus a mi in enim dui rhoncus vulputate nulla et. 
                Ornare sed cursus sed viverra."
            />
            <InformationCard
                image={inform3_img}
                InternalTitle="ІНФОРМАЦІЯ"
                text="Lorem ipsum dolor sit amet consectetur.
                Bibendum neque at em integer integer. Tempus a mi in enim dui rhoncus vulputate nulla et. 
                Ornare sed cursus sed viverra."
            />
        </>
    );
}

export default Design;