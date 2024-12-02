import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Ellipse from '../../../assets/Ellipse.svg';
import Ellipse2 from '../../../assets/Ellipse2.svg';
import "../KodeUnik/KodeUnik.css";

const KodeUnik = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(true);
  const [fadeClass, setFadeClass] = useState("fade-in");
  const navigate = useNavigate();
  
  useEffect(() => {
    setTimeout(() => {
      const uniqueCode = "1234";
  
      if (uniqueCode && uniqueCode.length === 4) {
        setCode(uniqueCode.split(""));
        localStorage.setItem("uniqueCode", uniqueCode);
      } else {
        setCode(["", "", "", ""]);
      }
  
      setLoading(false);
    }, 1000);
  }, []);
  
  useEffect(() => {
    fetch('https://api.example.com/get-ticket-code')
      .then(response => response.json())
      .then(data => {
        const uniqueCode = data.ticketCode;
        if (uniqueCode && uniqueCode.length === 4) {
          setCode(uniqueCode.split(""));
        } else {
          setCode(["", "", "", ""]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching ticket code:', error);
        setLoading(false);
      });
  }, []);
  
  const handleNavigation = () => {
    setFadeClass("fade-out");
    
    setTimeout(() => {
      navigate("/my-events");
    }, 1000); 
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader w-16 h-16 border-4 border-customBlue border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-4 text-lg font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="unique-code h-screen sm:h-[1024px] mx-4 sm:mx-12 lg:mx-20 flex items-center justify-center" >
      <div className={`container w-full sm:w-3/4 lg:w-1/2 h-auto sm:h-11/12 py-6 bg-white shadow-lg rounded-2xl flex flex-col items-center ${fadeClass}`}>
        <div className="content-box flex flex-col items-center py-8 px-6 sm:px-14">
          <h1 className="font-semibold text-[32px] sm:text-[40px] lg:text-[48px] text-center py-2">Kode Tiket Anda</h1>
          <p className="font-regular text-[14px] sm:text-[16px] lg:text-[16px] text-center py-4 sm:py-8">
            Tunjukkan kode ini kepada panitia saat acara sebagai bukti pemesanan tiket Anda. Simpan kode dengan baik dan pastikan Anda siap menunjukkannya saat diminta.
          </p>
          
          <div className="unique-code bg-customBlue w-full sm:w-11/12 lg:w-11/12 h-full flex flex-col mb-4 items-center px-2 sm:px-12 py-4 sm:py-6 rounded-xl items-center">
            <div className="unique-code-output w-full flex gap-4 sm:gap-6 px-4">
              {code.map((char, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={char}
                  readOnly
                  className="w-14 sm:w-16 lg:w-20 h-16 sm:h-20 lg:h-24 text-center text-[24px] sm:text-[32px] lg:text-2xl font-bold border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
          </div>

          <div className="border-t-2 border-[#003266] w-10/12 my-6 sm:my-12"></div>
          <button
            className="bg-transparent border-2 border-customBlue font-regular w-3/4 sm:w-1/2 lg:w-1/2 h-10 sm:h-11 my-8 sm:my-16 rounded-lg text-medium text-black text-[14px] sm:text-[16px]"
            onClick={handleNavigation}
          >
            My Events
          </button>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 -z-10">
        <img
          src={Ellipse}
          alt="Background"
          className="w-[200px] sm:w-[50px] lg:w-[300px]"
        />
      </div>
      <div className="fixed bottom-0 right-0 -z-10">
        <img
          src={Ellipse2}
          alt="Background"
          className="w-[200px] sm:w-[50px] lg:w-[300px]"
        />
      </div>
    </div>
  );
};

export default KodeUnik;
