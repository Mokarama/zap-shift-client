import {  useContext } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";


const useAuth = () => {
   const authInfo =useContext(AuthContext);
   return authInfo;
};


export default useAuth;