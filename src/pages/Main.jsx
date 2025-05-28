import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import '../styles/App.css';
import 'animate.css';
import 'remixicon/fonts/remixicon.css';

import Welcome from './user/Welcome.jsx';
import LoginPeserta from './user/LoginPeserta.jsx';
import ErrorPage from './user/ErrorPage.jsx';
import HomePage from './user/HomePage.jsx';
import WebinarPage from './user/Webinar.jsx';
import SeminarPage from './user/Seminar.jsx';
import SertifikasiPage from './user/Sertifikasi.jsx';
import WorkshopPage from './user/Workshop.jsx';
import KuliahTamuPage from './user/KuliahTamu.jsx';
import MyEvents from './user/MyEvents.jsx';
import ProfilePagePersonalInfo from './user/ProfilePage.jsx';
import ProfilePagePassword from './user/ProfilePagePassword.jsx';
import MyEventStatusPage from './user/MyEventStatusPage.jsx';
import PreviewEvent from './user/PreviewEvent.jsx';
import DetailEvent from './user/DetailEvent.jsx';
import KodeUnik from './user/KodeUnik.jsx';
import SignInPeserta from './user/SignInPeserta.jsx';

import AdminPage from './admin/HomePage.jsx';
import UploadEvent from './admin/UploadEvent.jsx';
import LoginAdmin from './admin/LoginAdmin.jsx';
import MyAdmin from './admin/MyEvents.jsx';
import PreviewPage from './admin/PreviewPage.jsx';
import MyParticipants from './admin/MyParticipants.jsx';
import EditEvent from './admin/EditEvent.jsx';
import PreviewEdit from './admin/PreviewEdit.jsx';
import CheckIn from './admin/CheckInPage.jsx';

const getUserData = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

const isAdmin = () => {
  const user = getUserData();
  return user?.is_admin === true;
};

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
    element: isAdmin() ? <AdminPage /> : <HomePage />,
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
    element: isAdmin() ? <MyAdmin /> : <MyEvents />,
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