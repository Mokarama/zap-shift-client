import { Navigate, useLocation } from "react-router";
import useAuth from "../src/hooks/useAuth";


const PrivateRoute = ({children}) => {
    const {user, loading}=useAuth();
     const location=useLocation();
     
    if(loading){
        return <span className="loading loading-spinner loading-xl"></span>
    }
    
    if(!user){
       return <Navigate state={{from: location.pathname}} to="/login"></Navigate>
    }
    return children;
};

export default PrivateRoute;