import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchEvent, registerEventWithToken } from "./api";
import PopUpCheckout from "./components/PopUpCheckout";
import "./css/PreviewEvent.css";
import Calendar from "./assets/image/date.svg";
import Chair from "./assets/image/chair.svg";
import PopUpGagal from "./components/PopUpGagal";
import Navbar from "./components/Navbar";

const PreviewEvent = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [gagalPopup, setGagalPopup] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [registered, setRegistered] = useState(false);
  const navigate = useNavigate();

  const onCLose = () => {
    setGagalPopup(false);
  }
  
  // Fetch event data using the API service
  useEffect(() => {
    const loadEventData = async () => {
      try {
        const data = await fetchEvent(id);
        setEventData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadEventData();

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate(`/user/login?redirect=${encodeURIComponent(location.pathname)}`);
        return;
      }

      const data = await registerEventWithToken(id, token);
      setRegistered(data);
      setShowPopup(true);
      
      setTimeout(() => {
        navigate(`/my-events/${eventData.id}/kode-unik`);
      }, 2000);
    } catch (err) {
      setGagalPopup(true);
    }
  };

  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate(-2);
    }, 500);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!eventData) {
    return null;
  }

  return (
    <div className="preview-event h-screen relative">
      <Navbar />
      <div
        className={`pt-10 mx-4 lg:mx-20 preview-event-container ${isLoaded ? "loaded" : ""} ${
          isExiting ? "exiting" : ""
        }`}
      >
        <div className="breadcrumb pt-auto flex ml-2 pb-10">
          <ol className="list-none flex text-black text-medium">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li className="mx-2"> &gt; </li>
            <li>
              <Link
                to={
                  eventData.category_name === "Seminar"
                    ? "/seminar"
                    : eventData.category_name === "Webinar"
                    ? "/webinar"
                    : eventData.category_name === "Kuliah Tamu"
                    ? "/kuliah-tamu"
                    : eventData.category_name === "Sertifikasi"
                    ? "/sertifikasi"
                    : eventData.category_name === "Workshop"
                    ? "/workshop"
                    : "/home"
                }
                className="hover:underline"
              >
                {eventData.category_name}
              </Link>
            </li>
            <li className="mx-2"> &gt; </li>
            <li>
              <a href="" className="hover:underline">
                Booking
              </a>
            </li>
          </ol>
        </div>
        <div className="content-box flex flex-col lg:flex-row gap-8">
          <div className="event-description border-2 border-dashed border-black p-4 custom-dashed rounded-2xl lg:w-[1000px] w-full">
            <div className="event-detail flex flex-col lg:flex-row px-4">
              <div className="PosterEvent w-full lg:w-1/2 h-11/12">
                <img
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                  src={eventData.foto_event}
                  alt="Poster Event"
                />
              </div>
              <div className="description text-left mx-4 mt-4 lg:mt-0 lg:w-8/12 sm:w-full">
                <span className="bg-[#027FFF] font-regular px-8 py-1 rounded-full text-white text-[14px]">
                  {eventData.category_name}
                </span>
                <h1 className="font-bold text-[32px] py-4">
                  {eventData.judul}
                </h1>
                <div className="border-b-2 border-[#003266] w-full my-4"></div>
                <div className="flex gap-2 ml-2">
                  <img src={Calendar} alt="Calendar" className="text-4xl" />
                  <div className="flex w-full">
                    <span className="font-medium text-[16px] mt-2">
                      {eventData.date}
                    </span>
                    <span className="font-medium text-[16px] mt-2 ml-auto">
                      {eventData.start_time} - {eventData.end_time}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 ml-1 my-4">
                  <i className="ri-map-pin-2-fill text-4xl"></i>
                  <span className="font-medium text-[16px] mt-2">
                    {eventData.tempat}
                  </span>
                  <img
                    src={Chair}
                    alt="Location"
                    className="text-4xl ml-auto"
                  />
                  <span className="font-medium text-[16px] mt-2">
                    {eventData.available_slot} Kursi
                  </span>
                </div>
                <div className="border-b-2 border-[#003266] w-full my-4"></div>
                <div className="lecturer flex gap-2 ml-2 items-center">
                  <img
                    src={eventData.foto_pembicara}
                    alt="Profile"
                    className="w-16 h-16 text-4xl sm:text-3xl rounded-full"
                  />
                  <div className="lecturername flex flex-col ml-4 gap-4">
                    <span className="font-semibold text-[20px]">
                      {eventData.pembicara}
                    </span>
                    <span className="text-regular text-[16px]">
                      {eventData.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b-2 border-[#003266] sm:w-full lg:w-[845px] my-4 mx-auto"></div>
            <div>
              <p className="eventdescription font-regular text-wrap px-8 text-[16px] block w-full lg:w-[900px]">
                {eventData.deskripsi}
              </p>
            </div>
          </div>
          <div className="booking w-full h-full px-6 py-6 mx-auto lg:mx-8 bg-white shadow-lg rounded-2xl flex flex-col lg:relative">
            <div className="sub-total flex gap-4">
              <span className="text-left my-2 font-medium text-[14px] pl-2 me-auto">
                Sub Total
              </span>
              <span className="text-right my-2 font-medium text-[14px] ms-auto">
                1 seat(s)
              </span>
            </div>
            <span className="event-type my-2 font-medium text-[14px] pl-2">
              {eventData.category_name}
            </span>
            <div className="border-b-2 border-[#003266] w-full my-4"></div>
            <div className="total flex gap-4">
              <span className="text-left my-2 font-semibold text-[18px] pl-2 me-auto">
                Total
              </span>
              <span className="text-right my-2 font-semibold text-[18px] ms-auto">
                1 seat(s)
              </span>
            </div>
            <div className="checkout flex flex-col">
              <button
                className="bg-[#027FFF] font-regular w-full h-11 my-2 rounded-lg text-medium text-white text-[16px]"
                onClick={handleBooking}
              >
                Checkout
              </button>
              <button
                className="bg-white border-2 border-[#027FFF] font-regular w-full h-11 my-2 rounded-lg text-medium text-[#027FFF] text-[16px]"
                onClick={handleExit}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <PopUpCheckout
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        onConfirm={() => {}}
      />
      <PopUpGagal
        isOpen={gagalPopup}
        onClose={onCLose}
        message="Gagal melakukan booking. Silakan coba lagi."
      />
    </div>
  );
};

export default PreviewEvent;