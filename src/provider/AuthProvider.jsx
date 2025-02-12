import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
  } from "firebase/auth";
  import React, { createContext, useEffect, useState } from "react";
  import { auth } from "../firebase.config";
//   import UseAxiosPublic from "../customHooks/UseAxiosPublic";
//   import { toast } from "react-toastify";
  
  export const AuthContext = createContext();
  
  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    // E-mail registration
    const registerWithEmail = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    // SignIn / Login
    const signInUser = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    // SignOut / Logout
    const signOutUser = () => {
      setLoading(true);
      return signOut(auth);
    };
  
    // update user profile
    const updateUserProfile = (updatedData) => {
      setLoading(true);
      return updateProfile(auth.currentUser, updatedData);
    };
  
    const handleError = (error) => {
      alert(error.message);
      setLoading(false);
    };
  
    let authInfo = {
      user,
      setUser,
      loading,
      setLoading,
      registerWithEmail,
      signInUser,
      signOutUser,
      updateUserProfile,
      handleError
    };
  
  
    useEffect(() => {
        let unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        });
        return () => {
          unsubscribe();
        };
      }, []);
  
    return (
      <>
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
      </>
    );
  };
  
  export default AuthProvider;
