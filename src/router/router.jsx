import {
  createBrowserRouter,
} from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import LogIn from "../pages/Authentication/LogIn/LogIn";
import Register from "../pages/Authentication/Register/Register";



const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children:[
      {
        index:true,
        Component:Home
      }
    ]
  },
{
  path:"/",
  Component:AuthLayout,
  children:[
    {
      path:'login',
      Component:LogIn,
    },
    {
      path:'register',
      Component:Register,
    }
  ]
}
]);

export default router;