import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchEvent } from "../../services/api";
import Poster from "../../assets/image/Poster.svg";
import Ellipse from "../../assets/image/Ellipse.svg";
import Lecturer from "../../assets/image/lecturer.svg";
import "../../styles/DescriptionPageCancel.css";
import Date from "../../assets/image/date.svg";
import Chair from "../../assets/image/chair.svg";
import Location from "../../assets/image/location.svg";
import Navbar from "../../components/Navbar";

const storage = import.meta.env.VITE_STORAGE_BASE_URL;

const DescriptionPageAttend = () => {
  const [eventData, setEventData] = useState(null);
  const [isCrossVisible, setIsCrossVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageAnimation, setPageAnimation] = useState("page-enter");
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/welcome", { replace: true });
      return;
    }
    
    const loadEventData = async () => {
      try {
        const data = await fetchEvent(id);
        setEventData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadEventData();
    setTimeout(() => {
      setIsCrossVisible(true);
    }, 1000);
  }, [id, navigate]);

  const handleBack = () => {
    setPageAnimation("page-exit");
    setTimeout(() => navigate("/my-events"), 400);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader w-16 h-16 border-4 border-customBlue border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-4 text-lg font-medium">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-red-500 text-2xl font-semibold">Error</h1>
          <p className="text-red-700 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-event min-h-screen">
      <Navbar />
      <div className={`${pageAnimation} pt-10 px-8 lg:px-16 w-full`}>
        <div className="breadcrumb pt-auto flex pb-10 px-4">
          <ol className="list-none flex text-black text-medium">
            <li>
              <Link to="/my-events" className="hover:underline">
                MyEvents
              </Link>
            </li>
            <li className="mx-2"> &gt; </li>
            <li>
              <Link to="/my-events" state={{ activeTab: "Attended" }}>
                Attended
              </Link>
            </li>
          </ol>
        </div>
        <div className="content-box flex flex-col lg:flex-row gap-8 px-4 w-full">
          <div className="PosterEvent w-full lg:w-3/12">
            <img
              className="w-full object-cover rounded-2xl shadow-lg"
              src={`${storage}/${eventData.foto_event}`}
              alt="Poster Event"
            />
          </div>
          <div className="description text-left flex-1 max-w-full px-6">
            <span className="bg-[#027FFF] font-regular px-8 py-1 rounded-full text-white text-[14px] sm:text-[12px]">
              {eventData.category_name}
            </span>
            <h1 className="font-bold text-[32px] py-4 sm:text-[24px]">
              {eventData.judul}
            </h1>
            <div className="border-b-2 border-[#003266] w-full my-4"></div>
            
            {/* Event Details Grid */}
            <div className="event-details grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              {/* Date and Time Row */}
              <div className="detail-item flex items-start gap-3">
                <div className="icon-wrapper flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg flex-shrink-0">
                  <img src={Date} alt="Calendar" className="w-5 h-5 object-contain" />
                </div>
                <div className="detail-content">
                  <p className="text-sm text-gray-500 font-medium">Tanggal</p>
                  <p className="font-semibold text-[16px] sm:text-[14px] text-gray-800">
                    {eventData.date}
                  </p>
                </div>
              </div>

              <div className="detail-item flex items-start gap-3">
                <div className="icon-wrapper flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg flex-shrink-0">
                  <img src={Date} alt="Clock" className="w-5 h-5 object-contain" />
                </div>
                <div className="detail-content">
                  <p className="text-sm text-gray-500 font-medium">Waktu</p>
                  <p className="font-semibold text-[16px] sm:text-[14px] text-gray-800">
                    {eventData.start_time} - {eventData.end_time}
                  </p>
                </div>
              </div>

              {/* Location and Capacity Row */}
              <div className="detail-item flex items-start gap-3">
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

              <div className="detail-item flex items-start gap-3">
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
            <div className="lecturer flex gap-2 w-auto">
              <img
                src={`${storage}/${eventData.foto_pembicara}`}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="lecturername flex flex-col ml-4 gap-2 justify-center">
                <span className="font-semibold text-[16px] sm:text-[14px]">
                  {eventData.pembicara}
                </span>
                <span className="text-regular text-[14px] sm:text-[12px]">
                  {eventData.role}
                </span>
              </div>
            </div>
            <div className="border-b-2 border-[#003266] w-full my-4"></div>
            <div>
              <p className="eventdescription font-regular text-wrap text-[16px] sm:text-[14px] block w-full">
                {eventData.deskripsi}
              </p>
            </div>
          </div>

          <div className="booking w-full lg:w-3/12 h-fit px-6 py-6 bg-white shadow-lg rounded-2xl flex flex-col">
            {/* Attend Status Section */}
            <div className="attend-status-section mb-4">
              <div className="status-display bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-xl shadow-md">
                <div className="status-icon-container flex justify-center">
                  <div
                    className={`relative w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center rounded-full border-4 transition-all duration-1000 ${
                      isCrossVisible
                        ? "bg-white border-white"
                        : "bg-transparent border-green-200"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`w-8 h-8 lg:w-10 lg:h-10 text-green-500 transform transition-all duration-1000 ${
                        isCrossVisible
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-0"
                      }`}
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Status and Instructions */}
            <div className="confirmation-message flex flex-col items-center py-4 border-b border-gray-200">
              <div className="status-badge bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6">
                <span className="font-semibold text-[14px] lg:text-[16px]">
                  ✓ Telah Hadir
                </span>
              </div>
              <p className="font-regular text-[12px] lg:text-[14px] text-center text-gray-600 max-w-xs leading-relaxed">
                Selamat! Anda telah mengikuti event ini. Silahkan jelajahi event lainnya.
              </p>
            </div>

            {/* Action Button */}
            <div className="checkout flex flex-col pt-3">
              <button
                className="bg-[#027FFF] hover:bg-[#0066CC] font-medium w-full h-11 lg:h-12 rounded-lg text-white text-[14px] lg:text-[16px] transition-colors shadow-sm"
                onClick={handleBack}
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 -z-10">
        <img src={Ellipse} alt="Background" className="w-40 lg:w-[300px]" />
      </div>
    </div>
  );
};

export default DescriptionPageAttend;