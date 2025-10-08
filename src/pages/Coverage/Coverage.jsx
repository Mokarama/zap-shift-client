import { useLoaderData } from "react-router";
import BangladeshMap from "./BangladeshMap";


const Coverage = () => {
    const serviceCenters=useLoaderData();
    console.log(serviceCenters)
    return (
        <div>
            <BangladeshMap serviceCenters={serviceCenters}/>
        </div>
    );
};

export default Coverage;