import { useState } from "react";
import CardPage from "./components/CardPage";
import circle6 from "./assets/image/circle6.svg";
import { motion } from "framer-motion";
import Footer from "./components/Footer";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";

function KuliahTamuPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.is_admin) {
        navigate("/", { replace: true });
        return;
      }
    }

    setIsLoading(true); // Set state untuk mulai loading
    fetch("https://campushub.web.id/api/events/kuliah-tamu") // URL API
      .then((response) => {
        if (!response.ok) {
          throw new Error("Terjadi kesalahan saat mengambil data."); // Tangani error HTTP
        }
        return response.json(); // Konversi response ke JSON
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setEvents(data); // Set data langsung ke state
          setError(null); // Reset error jika sukses
        } else {
          setError("Tidak ada data acara."); // Tangani jika array kosong
        }
      })
      .catch((err) => setError(err.message)) // Tangani error
      .finally(() => setIsLoading(false)); // Akhiri loading
  }, []);

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
          <h1 className="font-semibold  text-[#003266] mt-[80px] mb-[80px] flex sm:text-[32px] md:text-[48px]">
            Jelajahi Kuliah Tamu
          </h1>
          <div className="flex flex-wrap justify-center">
            {isLoading ? (
              <div className="flex items-center justify-center h-screen w-full">
                <div className="loader w-16 h-16 border-4 border-[#027FFF] border-t-transparent rounded-full animate-spin"></div>
                <p className="ml-4 text-lg font-medium">Loading...</p>
              </div>
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

export default KuliahTamuPage;
