import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Ellipse from "../../assets/image/Ellipse.svg";
import Date from "../../assets/image/date.svg";
import Chair from "../../assets/image/chair.svg";
import "../../styles/DetailEvent.css";
import Navbar from "../../components/Navbar";
import location from "../../assets/image/location.svg";
import { fetchEvent } from "../../services/api";
import clock from "../../assets/image/clock.svg";

const storage = import.meta.env.VITE_STORAGE_BASE_URL + "/";

const DetailEvent = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const data = await fetchEvent(id);
        setEventData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEventData();

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate(`/events/${eventData.id}/preview`);
    }, 500);
  };

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
    <div className="detail-event h-screen">
      <Navbar />

      <div
        className={`detail-event-container ${isLoaded ? "loaded" : ""} ${
          isExiting ? "exiting" : ""
        } [1024px] pt-10 mx-4 lg:mx-20`}
      >
        <div className="breadcrumb pt-auto flex ml-2 pb-10">
          <ol className="list-none flex text-black text-medium">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li className="mx-2"> &gt; </li>
            <li>
              <Link
                to={
                  eventData.category_name === "Seminar"
                    ? "/seminar"
                    : eventData.category_name === "Webinar"
                    ? "/webinar"
                    : eventData.category_name === "Kuliah Tamu"
                    ? "/kuliah-tamu"
                    : eventData.category_name === "Sertifikasi"
                    ? "/sertifikasi"
                    : eventData.category_name === "Workshop"
                    ? "/workshop"
                    : "/home"
                }
                className="hover:underline"
              >
                {eventData.category_name}
              </Link>
            </li>
          </ol>
        </div>        <div className="content-box flex flex-col md:flex-row">
          <div className="PosterEvent w-full md:w-5/12 h-1/2">
            <img
              className="w-full h-full object-cover rounded-2xl shadow-lg"
              src={storage + eventData.foto_event}
              alt="Poster Event"
            />
          </div>
          <div className="description text-left mx-8 mt-4 md:mt-0 md:ml-8 w-1/2">
            <span className="bg-[#027FFF] font-regular px-8 py-1 rounded-full text-white text-[14px] sm:text-[12px]">
              {eventData.category_name}
            </span>
            <h1 className="font-bold text-[32px] py-4 sm:text-[24px]">
              {eventData.judul}
            </h1>            <div className="border-b-2 border-[#003266] w-full my-4"></div>
              {/* Event Details Grid */}
            <div className="event-details grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">{/* Date and Time Row */}
              <div className="detail-item flex items-center gap-3">
                <div className="icon-wrapper flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg flex-shrink-0">
                  <img src={Date} alt="Calendar" className="w-5 h-5 object-contain" />
                </div>
                <div className="detail-content">
                  <p className="text-sm text-gray-500 font-medium">Tanggal</p>
                  <p className="font-semibold text-[16px] sm:text-[14px] text-gray-800">
                    {eventData.date}
                  </p>
                </div>
              </div>

              <div className="detail-item flex items-center gap-3">
                <div className="icon-wrapper flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg flex-shrink-0">
                  <img src={clock} alt="Clock" className="w-5 h-5 object-contain" />
                </div>
                <div className="detail-content">
                  <p className="text-sm text-gray-500 font-medium">Waktu</p>
                  <p className="font-semibold text-[16px] sm:text-[14px] text-gray-800">
                    {eventData.start_time} - {eventData.end_time}
                  </p>
                </div>
              </div>{/* Location and Capacity Row */}
              <div className="detail-item flex items-center gap-3">
                <div className="icon-wrapper flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg flex-shrink-0">
                  <img src={location} alt="Location" className="w-5 h-5 object-contain" />
                </div>
                <div className="detail-content">
                  <p className="text-sm text-gray-500 font-medium">Lokasi</p>
                  <p className="font-semibold text-[16px] sm:text-[14px] text-gray-800">
                    {eventData.tempat}
                  </p>
                </div>
              </div>

              <div className="detail-item flex items-center gap-3">
                <div className="icon-wrapper flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg flex-shrink-0">
                  <img src={Chair} alt="Capacity" className="w-5 h-5 object-contain" />
                </div>
                <div className="detail-content">
                  <p className="text-sm text-gray-500 font-medium">Kapasitas</p>
                  <p className="font-semibold text-[16px] sm:text-[14px] text-gray-800">
                    {eventData.available_slot} Kursi Tersedia
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-b-2 border-[#003266] w-full my-4"></div>            <div className="lecturer flex gap-2 ml-2 w-auto">
              <img
                src={storage + eventData.foto_pembicara}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="lecturername flex flex-col ml-4 gap-2 justify-center">
                <span className="font-semibold text-[16px] sm:text-[14px]">
                  {eventData.pembicara}
                </span>
                <span className="text-regular text-[14px] sm:text-[12px]">
                  {eventData.role}
                </span>
              </div>
            </div>
            <div className="border-b-2 border-[#003266] w-full my-4"></div>
            <div>
              <p className="eventdescription font-regular text-wrap text-[16px] sm:text-[14px] block w-full max-w-[486px]">
                {eventData.deskripsi}
              </p>
            </div>
          </div>
          <div className="booking w-full md:w-4/12 h-36 px-6 mx-auto bg-white shadow-lg rounded-2xl flex flex-col mt-4 md:mt-0">
            <h1 className="text-left my-4 font-semibold text-[20px] sm:text-[18px] pl-2 lg:text-left sm:text-center ">
              Pesan Sekarang!
            </h1>
            <button
              className="bg-[#027FFF] font-regular w-full h-11 my-4 rounded-lg text-medium text-white text-[16px] sm:text-[14px]"
              onClick={handleExit}
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

export default DetailEvent;