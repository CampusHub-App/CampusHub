import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const PopUpUpload = () => {
  const [isCheckVisible, setIsCheckVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const uploadRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (uploadRef.current && !uploadRef.current.contains(event.target)) {
        triggerClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const triggerClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsCheckVisible(false);
    }, 600);
  };

  const handleNavigate = () => {
    navigate("/my-eventsEO");
  };

  if (!isCheckVisible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isExiting ? "animate-overlay-fade-out" : "animate-overlay-fade-in"
      }`}
    ><div
    className={`absolute inset-0 bg-black transition-opacity duration-600 ${
        isExiting ? "opacity-0" : "opacity-50"
      }`}
    ></div>
     <div
        ref={uploadRef}
        className={`relative booking w-[450px] h-[500px] px-6 py-6 mx-8 bg-white shadow-lg rounded-2xl flex flex-col justify-center ${
          isExiting ? "animate-popup-fade-out" : "animate-popup-fade-in"
        }`}>
        <div className="flex justify-center items-center">
          <div
            className={`relative w-32 h-32 flex items-center justify-center rounded-full border-4 transition-all duration-500 ${
              isCheckVisible
                ? "bg-green-400 border-green-400 animate-bg-expand"
                : "bg-transparent border-gray-400"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 28"
              fill="none"
              stroke="white"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`w-16 h-16 transform transition-all duration-500 ${
                isCheckVisible ? "opacity-100 animate-check-in" : "opacity-0 scale-0"
              }`}
            >
              <path d="M5 16l8 8L28 4" className="checkmark" />
            </svg>
          </div>
        </div>
        <div className="confirmation-message flex flex-col items-center py-4">
          <span className="font-medium text-[32px] text-center justify-center px-8 py-2">
            Acaramu Berhasil Diunggah!
          </span>
          <p className="font-regular text-[20px] text-center py-2 px-8">
            Pantau partisipan acaramu dalam MyEvents untuk melihatnya!
          </p>
        </div>
        <div className="myevent-button">
          <button
            onClick={handleNavigate}
            className="bg-customBlue font-regular w-full h-11 my-2 rounded-lg font-medium text-white text-[20px]"
          >
            My Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpUpload;
