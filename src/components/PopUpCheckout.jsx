import React, { useState } from 'react';

const PopUpCheckout = () => {
  const [isCheckVisible, setIsCheckVisible] = useState(true);

  return (
    <div className="popupcheckout fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="booking w-[397px] h-[437px] px-6 py-6 mx-8 bg-white shadow-lg rounded-2xl flex flex-col justify-center">
        <div className="unique-code-output flex justify-center items-center">
          <div
            className={`relative w-32 h-32 flex items-center justify-center rounded-full border-4 transition-all duration-500 ${
              isCheckVisible ? 'bg-green-400 border-green-400 animate-bg-expand' : 'bg-transparent border-gray-400'
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
                isCheckVisible ? 'opacity-100 animate-check-in' : 'opacity-0 scale-0'
              }`}
            >
              <path
                d="M5 16l8 8L28 4"
                className="checkmark"
              />
            </svg>
          </div>
        </div>
        <div className="confirmation-message flex flex-col items-center py-4">
          <span className="font-medium text-[24px] text-center justify-center py-2">Pemesananmu Berhasil!</span>
          <p className="font-regular text-[20px] text-center py-2 px-4">
            Tunjukan kode unik ini kepada panitia atau narahubung terkait
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopUpCheckout;
