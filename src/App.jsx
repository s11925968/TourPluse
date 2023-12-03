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
import Categoriesyouroperator from "./compount/web/tourOperator/Categoriesyouroperator.jsx";
import Users from "./compount/admin/users/Users.jsx";
import Admin from "./compount/admin/Admin/getadmin/Admin.jsx";
import Creatadmin from "./compount/admin/Admin/creatadmin/Creatadmin.jsx";
import Updata from "./compount/admin/Admin/updata/Updata.jsx";
import Categorie from "./compount/admin/categories/Categorie.jsx";
import Touroperatorcategorite from "./compount/admin/categories/Touroperatorcategorite.jsx";
import CreateCatgories from "./compount/admin/categories/create/CreateCategories.jsx";
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
          path: "/categories/tourOperator/:_id",
          element: <Categoriesyouroperator />,
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
          path: "users",
          element: <Users />,
        },
        {
          path:'getAdmin',
          element:<Admin />
        },
        {
          path:'creatadmin',
          element:<Creatadmin />
        },
        {
          path:'updata/:_id',
          element:<Updata />
        }
        ,{
          path:'categories/get',
          element:<Categorie />
        },
        {
          path:'categories/allTourOperator/:_id',
          element:<Touroperatorcategorite />
        },
        {
          path:'categories/create',
          element:<CreateCatgories/>
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
