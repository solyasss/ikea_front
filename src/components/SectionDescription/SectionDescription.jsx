import "./SectionDescription.css"

export default function SectionDescription({title, description}){
    return(
        <>
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
        </>
    );
}