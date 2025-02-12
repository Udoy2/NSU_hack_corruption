import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Router } from "./router/Router.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import { ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
 
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
bodyClassName="toastBody"

/>
    <AuthProvider>
      <RouterProvider router={Router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
 
 