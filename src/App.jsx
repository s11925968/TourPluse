import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./compount/layout/Layout.jsx";
import Home from "./compount/web/home/Home.jsx";
import Create from "./compount/auth/Create/Create.jsx";
import CreateCompany from "./compount/auth/CreateCompany/create/CreateCompany.jsx";
import Layoutadmin from "./compount/layout/Layoutadmin.jsx";
import AHome from "./compount/admin/home/Home.jsx";
import Page from "./compount/web/PageNotFound/Page.jsx";
import Apage from "./compount/admin/Pagenotfound/Page.jsx";
import Register from "./compount/web/register/Register.jsx";
import Login from "./compount/web/login/Login.jsx";
import { jwtDecode } from "jwt-decode";
import Catagouries from "./compount/web/catagouries/Catagouries.jsx";
export default function App() {
  const [users, setUser] = useState(null);
  const saveCurrentUser = () => {
    const token = localStorage.getItem("userToken");
    const decode = jwtDecode(token);
    setUser(decode);
  };
  useEffect(()=>{
    if(localStorage.getItem("userToken")){
      saveCurrentUser();
    }
  },[])
  const router = createBrowserRouter([
    {
      //web end point
    },
    {
      path: "/",
      element: <Layout users={users} setUser={setUser}/>,
      children: [
        {
          path: "/",
          element: <Home />,
        },

        {
          path: "Contact/create",
          element: <Create />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "catagouries",
          element: <Catagouries />,
        },
        {
          path: "Contact/create/createcompany",
          element: <CreateCompany />,
        },
        {
          path: "login",
          element: <Login saveCurrentUser={saveCurrentUser}/>,
        },
        {
          path: "*",
          element: <Page />,
        },
      ],
    },
    {
      //admin end point
    },
    {
      path: "/admin",
      element: <Layoutadmin />,
      children: [
        {
          path: "home",
          element: <AHome />,
        },
        {
          path: "*",
          element: <Apage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
