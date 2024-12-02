import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Poster from "../../../assets/Poster.svg";
import Ellipse from "../../../assets/Ellipse.svg";
import "../DescriptionPageCancel/DescriptionPageCancel.css";

const DescriptionPageCancel = () => {
  const [eventData, setEventData] = useState(null);
  const [isCrossVisible, setIsCrossVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageAnimation, setPageAnimation] = useState("page-enter");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch("https://your-api-url.com/event");
        if (!response.ok) {
          throw new Error("Failed to fetch event data");
        }
        const data = await response.json();
        setEventData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching event data:", error);
        setError("Failed to load event data. Please try again later.");
        setLoading(false);
      }
    };

    fetchEventData();
    setTimeout(() => {
      setIsCrossVisible(true);
    }, 1000);
  }, []);

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
    <div className="detail-event min-h-screen pt-10 px-4 lg:mx-20">
      <div className={`container ${pageAnimation}`}>
        <div className="breadcrumb pt-auto flex ml-2 pb-10 text-sm lg:text-base">
          <ol className="list-none flex text-black text-medium">
            <li>
              <Link to="/my-events" className="hover:underline">
                MyEvents
              </Link>
            </li>
            <li className="mx-2"> &gt; </li>
            <li>
              <Link to="/description-registered" className="hover:underline">
                Registered
              </Link>
            </li>
          </ol>
        </div>
        <div className="content-box flex flex-col lg:flex-row">
          <div className="PosterEvent w-full lg:w-1/2 h-60 lg:h-auto">
            <img
              className="w-full h-full object-cover rounded-2xl shadow-lg brightness-50"
              src={eventData?.poster || Poster}
              alt="Poster Event"
            />
          </div>
          <div className="description text-left mt-6 lg:mt-0 lg:ml-8 lg:w-1/2">
            <span className="bg-customBlue font-regular px-4 py-1 rounded-full text-white text-[12px] lg:text-[14px]">
              {eventData?.type || "Webinar"}
            </span>
            <h1 className="font-bold text-[20px] lg:text-[32px] py-4">
              {eventData?.title || "How To Maximize Our Foreign Language Skills"}
            </h1>
            <div className="border-b-2 border-[#003266] w-full lg:w-[486px] my-4"></div>
            <div className="flex gap-2 items-center text-sm lg:text-base">
              <img
                src="src/assets/Calendar.svg"
                alt="Calendar"
                className="w-5 h-5 lg:w-8 lg:h-8"
              />
              <span>{eventData?.date || "12 Februari 2024"}</span>
              <span className="ml-auto">{eventData?.time || "19.00-21.00 WIB"}</span>
            </div>
            <div className="flex gap-2 items-center mt-4 text-sm lg:text-base">
              <i className="ri-map-pin-2-fill text-lg lg:text-2xl"></i>
              <span>{eventData?.location || "Online"}</span>
              <img
                src="src/assets/chair.svg"
                alt="Seats"
                className="ml-auto w-5 h-5 lg:w-8 lg:h-8"
              />
              <span>{eventData?.seatsAvailable || 36} Kursi</span>
            </div>
            <div className="border-b-2 border-[#003266] w-full lg:w-[486px] my-4"></div>
            <div className="flex items-center gap-2">
              <img
                src={eventData?.lecturer?.profileImage || "src/assets/lecturer.svg"}
                alt="Profile"
                className="w-10 h-10 lg:w-12 lg:h-12"
              />
              <div>
                <span className="block font-semibold text-[14px] lg:text-[16px]">
                  {eventData?.lecturer?.name || "Sutarman Widiyanto"}
                </span>
                <span className="block text-[12px] lg:text-[14px]">
                  {eventData?.lecturer?.position || "Dosen Bahasa Inggris, Universitas Brawijaya"}
                </span>
              </div>
            </div>
            <div className="border-b-2 border-[#003266] w-full lg:w-[486px] my-4"></div>
            <p className="text-[14px] lg:text-[16px]">
              {eventData?.description || "Deskripsi event dummy..."}
            </p>
          </div>
          <div className="booking lg:w-4/12 h-full mt-8 lg:mt-0 lg:ml-8 px-6 py-6 bg-white shadow-lg rounded-2xl">
            <div className="unique-code-output flex justify-center items-center">
              <div
                className={`relative w-20 h-20 lg:w-32 lg:h-32 flex items-center justify-center rounded-full border-4 transition-all duration-1000 ${
                  isCrossVisible ? "bg-red-500 border-red-500" : "bg-transparent border-gray-400"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`w-10 h-10 lg:w-16 lg:h-16 transform transition-all duration-1000 ${
                    isCrossVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  }`}
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <div className="confirmation-message flex flex-col items-center py-4">
              <span className="font-medium text-[16px] lg:text-[20px]">
                Dibatalkan
              </span>
              <p className="text-[14px] lg:text-[16px] text-center">
                Kamu sudah membatalkan acara ini, segera daftar ulang atau cari acara serupa
              </p>
            </div>
            <button
              className="bg-customBlue w-full h-10 lg:h-11 rounded-lg text-[14px] lg:text-[16px] text-white"
              onClick={handleBack}
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 -z-10">
        <img src={Ellipse} alt="Background" className="w-40 lg:w-[300px]" />
      </div>
    </div>
  );
};

export default DescriptionPageCancel;
