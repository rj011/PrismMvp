import React, { useEffect, useState } from "react";
import { useContext, createContext } from "react";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseconfig";

const Authcontext = createContext();

export const  Authcontextprovider = ({children}) => {
const [user, setUser] =useState({});
const googleSignIn =() => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
}

const logOut = () =>
{
    signOut(auth)
}
 
useEffect(() =>
    {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) =>
        {
            setUser(currentUser);
            console.log('User',currentUser)
        });
        return() =>
        {
            unsubscribe();
        }
    }, [])
    return(
        <Authcontext.Provider value={{googleSignIn, logOut, user}}>
            {children}
        </Authcontext.Provider>
    )


}

export const UserAuth =() =>{
    return useContext(Authcontext)
}