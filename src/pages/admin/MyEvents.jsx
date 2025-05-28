import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Menu from "../../assets/image/admin/menu.svg";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import PopUpDeleteEvent from "../../components/PopUpDeleteEvent";
import { fetchMyEvents } from "../../services/api";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("date");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const dropdownRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const location = useLocation();
  const [showConfirm, setshowConfirm] = useState(false);
  const pageVariants = {
    initial: { opacity: 0.6 },
    animate: { opacity: 1 },
    exit: { opacity: 0.6 },
  };
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

  const handleDelete = (e, id) => {
    e.stopPropagation();
    setSelectedEventId(id);
    setshowConfirm(true);
  };

  const navigate = useNavigate();

  const onSuccess = () => {
    setTimeout(() => {
      setshowConfirm(false);
    }, 2000);
    setTimeout(() => {
      window.location.reload();
    }, 2100);
  };

  const onBack = () => {
    setTimeout(() => {
      setshowConfirm(false);
    }, 400);
  };

  const onFailure = () => {
    setTimeout(() => {
      setshowConfirm(false);
    }, 3000);
  };

  useEffect(() => {
    if (location.state?.activeTab) {
      setStatusFilter(location.state.activeTab);
    }
  }, [location.state]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchEventsData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/welcome?redirect=/my-events", { replace: true });
        return;
      }

      try {
        const data = await fetchMyEvents(token);
        setEvents(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEventsData();
  }, [navigate]);

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
      event.judul.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((event) =>
      categoryFilter === "All" ? true : event.kategori_id === categoryFilter
    );

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortOption === "date") {
      return new Date(a.uploaded) - new Date(b.uploaded);
    } else if (sortOption === "title") {
      return a.judul.localeCompare(b.judul);
    }
    return 0;
  });

  const allCount = events.length;
  const webinarCount = events.filter((event) => event.kategori_id === 1).length;
  const seminarCount = events.filter((event) => event.kategori_id === 2).length;
  const kuliahTamuCount = events.filter(
    (event) => event.kategori_id === 3
  ).length;
  const workshopCount = events.filter(
    (event) => event.kategori_id === 4
  ).length;
  const sertifikasiCount = events.filter(
    (event) => event.kategori_id === 5
  ).length;

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
  };

  return (
    <motion.div
      className="font-sans flex flex-col box-border w-full"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 1.6 }}
    >
      <div className="myevents">
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
                <h1 className="text-3xl font-bold">My Events</h1>
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
                </div>
              </div>

              <div className="event-status flex flex-wrap gap-8 sm:gap-12 lg:gap-16 py-4">
                <ul className="flex gap-8 sm:gap-12 lg:gap-16 w-full text-sm sm:text-base justify-center lg:justify-start lg:px-20">
                  <li
                    className={`cursor-pointer ${
                      categoryFilter === "All" ? "font-bold underline" : ""
                    }`}
                    onClick={() => handleCategoryFilter("All")}
                  >
                    All ({allCount})
                  </li>
                  <li
                    className={`cursor-pointer ${
                      categoryFilter === 1 ? "font-bold underline" : ""
                    }`}
                    onClick={() => handleCategoryFilter(1)}
                  >
                    Webinar ({webinarCount})
                  </li>
                  <li
                    className={`cursor-pointer ${
                      categoryFilter === 2 ? "font-bold underline" : ""
                    }`}
                    onClick={() => handleCategoryFilter(2)}
                  >
                    Seminar ({seminarCount})
                  </li>
                  <li
                    className={`cursor-pointer ${
                      categoryFilter === 3 ? "font-bold underline" : ""
                    }`}
                    onClick={() => handleCategoryFilter(3)}
                  >
                    Kuliah Tamu ({kuliahTamuCount})
                  </li>
                  <li
                    className={`cursor-pointer ${
                      categoryFilter === 4 ? "font-bold underline" : ""
                    }`}
                    onClick={() => handleCategoryFilter(4)}
                  >
                    Workshop ({workshopCount})
                  </li>
                  <li
                    className={`cursor-pointer ${
                      categoryFilter === 5 ? "font-bold underline" : ""
                    }`}
                    onClick={() => handleCategoryFilter(5)}
                  >
                    Sertifikasi ({sertifikasiCount})
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
                      onClick={() =>
                        navigate(`/my-events/${event.id}/participants`)
                      }
                    >
                      <div className="event-data flex items-center">
                        <img
                          src={event.foto_event}
                          alt={event.judul}
                          className="w-20 h-20 object-cover rounded-full my-2"
                        />
                        <div className="event-details flex flex-col px-4">
                          <span className="event-title block font-semibold text-lg mb-2">
                            {event.judul}
                          </span>
                          <span className="event-date text-sm text-gray-500 mb-1 block">
                            Updated:{" "}
                            {new Date(event.uploaded).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="gap-2 flex">
                        <Link
                          to={`/my-events/${event.id}/edit`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <i className="ri-edit-box-line text-4xl hover:text-customBlue animations-all duration-300"></i>
                        </Link>
                        <Link onClick={(e) => handleDelete(e, event.id)}>
                          <i className="ri-delete-bin-line text-4xl hover:text-red-500 animations-all duration-300"></i>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No events found.</div>
                )}
              </div>
            </div>
          </div>
        )}
        {showConfirm && (
          <PopUpDeleteEvent
            id={selectedEventId}
            setShowPopUp={setshowConfirm}
            onSuccess={onSuccess}
            onBack={onBack}
            onFailure={onFailure}
          />
        )}
      </div>
    </motion.div>
  );
};

export default MyEvents;
