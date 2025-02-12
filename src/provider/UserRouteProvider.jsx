import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import UseAxiosSecure from '../customHooks/UseAxiosSecure';
import AuthProviderHook from '../customHooks/AuthProviderHooks';
import Loading from '../loading/loading';
import { toast } from 'react-toastify';

const UserRouteProvider = ({ children }) => {
  const axiosSecure = UseAxiosSecure();
  let { user, handleError, signOutUser } = AuthProviderHook(); 
  const [role, setRole] = useState('user');  // Default to admin as we want to block admins from this route
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

  let logout = () => {
    signOutUser().then(() => {
      toast.error("You do not have permission to access this route.");
    });
  };

  if (loading) {
    return <Loading />;
  }

  // If the user is an admin, log them out and redirect to login
  if (role === 'admin') {
    logout(); // Ensure this method clears the authentication state
    return <Navigate to="/login" />;
  }

  // If the user is a regular user, render the children (protected content)
  return children;
};

export default UserRouteProvider;
