/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import UserManagment from "views/UserManagment";
import Jobs from "views/Jobs";
import Template from "views/Template";
import Settings from "views/Settings";
import JobQueue from "views/JobQueue";
import DesignTemplate from "views/DesignTemplate";
import Booklet32Page from "views/Booklet32Page";
import Booklet24Page from "views/Booklet24Page";
import ImageGrid from "views/Imagegrid";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/",
    name: "Jobs",
    icon: "ni ni-briefcase-24 text-yellow",
    component: <Jobs />,
    layout: "/admin",
  },
  // {
  //   path: "/column-generation",
  //   name: "Column Generation",
  //   icon: "ni ni-briefcase-24 text-blue",
  //   component: <ImageGrid />,
  //   layout: "/admin",
  // },
  {
    path: "/template",
    name: "Template",
    icon: "ni ni-collection text-red",
    component: <Template />,
    layout: "/admin",
  },
  {
    path: "/user-managment",
    name: "User Managment",
    icon: "ni ni-circle-08 text-info",
    component: <UserManagment />,
    layout: "/admin",
  },
  // {
  //   path: "/24-page-booklet",
  //   name: "24 page Booklet",
  //   icon: "ni ni-book-bookmark text-orange",
  //   component: <Booklet24Page />,
  //   layout: "/admin",
  // },
  {
    path: "/32-page-booklet",
    name: "Scan Template",
    icon: "ni ni-books text-success",
    component: <Booklet32Page />,
    layout: "/admin",
  },
  {
    path: "/",
    name: "Settings",
    icon: "ni ni-settings-gear-65 text-primary",
    component: <Settings />,
    layout: "/admin",
  },





  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-yellow",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: <Profile />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: <Tables />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: <Login />,
  //   layout: "/auth",
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: <Register />,
  //   layout: "/auth",
  // },
];
export default routes;
