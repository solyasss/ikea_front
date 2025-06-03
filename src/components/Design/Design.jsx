import inform_img from "../../assets/img/design_hero_section/inform.png"
import InformationCard from "../InformationCard/InformationCard"

function Design() {
    return (
        <>
            <InformationCard
                image={inform_img}
                InternalTitle="ВАЖЛИВА ІНФОРМАЦІЯ"
                text="Lorem ipsum dolor sit amet consectetur.
                Bibendum neque at em integer integer. Tempus a mi in enim dui rhoncus vulputate nulla et. 
                Ornare sed cursus sed viverra."
            />
        </>
    );
}

export default Design;