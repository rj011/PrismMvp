import React from "react";
import { useContext, createContext } from "react";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseconfig";

const Authcontext = createContext();

export const  Authcontextprovider = ({children}) => {

const googleSignIN =() => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
}

    return(
        <Authcontext.Provider value={{googleSignIN}}>
            {children}
        </Authcontext.Provider>
    )


}

export const UserAuth =() =>{
    return useContext(Authcontext)
}