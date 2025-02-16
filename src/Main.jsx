import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import 'animate.css';
import React from 'react';
import 'remixicon/fonts/remixicon.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Welcome from './Welcome.jsx';
import LoginPeserta from './LoginPeserta.jsx';
import ErrorPage from './ErrorPage.jsx';
import HomePage from './HomePage.jsx';
import WebinarPage from './Webinar.jsx';
import SeminarPage from './Seminar.jsx';
import SertifikasiPage from './Sertifikasi.jsx';
import WorkshopPage from './Workshop.jsx';
import KuliahTamuPage from './KuliahTamu.jsx';
import AdminPage from './admin/HomePage.jsx';
import UploadEvent from './admin/UploadEvent.jsx';
import LoginAdmin from './admin/LoginAdmin.jsx';
import MyEvents from './MyEvents.jsx';
import ProfilePagePersonalInfo from './ProfilePage.jsx';
import ProfilePagePassword from './ProfilePagePassword.jsx';
import MyEventStatusPage from './MyEventStatusPage.jsx';
import PreviewEvent from './PreviewEvent.jsx';
import DetailEvent from './DetailEvent.jsx';
import KodeUnik from './KodeUnik.jsx';
import MyAdmin from './admin/MyEvents.jsx';
import PreviewPage from './admin/PreviewPage.jsx';
import SignInPeserta from './SignInPeserta.jsx';
import MyParticipants from './admin/MyParticipants.jsx';
import EditEvent from './admin/EditEvent.jsx';
import PreviewEdit from './admin/PreviewEdit.jsx';
import CheckIn from './admin/CheckInPage.jsx';

const user = JSON.parse(localStorage.getItem('user'));
const isAdmin = user?.is_admin === true;

const router = createBrowserRouter([
  {
    path: "/welcome",
    element: <Welcome />,
  },
  {
    path: "/user/register",
    element: <SignInPeserta />,
  },
  {
    path: "/user/login",
    element: <LoginPeserta />,
  },
  {
    path: "/",
    element: isAdmin ? <AdminPage /> : <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/webinar",
    element: <WebinarPage />,
  },
  {
    path: "/seminar",
    element: <SeminarPage />,
  },
  {
    path: "/kuliah-tamu",
    element: <KuliahTamuPage />,
  },
  {
    path: "/workshop",
    element: <WorkshopPage />,
  },
  {
    path: "/sertifikasi",
    element: <SertifikasiPage />,
  },
  {
    path: "/events/upload",
    element: <UploadEvent />,
  },
  {
    path: "/admin/login",
    element: <LoginAdmin />,
  },
  {
    path: "/my-events",
    element: isAdmin ? <MyAdmin /> : <MyEvents />,
  },
  {
    path: "/account/profile",
    element: <ProfilePagePersonalInfo />,
  },
  {
    path: "/account/password",
    element: <ProfilePagePassword />,
  },
  {
    path: "/my-events/:id/view",
    element: <MyEventStatusPage />,
  },
  {
    path: "/events/:id/preview",
    element: <PreviewEvent />,
  },
  {
    path: "/events/:id/view/",
    element: <DetailEvent />,
  },
  {
    path: "/my-events/:id/kode-unik",
    element: <KodeUnik />,
  },
  {
    path: "/events/preview",
    element: <PreviewPage />,
  },
  {
    path: "/my-events/:id/participants",
    element: <MyParticipants />,
  },
  {
    path: "/my-events/:id/edit",
    element: <EditEvent />,
  },
  {
    path: "/my-events/:id/preview",
    element: <PreviewEdit />,
  },
  {
    path: "/my-events/:id/check-in",
    element: <CheckIn />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
