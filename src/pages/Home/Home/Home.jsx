import Banner from "../Banner/Banner";
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
        </div>
    );
};

export default Home;