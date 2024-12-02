import React, { useState, useEffect, useRef } from 'react';

const PopUpUpdate = ({ triggerClose, setShowPopUp }) => {
  const [isCheckVisible, setIsCheckVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const bookingRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bookingRef.current && !bookingRef.current.contains(event.target)) {
        setIsExiting(true);
        setTimeout(() => triggerClose(), 600);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [triggerClose]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isExiting ? "animate-overlay-fade-out" : "animate-overlay-fade-in"
      }`}
    >
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-600 ${
          isExiting ? "opacity-0" : "opacity-50"
        }`}
      ></div>

      <div
        ref={bookingRef}
        className={`relative booking w-[450px] h-[500px] px-6 py-6 mx-8 bg-white shadow-lg rounded-2xl flex flex-col justify-center gap-4 ${
          isExiting ? "animate-popup-fade-out" : "animate-popup-fade-in"
        }`}
      >
        <div className="unique-code-output flex justify-center items-center">
          <div
            className={`relative w-40 h-40 flex items-center justify-center rounded-full border-4 transition-all duration-500 ${
              isCheckVisible ? "bg-green-400 border-green-400 animate-bg-expand" : "bg-transparent border-gray-400"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 49 50"
              fill="none"
              stroke="white"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`w-20 h-20 transform transition-all duration-500 ${
                isCheckVisible ? "opacity-100 animate-check-in" : "opacity-0 scale-0"
              }`}
            >
              <path
                d="M4 24l16 16L44 8"
                className="checkmark"
              />
            </svg>
          </div>
        </div>
        <div className="confirmation-message flex flex-col items-center py-4">
          <span className="font-medium text-[24px] text-center justify-center px-24 py-2">
            Data berhasil disimpan!
          </span>
        </div>
        <div className="myevent-button flex flex-col">
          <button
            className="bg-customBlue font-regular w-full h-11 my-2 rounded-lg font-medium text-white text-[20px] shadow-md hover:shadow-lg transition duration-300"
            onClick={() => setShowPopUp(false)}
          >
            Kembali
          </button>
          <button
            className="bg-transparent border-2 border-customBlue font-medium w-full h-11 my-2 rounded-lg text-medium text-black text-[20px] hover:bg-customBlue hover:border-white hover:text-white shadow-md hover:shadow-lg transition duration-300"
            onClick={() => {
              setIsExiting(true);
              setTimeout(() => triggerClose(), 600);
            }}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpUpdate;
