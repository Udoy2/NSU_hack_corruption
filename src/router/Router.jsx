import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../components/main/homeMain/Main.jsx";
import React from "react";
import Error from "../error/Error";
import Login from "../components/authForm/Login.jsx";
import Register from "../components/authForm/Register.jsx";
import Posts from "../components/main/posts/Posts.jsx";
import SuccessNotice from "../components/main/notices/SuccessNotices.jsx";
import ContactUs from "../components/main/contactUs/ContactUs.jsx";
import AboutUs from "../components/main/aboutUs/AboutUs.jsx";
import UserDash from "../userComponents/userDashBoard/UserDash.jsx";
import CreatePost from "../userComponents/userCreatePost/CreatePost.jsx";
import ForgotPassword from "../components/authForm/ForgotPassword.jsx";
import AllUsers from "../adminComponents/allUsers/AllUsers.jsx";
import AllPosts from "../adminComponents/allPosts/AllPosts.jsx";
import UserProfile from "../adminComponents/allUsers/UserProfile.jsx";
import DetailsPost from "../components/main/detailsPost/DetailsPost.jsx";
import SuccessReportForm from "../adminComponents/successReport/SuccessReportForm.jsx";
import UserActivities from "../userComponents/userActivities/UserActivities.jsx";
import AllSuccessReports from "../adminComponents/allActivities/AllSuccessReports.jsx";
import DetailsSuccessReport from "../components/main/detailsSuccessReport/DetailsSuccessReport.jsx";
import AdminDash from "../adminComponents/adminDash/AdminDash.jsx";
import PrivateRoute from "../provider/PrivateRoute.jsx";
import UserRouteProvider from "../provider/UserRouteProvider.jsx";
import AdminRouteProvider from "../provider/AdminRouteProvider.jsx";


export const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      // this is all public routes
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "posts",
        element: <Posts />,
      },
      {
        path: "/posts/:id",
        element: <PrivateRoute><DetailsPost /></PrivateRoute>,
        loader: ({params})=>fetch(`http://localhost:3000/posts/${params.id}`)
      },
      {
        path: "achievements",
        element: <SuccessNotice />,
      },
      {
        path: "aboutUs",
        element: <AboutUs />,
      },
      {
        path: "contactUs",
        element: <ContactUs />,
    },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgotPassword",
        element: <PrivateRoute><ForgotPassword /></PrivateRoute>,
      },
      {
        path: "/achievements/:id",
        element: <PrivateRoute><DetailsSuccessReport/></PrivateRoute>,
        loader: ({params})=>fetch(`http://localhost:3000/successReport/${params.id}`)
      },

      // this is all the private routes
      {
        path: "userDashboard",
        element: <PrivateRoute><UserDash /></PrivateRoute>,
      },
      {
        path: "createPost",
        element: <PrivateRoute><CreatePost /></PrivateRoute>,
      },
      {
        path: "myActivities",
        element: <UserActivities />,
      },


      // admin and government routes

      {
        path:'/adminDashboard',
        element: <PrivateRoute><AdminDash/></PrivateRoute>
      },
      {
        path:'/admin/allUsers',
        element: <PrivateRoute><AllUsers/></PrivateRoute>
      },
      {
        path:'/admin/allUsers/:id',
        element: <PrivateRoute><UserProfile/></PrivateRoute>,
        loader: ({params})=>fetch(`http://localhost:3000/admin/allUsers/${params.id}`)
      },
      {
        path:'/admin/allPosts',
        element: <PrivateRoute><AllPosts/></PrivateRoute>
      },
      {
        path:'/admin/successFrom',
        element: <PrivateRoute><SuccessReportForm/></PrivateRoute>
      },
      {
        path:'/admin/allSuccessReports',
        element: <PrivateRoute><AllSuccessReports/></PrivateRoute>
      },

    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);
