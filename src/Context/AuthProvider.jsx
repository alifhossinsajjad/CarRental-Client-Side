import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../Firebase/Firebase.config';
import { AuthContext } from './AuthContext';


const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null)

    const [loading, setLoading] = useState(true)



useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth,(currentUser) =>{
        setUser(currentUser)
        setLoading(false)
    })
    return()=> {
        unsubscribe()
    } 
},[])

const userInfo ={
    user,
    setUser,
    loading,
    setLoading,
} 

    return (
        <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;