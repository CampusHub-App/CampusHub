import { useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cancelRegistration } from "../services/api";

const PopUpCancel = ({ setShowPopUp, bookingId }) => {
  const bookingRef = useRef(null);
  const { id } = useParams();
  const [isExiting, setIsExiting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [gagal, setGagal] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setIsVisible(true);

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

  const handleCancelBooking = async () => {
    setIsProcessing(true);
    const accessToken = localStorage.getItem("token");

    if (!accessToken) {
      console.error("No access token found.");
      setIsProcessing(false);
      return;
    }

    try {
      await cancelRegistration(id, accessToken);

      window.location.reload();    } catch (error) {
      setGagal(true);
      setMessage(error.data || "Koneksi Timeout, Silahkan Coba Lagi");
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div
      className={`popup-container ${isExiting ? "exiting" : ""}`}
    >
      {gagal ? (
        <div
          className={`fixed inset-0 flex items-center justify-center transition-all ${isExiting
              ? "opacity-0 duration-700"
              : isVisible
                ? "opacity-100 duration-700"
                : "opacity-0"
            }`}
        >
          <div
            className={`absolute inset-0 bg-black transition-all ${isExiting
                ? "opacity-0 duration-700"
                : isVisible
                  ? "opacity-30 duration-700"
                  : "opacity-0"
              }`}
          ></div>

          <div
            ref={bookingRef}
            className={`relative booking w-[428px] h-[453px] px-6 py-6 mx-8 bg-white shadow-lg rounded-2xl flex flex-col justify-center gap-4 transition-all ${isExiting
                ? "opacity-0 scale-90 duration-700"
                : isVisible
                  ? "opacity-100 scale-100 duration-700"
                  : "opacity-0 scale-50 duration-700"
              }`}
          >
            <div className="flex flex-col items-center animate__animated animate__shakeX">
              <div className="relative p-4 border-4 border-red-600 rounded-full animate-pulse">
                <svg
                  className="h-24 w-24 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <span className="mt-4 font-medium text-[20px] text-center text-red-500">
                {message || "Koneksi Timeout, Silahkan Coba Lagi"}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`fixed inset-0 flex items-center justify-center transition-all ${isExiting
              ? "opacity-0 duration-700"
              : isVisible
                ? "opacity-100 duration-700"
                : "opacity-0"
            }`}
        >
          <div
            className={`absolute inset-0 bg-black transition-all ${isExiting
                ? "opacity-0 duration-700"
                : isVisible
                  ? "opacity-30 duration-700"
                  : "opacity-0"
              }`}
          ></div>

          <div
            ref={bookingRef}
            className={`relative booking w-[428px] h-[453px] px-6 py-6 mx-8 bg-white shadow-lg rounded-2xl flex flex-col justify-center gap-4 transition-all ${isExiting
                ? "opacity-0 scale-90 duration-700"
                : isVisible
                  ? "opacity-100 scale-100 duration-700"
                  : "opacity-0 scale-50 duration-700"
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
                className="bg-[#027FFF] font-regular w-full h-11 my-2 rounded-lg font-medium text-white text-[20px] shadow-md hover:shadow-lg transition duration-300"
              >
                Kembali
              </button>
              <button
                onClick={handleCancelBooking}
                disabled={isProcessing}
                className={`bg-transparent border-2 ${isProcessing
                    ? "border-gray-400 text-gray-400"
                    : "border-[#027FFF] text-black"
                  } font-medium w-full h-11 my-2 rounded-lg text-[20px] hover:bg-red-300 hover:border-red-500 flex items-center justify-center`}
              >
                {isProcessing ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-400"></div>
                ) : (
                  "Batalkan"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopUpCancel;