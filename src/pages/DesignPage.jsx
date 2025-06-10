import Design from "../components/Design/Design";
import Footer from "../components/Footer/Footer.jsx";
import DesignHeroSection from "../components/DesignHeroSection/DesignHeroSection.jsx";

function DesignPage() {
    return (
        <>
            <DesignHeroSection />
            <div className="container">
                <Design />
            </div>
            <Footer />
        </>
    );
}

export default DesignPage;
