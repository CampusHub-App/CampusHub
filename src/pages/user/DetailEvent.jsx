import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchEvent, registerForEvent } from "../../api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PopUpCheckout from "../../components/PopUpCheckout";
import PopUpBerhasil from "../../components/PopUpBerhasil";
import PopUpGagal from "../../components/PopUpGagal";
import "./css/DetailEvent.css";

// Animation configuration
const pageVariants = {
  initial: { opacity: 0.4 },
  animate: { opacity: 1 },
  exit: { opacity: 0.4 },
};

function DetailEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadEventData = async () => {
      try {
        const data = await fetchEvent(id);
        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    loadEventData();
    window.scrollTo(0, 0);
  }, [id]);

  const handleRegister = async () => {
    if (!user) {
      navigate("/welcome");
      return;
    }

    try {
      await registerForEvent(id, user.token);
      setShowSuccess(true);
    } catch (err) {
      setErrorMessage(err.message || "Failed to register for event");
      setShowError(true);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader w-16 h-16 border-4 border-[#027FFF] border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-4 text-lg font-medium">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700">{error}</p>
        <button 
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (!event) return null;

  return (
    <motion.div
      className="font-sans flex flex-col min-h-screen"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 1.6, ease: "easeInOut" }}
    >
      <Navbar />

      <main className="flex-grow">
        {/* Event Header */}
        <div className="bg-[#003266] text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.judul}</h1>
            <p className="text-lg opacity-90">{event.category_name}</p>
          </div>
        </div>

        {/* Event Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - Event Details */}
            <div className="md:w-2/3">
              <img 
                src={event.foto_event} 
                alt={event.judul} 
                className="w-full h-auto rounded-lg mb-6 object-cover"
                style={{ maxHeight: "400px" }}
              />

              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-bold mb-4">Deskripsi</h2>
                <p className="text-gray-700 whitespace-pre-line">{event.deskripsi}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Pembicara</h2>
                <div className="flex items-center">
                  <img 
                    src={event.foto_pembicara} 
                    alt={event.pembicara} 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{event.pembicara}</h3>
                    <p className="text-gray-600">{event.role}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-bold mb-4">Informasi Acara</h2>
                
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-700">Tanggal</h3>
                  <p>{formatDate(event.date)}</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-700">Waktu</h3>
                  <p>{event.time}</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-700">Lokasi</h3>
                  <p>{event.location}</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-700">Harga</h3>
                  <p>{event.price === 0 ? "Gratis" : `Rp ${event.price.toLocaleString('id-ID')}`}</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-700">Kuota</h3>
                  <p>{event.quota} peserta</p>
                </div>
                
                <button
                  onClick={() => setShowPopup(true)}
                  className="w-full bg-[#027FFF] text-white py-3 rounded-md font-medium hover:bg-blue-600 transition-colors mt-4"
                >
                  Daftar Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <PopUpCheckout
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        onConfirm={handleRegister}
        eventDetails={{
          title: event?.judul,
          date: formatDate(event?.date),
          location: event?.location,
          price: event?.price,
        }}
      />

      <PopUpBerhasil
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          navigate("/my-events");
        }}
        message="Pendaftaran berhasil! Silakan cek di halaman My Events."
      />

      <PopUpGagal
        isOpen={showError}
        onClose={() => setShowError(false)}
        message={errorMessage}
      />
    </motion.div>
  );
}

export default DetailEvent;