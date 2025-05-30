import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchEvent, registerEventWithToken } from "../../services/api";
import PopUpCheckout from "../../components/PopUpCheckout";
import "../../styles/PreviewEvent.css";
import Calendar from "../../assets/image/date.svg";
import Chair from "../../assets/image/chair.svg";
import Clock from "../../assets/image/clock.svg";
import Location from "../../assets/image/location.svg";
import PopUpGagal from "../../components/PopUpGagal";
import Navbar from "../../components/Navbar";
import { useLocation } from "react-router-dom";

const PreviewEvent = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [gagalPopup, setGagalPopup] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const API = import.meta.env.VITE_STORAGE_BASE_URL;

  const onCLose = () => {
    setGagalPopup(false);
  }
  
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
      setMessage(err.data || "Koneksi Timeout, Silahkan Coba Lagi");
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
          <div className="event-description border-2 border-dashed border-black pl-4 py-8 custom-dashed rounded-2xl lg:w-[1000px] w-full">
            <div className="event-detail flex flex-col lg:flex-row px-4">
              <div className="PosterEvent w-full lg:w-1/2 h-11/12 mr-4">
                <img
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                  src={`${API}/${eventData.foto_event}`}
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
                
                <div className="event-details grid grid-cols-1 sm:grid-cols-2 gap-6 ml-2">
                  <div className="detail-item flex items-center gap-3">
                    <div className="icon-wrapper flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg flex-shrink-0">
                      <img src={Calendar} alt="Date" className="w-5 h-5 object-contain" />
                    </div>
                    <div className="detail-content">
                      <p className="text-sm text-gray-500 font-medium">Tanggal</p>
                      <p className="font-semibold text-[16px] sm:text-[14px] text-gray-800">
                        {eventData.date}
                      </p>
                    </div>
                  </div>

                  <div className="detail-item flex items-center gap-3">
                    <div className="icon-wrapper flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg flex-shrink-0">
                      <img src={Clock} alt="Time" className="w-5 h-5 object-contain" />
                    </div>
                    <div className="detail-content">
                      <p className="text-sm text-gray-500 font-medium">Waktu</p>
                      <p className="font-semibold text-[16px] sm:text-[14px] text-gray-800">
                        {eventData.start_time} - {eventData.end_time}
                      </p>
                    </div>
                  </div>

                  <div className="detail-item flex items-center gap-3">
                    <div className="icon-wrapper flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg flex-shrink-0">
                      <img src={Location} alt="Location" className="w-5 h-5 object-contain" />
                    </div>
                    <div className="detail-content">
                      <p className="text-sm text-gray-500 font-medium">Lokasi</p>
                      <p className="font-semibold text-[16px] sm:text-[14px] text-gray-800">
                        {eventData.tempat}
                      </p>
                    </div>
                  </div>

                  <div className="detail-item flex items-center gap-3">
                    <div className="icon-wrapper flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg flex-shrink-0">
                      <img src={Chair} alt="Capacity" className="w-5 h-5 object-contain" />
                    </div>
                    <div className="detail-content">
                      <p className="text-sm text-gray-500 font-medium">Kapasitas</p>
                      <p className="font-semibold text-[16px] sm:text-[14px] text-gray-800">
                        {eventData.available_slot} Kursi Tersedia
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-b-2 border-[#003266] w-full my-4"></div>
                <div className="lecturer-container flex items-center py-4">
                  <div className="lecturer flex gap-2 items-center ml-2">
                    <img
                      src={`${API}/${eventData.foto_pembicara}`}
                      alt="Profile"
                      className="w-16 h-16 text-4xl sm:text-3xl rounded-full object-cover"
                    />
                    <div className="lecturername flex flex-col ml-4">
                      <span className="font-semibold text-base">
                        {eventData.pembicara}
                      </span>
                      <span className="text-regular text-sm text-gray-600">
                        {eventData.role}
                      </span>
                    </div>
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
          <div className="booking w-full max-w-md h-full px-6 py-6 mx-auto lg:mx-2 bg-white shadow-lg rounded-2xl flex flex-col lg:relative">
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
      {showPopup && (
        <PopUpCheckout
          isVisible={showPopup}
          onClose={() => setShowPopup(false)}
          onConfirm={() => {}}
        />
      )}
      {gagalPopup && (
        <PopUpGagal
          isVisible={gagalPopup}
          onClose={onCLose}
          message={message}
        />
      )}
    </div>
  );
};

export default PreviewEvent;