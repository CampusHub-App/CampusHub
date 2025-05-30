import { useEffect, useState } from "react";

const PopUpGagal = ({ isVisible, onClose, message }) => {
  const [isEntering, setIsEntering] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const enterTimer = setTimeout(() => {
        setIsEntering(true);
      }, 10);
      const exitTimer = setTimeout(() => {
        handleClose();
      }, 2000);
      return () => {
        clearTimeout(enterTimer);
        clearTimeout(exitTimer);
      };
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsEntering(false);
      setIsExiting(false);
      onClose();
    }, 700);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-all ${
        isExiting
          ? "opacity-0 duration-700"
          : isEntering
          ? "opacity-100 duration-700"
          : "opacity-0"
      }`}
    >
      <div
        className={`absolute inset-0 bg-black transition-all ${
          isExiting
            ? "opacity-0 duration-700"
            : isEntering
            ? "opacity-30 duration-700"
            : "opacity-0"
        }`}
        onClick={handleClose}
      ></div>

      <div
        className={`relative booking w-[397px] h-[437px] px-6 py-6 mx-8 bg-white shadow-lg rounded-2xl flex flex-col justify-center gap-4 transition-all ${
          isExiting
            ? "opacity-0 scale-90 duration-700"
            : isEntering
            ? "opacity-100 scale-100 duration-700"
            : "opacity-0 scale-50 duration-700"
        }`}
      >
        <div className="unique-code-output flex justify-center items-center">
          <div
            className={`relative w-32 h-32 flex items-center justify-center rounded-full border-4 transition-all duration-500 ${
              isEntering
                ? "bg-green-400 border-green-400 animate-bg-expand"
                : "bg-transparent border-gray-400"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="none"
              stroke="white"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`w-16 h-16 transform transition-all duration-500 ${
                isEntering
                  ? "opacity-100 animate-check-in"
                  : "opacity-0 scale-0"
              }`}
            >
              <path d="M5 16l8 8L28 4" />
            </svg>
          </div>
        </div>
        <div className="confirmation-message flex flex-col items-center py-4">
          <span className="font-medium text-[24px] text-center justify-center py-2 text-green-500">
            Pemesanan Berhasil!
          </span>
        </div>
      </div>
    </div>
  );
};

export default PopUpGagal;