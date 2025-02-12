import React, { useContext, useState } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from "./AuthProvider";
import Loading from "../loading/loading";

const PrivateRoute = ({ children }) => {
  let { user, loading } = useContext(AuthContext);
  let location = useLocation();
  const [alertShown, setAlertShown] = useState(false);

  // Function to handle the redirect and alert
  const handleRedirect = () => {
    if (!alertShown) {
      alert("You need to be logged in to access this page.");
      setAlertShown(true);  // Ensure alert is shown only once
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!user || !user?.email) {
    handleRedirect();  // Show the alert when user is not logged in
    return <Navigate state={location.pathname} to="/login" />;
  }

  return children;
};

export default PrivateRoute;
