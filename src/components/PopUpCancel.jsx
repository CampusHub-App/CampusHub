import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PopUpCancel = ({ setShowPopUp, bookingId }) => {
  const bookingRef = useRef(null);
  const [isExiting, setIsExiting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bookingRef.current && !bookingRef.current.contains(event.target)) {
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
      setShowPopUp(false);
    }, 600);
  };

  const handleCancelBooking = () => {
    navigate("/description-cancel");

  const handleCancelBooking = async () => {
    setIsProcessing(true); 
    try {
      const response = await fetch(`https://your-backend-api.com/bookings/${bookingId}/cancel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        navigate("/descriptionpagecancel");
      } else {
        console.error("Pembatalan gagal:", await response.text());
      }
    } catch (error) {
      console.error("Error saat membatalkan:", error);
    } finally {
      setIsProcessing(false);
    }
  }
  };

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
        className={`relative booking w-[428px] h-[453px] px-6 py-6 mx-8 bg-white shadow-lg rounded-2xl flex flex-col justify-center gap-4 ${
          isExiting ? "animate-popup-fade-out" : "animate-popup-fade-in"
        }`}
      >
        <div className="confirmation-message flex flex-col items-center">
          <span className="font-medium text-[32px] text-center px-12 py-2">
            Apakah kamu yakin?
          </span>
          <p className="font-regular text-[20px] text-center px-10 py-2">
            Kamu akan membatalkan partisipasi dalam mengikuti acara ini, klik
            kembali jika tidak ingin membatalkan.
          </p>
        </div>
        <div className="myevent-button flex flex-col py-2">
          <button
            onClick={triggerClose}
            className="bg-customBlue font-regular w-full h-11 my-2 rounded-lg font-medium text-white text-[20px] shadow-md hover:shadow-lg transition duration-300"
          >
            Kembali
          </button>
          <button
            onClick={handleCancelBooking}
            disabled={isProcessing}
            className={`bg-transparent border-2 ${
              isProcessing ? "border-gray-400 text-gray-400" : "border-customBlue text-black"
            } font-medium w-full h-11 my-2 rounded-lg text-[20px] hover:bg-red-300 hover:border-red-500`}
          >
            {isProcessing ? "Memproses..." : "Batalkan"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpCancel;
