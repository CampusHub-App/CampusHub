import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Poster from "../../../assets/Poster.svg";
import Ellipse from "../../../assets/Ellipse.svg";
import Lecturer from "../../../assets/lecturer.svg";
import PosterFigma from "../../../assets/Poster-figma.svg";
import LecturerUI from "../../../assets/Profile.svg";
import PopUpUpload from "../../../components/PopUpUpload";

const PreviewEventEO = () => {
  const [eventData, setEventData] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch("https://your-api-endpoint.com/event/1");
        if (!response.ok) {
          throw new Error("Failed to fetch event data");
        }
        const data = await response.json();
        setEventData(data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
    fetchEventData();
  }, []);

  const handleUploadClick = async () => {
    try {
      if (!eventData) return;

      const response = await fetch("https://your-api-endpoint.com/upload-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error("Error uploading event");
      }

      const result = await response.json();
      console.log("Event uploaded:", result);
      setShowPopUp(true);
    } catch (error) {
      console.error("Error uploading event:", error);
    }
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  const handlePageClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate("/");
    }, 600);
  };

  if (!eventData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader w-16 h-16 border-4 border-customBlue border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-4 text-lg font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="detail-event min-h-screen pt-10 lg:mx-20 mx-5 transition-all duration-500">
      <div className={`container ${isExiting ? "page-exit" : "page-enter"}`}>
        <div className="breadcrumb pt-auto flex ml-2 pb-10">
          <ol className="list-none flex text-black text-medium text-sm md:text-base">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li className="mx-2"> &gt; </li>
            <li>
              <a href="#" className="hover:underline">
                Upload Event
              </a>
            </li>
            <li className="mx-2"> &gt; </li>
            <li>
              <a href="#" className="hover:underline">
                Preview
              </a>
            </li>
          </ol>
        </div>
        <div className="content-box flex flex-wrap lg:flex-nowrap">
          <div className="PosterEvent w-full lg:w-1/2 h-auto">
            <img
              className="w-full h-full object-cover rounded-2xl shadow-lg"
              src={eventData.poster || Poster}
              alt="Poster Event"
            />
          </div>
          <div className="description text-left mt-6 lg:mt-0 lg:mx-8">
            <span className="bg-customBlue font-regular px-6 py-1 rounded-full text-white text-sm lg:text-base">
              {eventData.type}
            </span>
            <h1 className="font-bold text-2xl lg:text-[32px] py-4">
              {eventData.title}
            </h1>
            <div className="border-b-2 border-[#003266] w-full lg:w-[486px] my-4"></div>
            <div className="flex gap-2 ml-2">
              <img
                src="src/assets/Calendar.svg"
                alt="Calendar"
                className="w-6 lg:w-8"
              />
              <span className="font-medium text-sm lg:text-base mt-1 lg:mt-2">
                {eventData.date}
              </span>
              <span className="font-medium text-sm lg:text-base mt-1 lg:mt-2 ml-auto mr-6 lg:mr-12">
                {eventData.time}
              </span>
            </div>
            <div className="flex gap-2 ml-1 my-4">
              <i className="ri-map-pin-2-fill w-6 lg:w-8"></i>
              <span className="font-medium text-sm lg:text-base mt-1 lg:mt-2">
                {eventData.location}
              </span>
              <img
                src="src/assets/chair.svg"
                alt="Location"
                className="w-6 lg:w-8 ml-auto"
              />
              <span className="font-medium text-sm lg:text-base mt-1 lg:mt-2 mr-6 lg:mr-12">
                {eventData.seatsAvailable} Kursi
              </span>
            </div>
            <div className="border-b-2 border-[#003266] w-full lg:w-[486px] my-4"></div>
            <div className="lecturer flex gap-2 ml-2">
              <img
                src={eventData.lecturer.profileImage || Lecturer}
                alt="Profile"
                className="w-10 h-10 lg:w-12 lg:h-12"
              />
              <div className="lecturername flex flex-col ml-4">
                <span className="font-semibold text-sm lg:text-base">
                  {eventData.lecturer.name}
                </span>
                <span className="text-regular text-xs lg:text-sm">
                  {eventData.lecturer.position}
                </span>
              </div>
            </div>
            <div className="border-b-2 border-[#003266] w-full lg:w-[486px] my-4"></div>
            <div>
              <p className="eventdescription font-regular text-wrap text-sm lg:text-base block w-full max-w-[486px]">
                {eventData.description}
              </p>
            </div>
          </div>
          <div className="booking w-full lg:w-4/12 h-1/2 px-4 py-4 lg:px-6 lg:py-6 mx-auto bg-white shadow-lg rounded-2xl flex flex-col mt-6 lg:mt-0">
            <div className="checkout flex flex-col">
              <button
                className="bg-customBlue font-regular w-full h-10 lg:h-11 my-2 rounded-lg text-medium text-white text-sm lg:text-base"
                onClick={handleUploadClick}
              >
                Unggah
              </button>
              <button
                onClick={handlePageClose}
                className="bg-transparent border-2 border-customBlue font-regular w-full h-10 lg:h-11 my-2 rounded-lg text-medium text-black text-sm lg:text-base hover:bg-red-300 hover:border-red-500"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 -z-10">
        <img src={Ellipse} alt="Background" className="w-[200px] lg:w-[300px]" />
      </div>
      {showPopUp && <PopUpUpload onClose={handleClosePopUp} />}
    </div>
  );
};

export default PreviewEventEO;
