import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Ellipse2 from "../../assets/image/Ellipse2.svg";
import "../../styles/DescriptionPageCancel.css";
import Date from "../../assets/image/date.svg";
import Chair from "../../assets/image/chair.svg";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import { updateEvent } from "../../services/api";

const PreviewEdit = () => {
  const [eventData, setEventData] = useState(null);
  const [pageAnimation, setPageAnimation] = useState("page-enter");
  const navigate = useNavigate();
  const { id } = useParams();
  const lokasi = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate(`/welcome?redirect=${encodeURIComponent(lokasi.pathname)}`);
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (!user.is_admin) {
        navigate("/", { replace: true });
        return;
      }
    }
  }, []);

  const categoryMap = {
    1: "Webinar",
    2: "Seminar",
    3: "Kuliah Tamu",
    4: "Workshop",
    5: "Sertifikasi",
  };

  const handleBack = () => {
    setPageAnimation("page-exit");
    setTimeout(() => window.history.back(), 400);
  };

  useEffect(() => {
    // If no event data is passed, handle fallback
    if (lokasi.state) {
      setEventData(lokasi.state);
    } else {
      navigate(`/my-events/${id}/edit`, { replace: true });
    }
  }, [lokasi.state, navigate]);

  if (!eventData) {
    navigate(`/my-events/${id}/edit`, { replace: true });
    return;
  }

  // Ensure eventData is safely destructured
  const {
    eventsPreview,
    speakerPreview,
    event_img,
    category,
    title,
    date,
    start_time,
    end_time,
    desc,
    speaker,
    role,
    slot,
    location,
    isOffline,
    speaker_img,
  } = eventData;

  const CategoryName = categoryMap[category];
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate(`/user/login?redirect=${encodeURIComponent(lokasi.pathname)}`);
        return;
      }

      const formData = new FormData();
      formData.append("category", category);
      formData.append("title", title);
      formData.append("date", date);
      formData.append("start_time", start_time);
      formData.append("end_time", end_time);
      formData.append("desc", desc);
      formData.append("speaker", speaker);
      formData.append("role", role);
      formData.append("slot", slot);
      if (isOffline) {
        formData.append("location", location);
      }
      if (event_img) {
        formData.append("event_img", event_img);
      }
      if (speaker_img) {
        formData.append("speaker_img", speaker_img);
      }

      await updateEvent(id, formData, token);
      navigate("/my-events");
    } catch (error) {
      alert(`Update gagal: ${error.message || "Coba lagi nanti."}`);
    }
  };

  return (
    <div className="detail-event h-screen">
      <Navbar />

      <div className={`container ${pageAnimation} pt-10 mx-auto`}>
        <div className="breadcrumb pt-auto flex ml-2 pb-10 text-sm lg:text-base">
          <ol className="list-none flex text-black text-medium">
            <li>
              <Link to={"/my-events"}>My Events</Link>
            </li>
            <li className="mx-2"> &gt; </li>
            <li>
              <Link to={`/my-events/${id}/edit`} state={{ step: 1, data: eventData }}>
                Update Event
              </Link>
            </li>
            <li className="mx-2"> &gt; </li>
            <li>
              <Link to={`/my-events/${id}/edit`} state={{ step: 2, data: eventData }}>
                Detail Event
              </Link>
            </li>
            <li className="mx-2"> &gt; </li>
            <li>
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default navigation behavior
                  window.location.reload(); // Force reload
                }}
              >
                Preview
              </Link>
            </li>
          </ol>
        </div>
        <div className="content-box flex flex-col lg:flex-row">
          <div className="PosterEvent w-full lg:w-1/2 h-auto lg:h-1/2">
            <img
              className="w-full h-auto object-cover rounded-2xl shadow-lg"
              src={eventsPreview}
              alt="Poster Event"
            />
          </div>
          <div className="description text-left mt-6 lg:mt-0 lg:mx-8">
            <span className="bg-[#027FFF] font-regular px-4 py-1 lg:px-8 lg:py-1 rounded-full text-white text-[12px] lg:text-[14px]">
              {CategoryName}
            </span>
            <h1 className="font-bold text-[20px] lg:text-[32px] py-4 max-w-[40rem]">
              {title}
            </h1>
            <div className="border-b-2 border-[#003266] w-full lg:w-[486px] my-4"></div>

            <div className="flex gap-2 ml-2">
              <img src={Date} alt="Calendar" className="text-4xl sm:text-3xl" />
              <span className="font-medium text-[16px] sm:text-[14px] mt-2">
                {date}
              </span>
              <span className="font-medium text-[16px] sm:text-[14px] mt-2 ml-auto mr-2">
                {start_time} - {end_time}
              </span>
            </div>
            <div className="flex gap-2 ml-1 my-4">
              <i className="ri-map-pin-2-fill text-4xl sm:text-3xl"></i>
              <span className="font-medium text-[16px] sm:text-[14px] mt-2">
                {isOffline ? location : "Online"}
              </span>
              <img
                src={Chair}
                alt="Location"
                className="text-4xl sm:text-3xl ml-auto"
              />
              <span className="font-medium text-[16px] sm:text-[14px] mt-2 mr-2">
                {slot} Kursi
              </span>
            </div>

            <div className="border-b-2 border-[#003266] w-full lg:w-[486px] my-4"></div>
            <div className="lecturer flex gap-2 ml-2">
              <img
                src={speakerPreview}
                alt="Profile"
                className="w-[40px] h-[40px] rounded-full object-cover"
              />
              <div className="lecturername flex flex-col ml-4">
                <span className="font-semibold text-[14px] lg:text-[16px]">
                  {speaker}
                </span>
                <span className="text-regular text-[12px] lg:text-[14px]">
                  {role}
                </span>
              </div>
            </div>
            <div className="border-b-2 border-[#003266] w-full lg:w-[486px] my-4"></div>
            <div>
              <p className="eventdescription font-regular text-wrap text-[14px] lg:text-[16px] block w-full lg:max-w-[486px]">
                {desc}
              </p>
            </div>
          </div>

          <div className="booking w-full lg:w-4/12 h-1/2 px-6 py-6 mt-6 lg:mt-0 lg:mx-8 bg-white shadow-lg rounded-2xl flex flex-col">
            <div className="checkout flex flex-col">
              <button
                className="bg-[#027FFF] font-regular w-full h-10 lg:h-11 my-2 rounded-lg text-medium text-white text-[14px] lg:text-[16px]"
                onClick={handleUpdate}
              >
                Update
              </button>
              <button
                className="bg-transparent border-2 border-[#027FFF] font-regular w-full h-10 lg:h-11 my-2 rounded-lg text-medium text-black text-[14px] lg:text-[16px] hover:bg-red-300 hover:border-red-500"
                onClick={handleBack}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 right-0 -z-10">
        <img src={Ellipse2} alt="Background" className="w-40 lg:w-[300px]" />
      </div>
    </div>
  );
};

export default PreviewEdit;
