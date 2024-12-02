import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import PopUpCheckout from '../../../components/PopUpCheckout';
import Ellipse2 from '../../../assets/Ellipse2.svg';
import "../PreviewEvent/PreviewEvent.css"

const PreviewEvent = () => {
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [seatsToBook, setSeatsToBook] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://campushub.web.id/api/events/1');
        if (!response.ok) {
          throw new Error('Failed to fetch event data');
        }
        const data = await response.json();

        setEventData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleBookEvent = () => {
    setLoading(true);

    const bookingResponse = new Promise((resolve) => setTimeout(resolve, 1000));

    bookingResponse.then(() => {
      setShowPopup(true);
      setLoading(false);

      setTimeout(() => {
        setShowPopup(false);
        navigate("/kode-unik");
      }, 2000);
    });
  };

  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate("/detail-events");
    }, 500);
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
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!eventData) {
    return null;
  }

  return (
    <div className="preview-event h-[1024px] pt-10 mx-4 lg:mx-20 relative">
      <div className={`preview-event-container ${isLoaded ? "loaded" : ""} ${isExiting ? "exiting" : ""}`}>
        <div className="breadcrumb pt-auto flex ml-2 pb-10">
          <ol className="list-none flex text-black text-medium">
            <li>
              <Link to="#" className="hover:underline">Home</Link>
            </li>
            <li className="mx-2"> &gt; </li>
            <li>
              <Link to="/" className="hover:underline">Webinar</Link>
            </li>
            <li className="mx-2"> &gt; </li>
            <li>
              <Link to="/preview-event" className="hover:underline">Booking</Link>
            </li>
          </ol>
        </div>
        <div className="content-box flex flex-col lg:flex-row gap-8">
          <div className="event-description border-2 border-dashed border-black p-4 custom-dashed rounded-2xl lg:w-[1000px] w-full">
            <div className="event-detail flex flex-col lg:flex-row px-4">
              <div className="PosterEvent w-full lg:w-2/5 h-11/12">
                <img
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                  src={eventData.foto_event}
                  alt="Poster Event"
                />
              </div>
              <div className="description text-left mx-4 mt-4 lg:mt-0 lg:w-8/12 sm:w-full">
                <span className="bg-customBlue font-regular px-8 py-1 rounded-full text-white text-[14px]">
                  {eventData.type}
                </span>
                <h1 className="font-bold text-[32px] py-4">{eventData.judul}</h1>
                <div className="border-b-2 border-[#003266] w-full my-4"></div>
                <div className="flex gap-2 ml-2">
                  <img src="src/assets/Calendar.svg" alt="Calendar" className="text-4xl" />
                  <div className="flex w-full">
                    <span className="font-medium text-[16px] mt-2">{eventData.join_date}</span>
                    <span className="font-medium text-[16px] mt-2 ml-auto">{eventData.time}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-1 my-4">
                  <i className="ri-map-pin-2-fill text-4xl"></i>
                  <span className="font-medium text-[16px] mt-2">{eventData.location}</span>
                  <img src="src/assets/chair.svg" alt="Location" className="text-4xl ml-auto" />
                  <span className="font-medium text-[16px] mt-2">{eventData.available_slot} Kursi</span>
                </div>
                <div className="border-b-2 border-[#003266] w-full my-4"></div>
                <div className="lecturer flex gap-2 ml-2 items-center">
                  <img
                    src={eventData.lecturer.profileImage}
                    alt="Profile"
                    className="text-4xl rounded-full"
                  />
                  <div className="lecturername flex flex-col ml-4 gap-4">
                    <span className="font-semibold text-[20px]">
                      {eventData.lecturer.name}
                    </span>
                    <span className="text-regular text-[16px]">
                      {eventData.lecturer.position}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b-2 border-[#003266] sm:w-full lg:w-[845px] my-4 mx-auto"></div>
            <div>
              <p className="eventdescription font-regular text-wrap px-8 text-[16px] block w-full lg:w-[900px]">
                {eventData.description}
              </p>
            </div>
          </div>
          <div className="booking w-full h-full px-6 py-6 mx-auto lg:mx-8 bg-white shadow-lg rounded-2xl flex flex-col lg:relative">
            <div className="sub-total flex gap-4">
              <span className="text-left my-2 font-medium text-[14px] pl-2 me-auto">
                Sub Total
              </span>
              <span className="text-right my-2 font-medium text-[14px] ms-auto">
                {seatsToBook} seat(s)
              </span>
            </div>
            <span className="event-type my-2 font-medium text-[14px] pl-2">Webinar</span>
            <div className="border-b-2 border-[#003266] w-full my-4"></div>
            <div className="total flex gap-4">
              <span className="text-left my-2 font-semibold text-[18px] pl-2 me-auto">Total</span>
              <span className="text-right my-2 font-semibold text-[18px] ms-auto">
                {seatsToBook} seat(s)
              </span>
            </div>
            <div className="checkout flex flex-col">
              <button
                className="bg-customBlue font-regular w-full h-11 my-2 rounded-lg text-medium text-white text-[16px]"
                onClick={handleBookEvent}
                disabled={loading}
              >
                {loading ? "Memproses..." : "Pesan"}
              </button>
              <button
                className="bg-transparent border-2 border-customBlue font-regular w-full h-11 my-2 rounded-lg text-medium text-black text-[16px] hover:bg-red-300 hover:border-red-500"
                onClick={handleExit}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>
      {showPopup && <PopUpCheckout />}
      <div className="fixed bottom-0 right-0 -z-10">
        <img src={Ellipse2} alt="Background" className="w-[300px]" />
      </div>
      <div className="circle-animation"></div>
    </div>
  );
};

export default PreviewEvent;
