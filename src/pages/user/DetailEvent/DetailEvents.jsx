import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Poster from "../../../assets/Poster.svg";
import Ellipse from "../../../assets/Ellipse.svg";
import Lecturer from "../../../assets/lecturer.svg";
import "../DetailEvent/DetailEvent.css";

const DetailEvents = () => {
  const { eventId } = useParams(); // Tangkap parameter eventId dari URL
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://campushub.web.id/api/events/${eventId}/view`);
        if (!response.ok) {
          throw new Error("Failed to fetch event data");
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
  }, [eventId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader w-16 h-16 border-blue-500 border-t-transparent"></div>
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

  if (!eventData) {
    return null; 
  }

  return (
    <div className="detail-event h-[1024px] pt-10 mx-4 lg:mx-20">
      <div className={`detail-event-container ${isLoaded ? "loaded" : ""}`}>
        <div className="breadcrumb pt-auto flex ml-2 pb-10">
          <ol className="list-none flex text-black text-medium">
            <li>
              <Link to="#" className="hover:underline">
                Home
              </Link>
            </li>
            <li className="mx-2"> &gt; </li>
            <li>
              <Link to="/" className="hover:underline">
                {eventData.type}
              </Link>
            </li>
          </ol>
        </div>
        <div className="content-box flex flex-col md:flex-row">
          <div className="PosterEvent w-full md:w-1/2 h-1/2">
            <img
              className="w-full h-full object-cover rounded-2xl shadow-lg"
              src={eventData.poster || Poster}
              alt="Poster Event"
            />
          </div>
          <div className="description text-left mx-8 mt-4 md:mt-0 md:ml-8">
            <span className="bg-customBlue font-regular px-8 py-1 rounded-full text-white text-[14px] sm:text-[12px]">
              {eventData.type}
            </span>
            <h1 className="font-bold text-[32px] py-4 sm:text-[24px]">{eventData.title}</h1>
            <div className="border-b-2 border-[#003266] w-full my-4"></div>
            <div className="flex gap-2 ml-2">
              <img src="src/assets/Calendar.svg" alt="Calendar" className="text-4xl sm:text-3xl" />
              <span className="font-medium text-[16px] sm:text-[14px] mt-2">{eventData.date}</span>
              <span className="font-medium text-[16px] sm:text-[14px] mt-2 ml-auto mr-2">{eventData.time}</span>
            </div>
            <div className="flex gap-2 ml-1 my-4">
              <i className="ri-map-pin-2-fill text-4xl sm:text-3xl"></i>
              <span className="font-medium text-[16px] sm:text-[14px] mt-2">{eventData.location}</span>
              <img src="src/assets/chair.svg" alt="Location" className="text-4xl sm:text-3xl ml-auto" />
              <span className="font-medium text-[16px] sm:text-[14px] mt-2 mr-2">{eventData.seatsAvailable} Kursi</span>
            </div>
            <div className="border-b-2 border-[#003266] w-full my-4"></div>
            <div className="lecturer flex gap-2 ml-2">
              <img src={eventData.lecturer.profileImage || Lecturer} alt="Profile" className="text-4xl sm:text-3xl" />
              <div className="lecturername flex flex-col ml-4">
                <span className="font-semibold text-[16px] sm:text-[14px]">{eventData.lecturer.name}</span>
                <span className="text-regular text-[14px] sm:text-[12px]">{eventData.lecturer.position}</span>
              </div>
            </div>
            <div className="border-b-2 border-[#003266] w-full my-4"></div>
            <div>
              <p className="eventdescription font-regular text-wrap text-[16px] sm:text-[14px] block w-full max-w-[486px]">
                {eventData.description}
              </p>
            </div>
          </div>
          <div className="booking w-full md:w-4/12 h-36 px-6 mx-auto bg-white shadow-lg rounded-2xl flex flex-col mt-4 md:mt-0">
            <h1 className="text-left my-4 font-semibold text-[20px] sm:text-[18px] pl-2">Pesan Sekarang!</h1>
            <button
              className="bg-customBlue font-regular w-full h-11 my-4 rounded-lg text-medium text-white text-[16px] sm:text-[14px]"
              onClick={() => navigate("/preview-event")}
            >
              Pesan
            </button>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 -z-10">
        <img src={Ellipse} alt="Background" className="w-[300px]" />
      </div>
    </div>
  );
};

export default DetailEvents;
