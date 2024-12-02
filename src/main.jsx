import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import "./index.css";
import App from "./App.jsx";
import "remixicon/fonts/remixicon.css";
import React from 'react'

import Welcome from './pages/user/Welcome.jsx'
import Signinpeserta from './pages/user/Signinpeserta.jsx'
import Loginpeserta from './pages/user/Loginpeserta.jsx'
import Errorpage from './pages/user/Errorpage.jsx'
import Homepage from './pages/user/Homepage.jsx'
import Landingpage from './pages/user/Landingpage.jsx'
import Webinarpage from './pages/user/Detailevent.jsx'
import Adminpage from './pages/admin/Homepage.jsx'
import Uploadevent from './pages/admin/Uploadevent.jsx'
import Updateevent from './pages/admin/Updateevent.jsx'
import Loginadmin from './pages/admin/Loginadmin.jsx'
import Cardpage from './components/Cardpage.jsx'


const router = createBrowserRouter([
  {
    path: "/Welcome",
    element: <Welcome/>,
    
  },
  {
    path: "/Homepage",
    element: <Homepage/>,
    
  },
  {
    path: "/Signinpeserta",
    element: <Signinpeserta/>,
  },
  {
    path:"/Loginpeserta",
    element: <Loginpeserta/>,
  },
  {
    
    path:"/",
    element: <Landingpage/>,
    errorElement: <Errorpage/>,
  },
  {
    path:"/Webinar",
    element: <Webinarpage/>
  },
  {
    path:"/Admin",
    element:<Adminpage/>
  },
  {
    path:"/Upload",
    element:<Uploadevent/>,
  },
  {
    path:"/Update",
    element:<Updateevent/>
  },
  {
    path: "/Loginadmin",
    element:<Loginadmin/>
  },
 
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
