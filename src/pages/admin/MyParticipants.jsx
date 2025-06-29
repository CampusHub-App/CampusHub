import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Menu from "../../assets/image/menu.svg";
import "../../styles/MyEvents.css";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchEventParticipants } from "../../services/api";

const MyParticipants = () => {

  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("date");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { id } = useParams();
  const storage = import.meta.env.VITE_STORAGE_BASE_URL;

  const navigate = useNavigate();

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

  useEffect(() => {
    if (location.state?.activeTab) {
      setStatusFilter(location.state.activeTab);
    }
  }, [location.state]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/welcome?redirect=/my-events", { replace: true });
        return;
      }

      try {
        const data = await fetchEventParticipants(id, token);
        setEvents(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [navigate, id]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setIsDropdownOpen(false);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const filteredEvents = events
    .filter((event) =>
      event.fullname.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((event) => {
      switch (statusFilter.toLowerCase()) {
        case "registered":
          return event.status.toLowerCase() === "registered";
        case "cancelled":
          return event.status.toLowerCase() === "cancelled";
        case "attended":
          return event.status.toLowerCase() === "attended";
        case "absent":
          return event.status.toLowerCase() === "absent";
        case "all":
          return true;
        default:
          return false;
      }
    });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortOption === "date") {
      return new Date(a.join_date) - new Date(b.join_date);
    } else if (sortOption === "title") {
      return a.fullname.localeCompare(b.fullname);
    }
    return 0;
  });

  const allCount = events.length;
  const registeredCount = events.filter(
    (event) => event.status.toLowerCase() === "registered"
  ).length;
  const canceledCount = events.filter(
    (event) => event.status.toLowerCase() === "cancelled"
  ).length;
  const attendedCount = events.filter(
    (event) => event.status.toLowerCase() === "attended"
  ).length;
  const absentCount = events.filter(
    (event) => event.status.toLowerCase() === "absent"
  ).length

  return (
    <motion.div
      className="font-sans flex flex-col box-border w-full"
    >
      <div className="MyParticipants">
        <Navbar />

        {isLoading ? (
          <div className="flex items-center justify-center h-screen">
            <div className="loader w-16 h-16 border-4 border-customBlue border-t-transparent rounded-full animate-spin"></div>
            <p className="ml-4 text-lg font-medium">Loading...</p>
          </div>
        ) : (
          <div className="container mx-auto px-4 sm:px-6 lg:px-20">
            <div className="content-box flex flex-col">
              <div className="page-features flex flex-wrap justify-between px-4 sm:px-6 lg:px-20 pt-16">
                <h1 className="text-3xl font-bold">MyParticipants</h1>

                <div className="features flex flex-wrap gap-4 items-center mt-4 lg:mt-0 w-full sm:w-auto">
                  <div className="search flex-1 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl px-4 py-2 border border-gray-300 rounded-lg flex items-center">
                    <input
                      type="text"
                      placeholder="Cari acara..."
                      className="focus:outline-none w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div
                    className="sort relative sm:max-w-[200px] lg:max-w-[150px]"
                    ref={dropdownRef}
                  >
                    <div
                      className="dropdown-select flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg cursor-pointer"
                      onClick={toggleDropdown}
                    >
                      <span className="text-sm sm:text-base">
                        {sortOption === "date" ? "By date" : "A-Z"}
                      </span>
                      <img src={Menu} alt="menu" className="dropdown-icon" />
                    </div>
                    {isDropdownOpen && (
                      <div className="dropdown-menu absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-md w-full">
                        <ul>
                          <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSortChange("date")}
                          >
                            By date
                          </li>
                          <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSortChange("title")}
                          >
                            A-Z
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 w-[10rem] rounded-lg"
                    onClick={() => navigate(`/my-events/${id}/check-in`)}
                  >
                    Check In
                  </button>
                </div>
              </div>

              <div className="event-status flex flex-wrap gap-8 sm:gap-12 lg:gap-16 py-4">
                <ul className="flex gap-8 sm:gap-12 lg:gap-16 w-full text-sm sm:text-base justify-center lg:justify-start lg:px-20">
                  <li
                    className={`cursor-pointer ${
                      statusFilter === "All" ? "font-bold underline" : ""
                    }`}
                    onClick={() => handleStatusFilter("All")}
                  >
                    All ({allCount})
                  </li>
                  <li
                    className={`cursor-pointer ${
                      statusFilter === "Registered" ? "font-bold underline" : ""
                    }`}
                    onClick={() => handleStatusFilter("Registered")}
                  >
                    Registered ({registeredCount})
                  </li>
                  <li
                    className={`cursor-pointer ${
                      statusFilter === "Cancelled" ? "font-bold underline" : ""
                    }`}
                    onClick={() => handleStatusFilter("Cancelled")}
                  >
                    Canceled ({canceledCount})
                  </li>
                  <li
                    className={`cursor-pointer ${
                      statusFilter === "Attended" ? "font-bold underline" : ""
                    }`}
                    onClick={() => handleStatusFilter("Attended")}
                  >
                    Attended ({attendedCount})
                  </li>
                  <li
                    className={`cursor-pointer ${
                      statusFilter === "Absent" ? "font-bold underline" : ""
                    }`}
                    onClick={() => handleStatusFilter("Absent")}
                  >
                    Absent ({absentCount})
                  </li>
                </ul>
              </div>

              <div className="event-list flex flex-col gap-6 px-4 sm:px-6 lg:px-20 py-2">
                {sortedEvents.length > 0 ? (
                  sortedEvents.map((event, index) => (
                    <div
                      key={`${event.id}-${statusFilter}-${index}`} // Dynamic key based on filter and index
                      className={`event-box p-4 border border-customBlue rounded-2xl shadow-md hover:shadow-lg transition duration-300 px-4 py-2 flex justify-between items-center animate-slideIn opacity-0`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: "forwards",
                      }}
                    >
                      <div className="event-data flex items-center">
                        <img
                          src={ event.photo ?
                            `${storage}/${event.photo}` :
                            `https://eu.ui-avatars.com/api/?name=${encodeURIComponent(
                              event.fullname
                            )}&size=250`
                          }
                          alt={event.fullname}
                          className="w-20 h-20 object-cover rounded-full my-2"
                        />
                        <div className="event-details flex flex-col px-4">
                          <span className="event-title block font-semibold text-lg mb-2">
                            {event.fullname}
                          </span>
                          <span className="event-date text-sm text-gray-500 mb-1 block">
                            Join date:{" "}
                            {new Date(event.join_date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No participants found.</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MyParticipants;
