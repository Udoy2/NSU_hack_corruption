import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import UseAxiosSecure from '../customHooks/UseAxiosSecure';
import AuthProviderHook from '../customHooks/AuthProviderHooks';
import Loading from '../loading/loading';
import { toast } from 'react-toastify';

const AdminRouteProvider = ({ children }) => {
  const axiosSecure = UseAxiosSecure();
  let { user, handleError, signOutUser } = AuthProviderHook(); 
  const [role, setRole] = useState('admin');
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/userRole?email=${user.email}`)
        .then(res => {
          setRole(res.data);
          setLoading(false);  
        })
        .catch(handleError);
    } else {
      setLoading(false);  
    }
  }, [user?.email, axiosSecure, handleError]);

  let logout = ()=>{
    signOutUser().then(()=>{
      // alert("You are not admin");
      toast.error("you are not admin")

    })
  }
  
  if (loading) {
    return <Loading />;
  }

  // If the user is not an admin, log them out and redirect to login
  if (role !== 'admin') {
    logout();  // Ensure this method clears the authentication state
    return <Navigate to="/login" />;
  }

  // If the user is an admin, render the children (protected content)
  return children;
};

export default AdminRouteProvider;
