import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchEvents } from "../../services/api";
import CardPage from "../../components/CardPage";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import circle6 from "../../assets/image/circle6.svg";

function SertifikasiPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.is_admin) {
      navigate("/", { replace: true });
      return;
    }

    setIsLoading(true);
    fetchEvents("sertifikasi")
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setEvents(data);
          setError(null);
        } else {
          setError("Tidak ada data acara.");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [navigate]);

  const pageVariants = {
    initial: { opacity: 0.6 },
    animate: { opacity: 1 },
    exit: { opacity: 0.6 },
  };

  return (
    <motion.div
      className="font-sans flex flex-col box-border w-full"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <Navbar />

      <div className="font-sans flex flex-col box-border mx-auto w-full">
        <div className="bg-[#EAF4FF] border-transparent rounded-t-[100px] flex flex-col items-center justify-center">
          <h1 className="font-semibold text-[#003266] mt-[80px] mb-[80px] flex sm:text-[32px] md:text-[48px]">
            Jelajahi Sertifikasi
          </h1>
          <div className="flex flex-wrap justify-center">
            {isLoading ? (
              <div className="flex items-center justify-center h-screen w-full">
                <div className="loader w-16 h-16 border-4 border-[#027FFF] border-t-transparent rounded-full animate-spin"></div>
                <p className="ml-4 text-lg font-medium">Loading...</p>
              </div>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <CardPage events={events} />
            )}
            <div className="relative">
              <img
                src={circle6}
                alt="Circle dekorasi"
                className="absolute left-0 top-[1300px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div id="aboutus">
        <Footer />
      </div>
    </motion.div>
  );
}

export default SertifikasiPage;