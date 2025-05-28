import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchUserRegistrations } from "./api";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./css/MyEvents.css";

// Animation configuration
const pageVariants = {
  initial: { opacity: 0.4 },
  animate: { opacity: 1 },
  exit: { opacity: 0.4 },
};

function MyEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {

    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/welcome");
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    
    const loadEvents = async () => {
      try {
        const data = await fetchUserRegistrations(parsedUser.token);
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
    window.scrollTo(0, 0);
  }, [navigate]);

  const filteredEvents = () => {
    if (!events || !events.length) return [];

    const now = new Date();
    
    switch (activeTab) {
      case "upcoming":
        return events.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= now && event.status !== "cancelled";
        });
      case "past":
        return events.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate < now && event.status !== "cancelled";
        });
      case "cancelled":
        return events.filter(event => event.status === "cancelled");
      default:
        return events;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "registered":
        return "bg-blue-100 text-blue-800";
      case "attended":
        return "bg-green-100 text-green-800";
      case "absent":
        return "bg-red-100 text-red-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader w-16 h-16 border-4 border-[#027FFF] border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-4 text-lg font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col min-h-screen"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 1.6, ease: "easeInOut" }}
    >
      <Navbar />

      <main className="flex-grow bg-gray-50">
        <div className="bg-[#003266] text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold">My Events</h1>
            <p className="mt-2 text-lg opacity-90">
              Manage your registered events
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === "upcoming"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === "past"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("past")}
            >
              Past
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === "cancelled"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("cancelled")}
            >
              Cancelled
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {/* Events List */}
          {filteredEvents().length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No events found
              </h3>
              <p className="mt-1 text-gray-500">
                {activeTab === "upcoming"
                  ? "You don't have any upcoming events."
                  : activeTab === "past"
                  ? "You don't have any past events."
                  : "You don't have any cancelled events."}
              </p>
              <div className="mt-6">
                <Link
                  to="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#027FFF] hover:bg-blue-700"
                >
                  Browse Events
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents().map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={event.foto_event}
                    alt={event.judul}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-semibold">{event.judul}</h2>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(
                          event.status
                        )}`}
                      >
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{formatDate(event.date)}</p>
                    <div className="flex justify-between items-center">
                      <Link
                        to={`/my-events/${event.id}/view`}
                        className="text-[#027FFF] hover:text-blue-700 font-medium"
                      >
                        View Details
                      </Link>
                      {event.status === "registered" && new Date(event.date) > new Date() && (
                        <Link
                          to={`/my-events/${event.id}/kode-unik`}
                          className="bg-[#027FFF] text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm"
                        >
                          Show QR Code
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}

export default MyEvents;