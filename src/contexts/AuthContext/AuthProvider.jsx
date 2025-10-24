import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase.init";



const AuthProvider = ({children}) => {
const [user, setUser]=useState(null);
const [loading, setLoading]=useState(true);




    //create user
    const createUser =(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth , email, password);
    }

  //create SignIn
  const signIn=(email, password)=>{
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }
  //sign in with google
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = ()=>{
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
    .finally(()=>setLoading(false));
  }
  //profile
  const updateUserProfile =profileInfo =>{
    return updateProfile(auth.currentUser, profileInfo)
  }

  //log out
  const logOut=()=>{
    setLoading(true);
    return signOut(auth).finally(() => setLoading(false));;
  }

  useEffect(()=>{
       const unSubscribe=onAuthStateChanged(auth, currentUser=>{
        setUser(currentUser);
        console.log('user in the auth state change');
        setLoading(false);
       }) ;
       return()=>{
        unSubscribe();
       }
  },[])

    const authInfo={
        user,
        loading,
        createUser,
        signIn,
       updateUserProfile,
       signInWithGoogle,
      logOut,
        
    }
    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

