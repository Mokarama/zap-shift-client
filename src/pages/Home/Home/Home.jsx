import Banner from "../Banner/Banner";
import FeatureCards from "../FeatureCards/FeatureCards";
import Merchant from "../Merchant/Merchant";
import Services from "../Services/Services";
import Works from "../Works/Works";
import CompanyLogo from "./CompanyLogo/companyLogo";

const Home = () => {
    return (
        <div>
            <Banner/>
            <Services/>
            <Works/>
            <CompanyLogo/>
            <FeatureCards/>
            <Merchant/>
        </div>
    );
};

export default Home;