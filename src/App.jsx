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
import Profile from "./compount/web/profile/Profile.jsx";
import Tourlist from "./compount/admin/tours/TourList/Tourlist.jsx";
import Logincompany from "./compount/web/Logincompany/Logincompany.jsx";
import LayoutDashBord from "./compount/layout/LayoutDashBord.jsx";
import HomeDashbord from "./compount/dashbord/home/Home.jsx";
import TourlistActive from "./compount/dashbord/Tours/TourList/TourList.jsx";
import SelectCategories from "./compount/dashbord/Tours/selectCategories/SelectCategories.jsx";
import Createtour from "./compount/dashbord/Tours/CreateTours/Createtour.jsx"
import TourlistWeb from "./compount/web/Tour/TourList/TourListWeb.jsx";
import DeleteTour from "./compount/dashbord/Tours/DeleteTour/DeleteTour.jsx";
import UpdateOperator from './compount/admin/Operator/UpdateOperator/UpdateOperator.jsx';
import Spesific from './compount/admin/Operator/spesificTour/Spesific';
import SpesificTour from "./compount/web/Tour/spesificTour/SpesificTour.jsx";
import CreateRivew from "./compount/web/Tour/Createrivew/CreateRivew.jsx";
import CreateBlog from "./compount/admin/CreateBlogs/CreateBlog.jsx";
import CreateRivewCompany from './compount/web/tourOperator/Createrivew/CreateRivew.jsx';
import Userinfo from './compount/web/profile/Userinfo.jsx';
import Usercontact from './compount/web/profile/Usercontact.jsx';
import ProfileAdmin from './compount/admin/profile/Profile.jsx';
import UserinfoAdmin from './compount/admin/profile/Userinfo.jsx'
import UsercontactAdmin from './compount/admin/profile/Usercontact.jsx';
import ChangePassword from './compount/web/profile/ChangePassword.jsx'
import ChangePasswordAdmin from './compount/admin/profile/ChangePassword.jsx'
import ChangeEmail from "./compount/web/profile/ChangeEmail.jsx";
import ChangeEmailAdmin from "./compount/admin/profile/ChangeEmail";
import ProtectedCompany from "./compount/web/routeProteced/ProtextedCompany.jsx";
import ProtectedWeb from "./compount/web/routeProteced/ProtectedWeb.jsx";
import ForceDelete from './compount/admin/tours/DeleteTour/DeleteTour.jsx'
import DetilsTour from "./compount/web/Tour/DetilsTour/DetilsTour.jsx";
import Agencies from "./compount/web/All_Acencies/Agencies.jsx";
import DisplayOpearater from "./compount/admin/Operator/DisplayOperater/DisplayOpearater.jsx";
import Restore from "./compount/admin/tours/Restore/Restore.jsx";
import DetilsTourAdmin from"./compount/admin/tours/DetilsTour/DetilsTour.jsx"
import Users from "./compount/admin/Users/Users.jsx";
import Block from "./compount/admin/Users/Block/Block.jsx";
import GetOperater from "./compount/web/Tour/getOperater/GetOperater.jsx";
import GetOperaterAdmin from "./compount/admin/tours/returnOperater/GetOperater.jsx"
import ProfileCompany from "./compount/dashbord/Profile/Profile.jsx";
import UserinfoCompany from "./compount/dashbord/Profile/Userinfo.jsx";
import ContectCompany  from "./compount/dashbord/Profile/Usercontact.jsx";
import ChangeInfo from "./compount/dashbord/Profile/ChangeInfo.jsx";
import UpdateTour from "./compount/dashbord/Tours/Update/UpdateTour.jsx";
import DetilsTourCompany from "./compount/dashbord/Tours/DetilsTour/DetilsTour.jsx"
import ChangeEmailCompany from "./compount/dashbord/Profile/ChangeEmail.jsx"; 
import ChangePasswordCompany from "./compount/dashbord/Profile/ChangePassword.jsx"
import Recommender from "./compount/web/Recommender/Recommender.jsx";
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
      element:
      <ProtectedWeb>
        <Layout users={users} setUser={setUser} />
      </ProtectedWeb>
        ,
      children: [
        {
          path: "/",
          element: <Home users={users} />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "user/profile/:_id",
          element: <Profile />,
        },
        {
          path: "Contact/create",
          element: <Create />,
        },
        {
          path: "logincompany",
          element: <Logincompany />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path:"Recommender/:_id",
          element:<Recommender />,
        },
        {
          path: "auth/sendCode",
          element: <SendCode />,
        },
        {
          path:'allAgencies',
          element:<Agencies/>
        },
        {
          path: "auth/forgetPassword",
          element: <Forget />,
        },
        {
          path: "catagouries",
          element: <Catagouries />,
        },
        {
          path: "operator/getActive",
          element: <Categoriesyouroperator />,
        },
        {
          path: "Contact/create/createcompany",
          element: <CreateCompany />,
        },
        {
          path: "login",
          element: (
            <LoginProtected users={users}>
              <Login saveCurrentUser={saveCurrentUser} users={users} />
            </LoginProtected>
          ),
        },
        {
          path: "tourlistweb",
          element: <TourlistWeb users={users}/>,
        },
        {
          path: "tour/get/:_id",
          element: <SpesificTour />,
        },
        {
          path:'tour/details/:_id',
          element:<DetilsTour />
        },
        {
          path:'tour/get/company/:_id',
          element:<GetOperater/>
        },
        {
          path: "tour/:_id/review",
          element: <CreateRivew users={users} />,
        },
        {
          path: "company/:_id/review",
          element: <CreateRivewCompany users={users} />,
        },
        {
          path: "user/profile/:_id",
          element: <Profile />,
          children: [
            {
              path: "",
              element: <Userinfo />,
            },
            {
              path: "contact",
              element: <Usercontact />,
            },
            {
              path: "changePassword",
              element: <ChangePassword />,
            },
            {
              path: "changeEmail",
              element: <ChangeEmail />,
            },
          ],
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
      element: (
        <Protected users={users} setUser={setUser}>
          <Layoutadmin users={users} setUser={setUser} />
        </Protected>
      ),
      children: [
        {
          path: "",
          element: <AHome />,
        },
        {
          path: "getAdmin",
          element: <Admin users={users}/>,
        },
        {
          path:"getUsers",
          element:<Users />
        },
        {
          path: "CreateAdmin",
          element: <Creatadmin />,
        },
        {
          path: "updata/:_id",
          element: <Updata />,
        },
        {
          path:'block/:_id',
          element:<Block />
        },
        {
          path: "categories/get",
          element: <Categorie />,
        },
        {
          path: "categories/allTourOperator/:_id",
          element: <Touroperatorcategorite />,
        },
        {
          path: "categories/create",
          element: <CreateCatgories />,
        },
        {
          path: "updata/categories/:_id",
          element: <Update />,
        },
        {
          path: "operator/create/:_id",
          element: <Creaetoperator />,
        },
        {
          path: "operator/catgeoriesselect",
          element: <Catgeoriesselect />,
        },
        {
          path: "operator/UpdateOperator/:_id",
          element: <UpdateOperator />,
        },
        {
          path:"operator/getOperator",
          element:<DisplayOpearater/>
        },
        {
          path: "tour/get",
          element: <Tourlist />,
        },
        {
          path: "tour/get/:_id",
          element: <Spesific />,
        },
        {
          path:"tour/get/operater/:_id",
          element:<GetOperaterAdmin />
        },
        {
          path:'tour/forceDelete/:_id',
          element:<ForceDelete/>
        },
        {
          path:'tour/restore/:_id',
          element:<Restore/>
        },
        {
          path:'tour/detils/:_id',
          element:<DetilsTourAdmin/>
        },
        {
          path: "blog/createBlog",
          element: <CreateBlog />,
        },
        {
          path: "user/profile/:_id",
          element: <ProfileAdmin />,
          children: [
            {
              path: "",
              element: <UserinfoAdmin />,
            },
            {
              path: "contact",
              element: <UsercontactAdmin />,
            },
            {
              path: "changePassword",
              element: <ChangePasswordAdmin />,
            },
            {
              path: "changeEmail",
              element: <ChangeEmailAdmin />,
            },
          ],
        },
        {
          path: "*",
          element: <Apage />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedCompany>
          <LayoutDashBord />
        </ProtectedCompany>
      ),
      children: [
        {
          path: "",
          element: <HomeDashbord />,
        },
        {
          path: "tour/getActive",
          element: <TourlistActive />,
        },
        {
          path: "selectCategories",
          element: <SelectCategories />,
        },
        {
          path: "createTours/:_id",
          element: <Createtour />,
        },
        {
          path: "Update/Tour/:_id",
          element: <UpdateTour />,
        },
        {
          path:'tour/detils/:_id',
          element:<DetilsTourCompany/>
        },
        {
          path: "tour/forceDelete/:id",
          element: <DeleteTour />,
        },
        {
          path: "company/profile/:_id",
          element: <ProfileCompany />,
          children: [
            {
              path: "",
              element: <UserinfoCompany />,
            },
            {
              path: "contact",
              element: <ContectCompany />,
            },
            {
              path: "ChangeInfo",
              element: <ChangeInfo/>,
            },
            {
              path: "changeEmail",
              element: <ChangeEmailCompany />,
            },
            {
              path: "ChangePassword",
              element: <ChangePasswordCompany />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
