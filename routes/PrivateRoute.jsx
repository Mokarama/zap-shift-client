import { Navigate } from "react-router";
import useAuth from "../src/hooks/useAuth";


const PrivateRoute = ({children}) => {
    const {user, loading}=useAuth();

    if(loading){
        return <span className="loading loading-spinner loading-xl"></span>
    }
    
    if(!user){
        <Navigate to="/login"></Navigate>
    }
    return children;
};

export default PrivateRoute;