import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PreviewEvent from "./pages/user/PreviewEvent/PreviewEvent";
import DescriptionPageRegistered from "./pages/user/DescriptionPageRegistered/DescriptionPageRegistered";
import DescriptionPageCancel from "./pages/user/DescriptionPageCancel/DescriptionPageCancel";
import KodeUnik from "./pages/user/KodeUnik/KodeUnik";
import MyEvents from "./pages/user/Myevents/MyEvents";
import ProfilePagePersonalInfo from "./pages/user/ProfilePagePersonalInfo/ProfilePagePersonalInfo";
import ProfilePagePersonalInfoEO from "./pages/event-organizer/ProfilePagePersonalInfoEO/ProfilePagePersonalInfoEO";
import ProfilePagePassword from "./pages/user/ProfilePagePassword/ProfilePagePassword";
import ProfilePagePasswordEO from "./pages/event-organizer/ProfilePagePasswordEO/ProfilePagePasswordEO"
import MyEventsEO from "./pages/event-organizer/MyEventsEO/MyEventsEO";
import PreviewEventEO from "./pages/event-organizer/PreviewEventEO/PreviewEventEO";
import Myparticipans from "./pages/event-organizer/MyParticipans/MyParticipans";
import PopUpCancel from "./components/PopUpCancel";
import PopUpCheckout from "./components/PopUpCheckout";
import PopUpUpdate from "./components/PopUpUpdate";
import PopUpUpload from "./components/PopUpUpload";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
      <Route path="/detail-events/:eventId" element={<DetailEvents />} />
        <Route path="/preview-event" element={<PreviewEvent />} />
        <Route path="/preview-eventEO" element={<PreviewEventEO />} />
        <Route path="/description-registered" element={<DescriptionPageRegistered />} />
        <Route path="/description-cancel" element={<DescriptionPageCancel />} />
        <Route path="/kode-unik" element={<KodeUnik />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/my-eventsEO" element={<MyEventsEO />} />
        <Route path="/my-participants" element={<Myparticipans />} />
        <Route path="/profile-info" element={<ProfilePagePersonalInfo />} />
        <Route path="/profile-infoEO" element={<ProfilePagePersonalInfoEO />} />
        <Route path="/profile-password" element={<ProfilePagePassword />} />
        <Route path="/profile-passwordEO" element={<ProfilePagePasswordEO />} />
        <Route path="/popup-cancel" element={<PopUpCancel />} />
        <Route path="/popup-checkout" element={<PopUpCheckout />} />
        <Route path="/popup-update" element={<PopUpUpdate />} />
        <Route path="/popup-upload" element={<PopUpUpload />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
