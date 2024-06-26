import { createContext, useContext, useEffect, useState} from "react";
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect,
  signOut,
  onAuthStateChanged 
} from "firebase/auth";
import { auth } from "./FireBase";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{

  const [user, setuser] = useState({})

  const googleSignIn = () =>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth,provider)
  };

  const logOut = () =>{
    signOut(auth)
  }

  useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
    setuser(currentUser)
    // console.log('user',currentUser);
   });
   return ()=>{
    unsubscribe()
   }
  }, [])
  

  return (
    <AuthContext.Provider value={{googleSignIn,logOut,user}}>
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}