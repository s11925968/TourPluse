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
import Touroperatorcategorite from "./compount/admin/categories/TouroperatorCategories/Touroperatorcategorite.jsx";
import CreateCatgories from "./compount/admin/categories/create/CreateCategories.jsx";
import Update from "./compount/admin/categories/Updatecategories.jsx";
import About from "./compount/web/about/About.jsx";
import SendCode from "./compount/web/sendcode/SendCode.jsx";
import Forget from "./compount/web/forgetpassword/Forget.jsx"
import Protected from "./compount/web/routeProteced/Protected.jsx";
import LoginProtected from "./compount/web/routeProteced/LoginProtected.jsx";
import Catgeoriesselect from "./compount/admin/Operator/createoperator/Catgeoriesselect.jsx";
import Creaetoperator from './compount/admin/Operator/Creat/Creaetoperator.jsx'
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
      path: "/",
      element: <Layout users={users} setUser={setUser}/>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
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
          path:"auth/sendCode",
          element:<SendCode />
        },
        {
          path:"auth/forgetPassword",
          element:<Forget />
        },
        {
          path: "catagouries",
          element: <Catagouries />,
        },
        {
          path: "categories/tourOperator/:_id",
          element: <Categoriesyouroperator />,
        },
        {
          path: "Contact/create/createcompany",
          element: <CreateCompany />,
        },
        {
          
          path: "login",
          element:
            <LoginProtected users={users}>
            <Login saveCurrentUser={saveCurrentUser} users={users}/>
            </LoginProtected>,
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
      element:<Layoutadmin users={users} setUser={setUser}/>,
      children: [
        {
          path: "",
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
          path:'updata/categories/:_id',
          element:<Update/>
        },
        {
          path:'operator/create/:_id',
          element:<Creaetoperator/>
        },
        {
          path:'operator/catgeoriesselect',
          element:<Catgeoriesselect/>
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
