import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import gambar from "./assets/image/gambarutama.svg";
import webinar from "./assets/image/webinar.svg";
import seminar from "./assets/image/seminar.svg";
import kuliah from "./assets/image/kuliah.svg";
import workshop from "./assets/image/workshop.svg";
import sertifikasi from "./assets/image/sertifikasi.svg";
import circle5 from "./assets/image/circle5.svg";
import CardPage from "./components/CardPage";
import circle6 from "./assets/image/circle6.svg";
import { motion } from "framer-motion";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const pageVariants = {
  initial: { opacity: 0.4 },
  animate: { opacity: 1 },
  exit: { opacity: 0.4 },
};

function Homepage() {
  const [trendingCount, setTrendingCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://campushub.web.id/api/events/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Terjadi kesalahan saat mengambil data.");
        }
        return response.json();
      })
      .then((data) => {
        const { events, trending, category } = data;
        setEvents(events);
        setTrendingCount(trending);
        setCategoryCount(category);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <motion.div
      className="font-sans flex flex-col box-border w-full"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 1.6, ease: "easeInOut" }}
    >
      <Navbar />

      <header className="bg-[#003266] w-full">
        <main className="flex justify-around text-white items-center md:px-5 py-10">
          <div className="flex flex-col gap-y-[24px]">
            <h1 className="font-bold sm:text-[20px] md:text-[28px] lg:text-[54px] max-w-[640px] w-full tengah:text-[24px]">
              Wujudkan Potensimu Melalui Pengalaman yang Tak Terbatas!
            </h1>
            <p className="max-w-[550px] font-medium sm:text-[15px] md:text-[23px] tengah:text-[20px] lg:text-[26px]">
              Kembangkan dirimu sekarang dan raih prestasi luar biasa.
            </p>
            <ScrollLink
              to="acara"
              smooth={true}
              duration={800}
              className="hover:scale-105 transition-all duration-300 max-w-[278px] px-[16px] py-[8px] bg-[#027FFF] rounded-[10px] sm:max-w-[200px] md:max-w-[278px] lg:max-w-[278px] tengah:max-w-[240px] flex justify-center cursor-pointer"
            >
              <p>Pesan</p>
            </ScrollLink>

            {/* Additional Info */}
            <div className="flex gap-x-[20px] sm:gap-x-[15px] sm:max-w-[200px] lg:gap-x-[20px] tengah:max-w-[530px] ">
              <div className="flex flex-col items-center">
                <h1 className="font-bold text-[38px] sm:text-[20px] lg:text-[38px] md:text-[38px]">
                  {isLoading ? (
                    "0"
                  ) : (
                    <CountUp end={trendingCount} duration={2} />
                  )}
                </h1>
                <p className="font-normal text-[18px] sm:text-[12px] lg:text-[18px] md:text-[18px]">
                  Trending Events
                </p>
              </div>

              <div className="flex flex-col items-center">
                <h1 className="font-bold text-[38px] sm:text-[20px] lg:text-[38px] md:text-[38px]">
                  {isLoading ? (
                    "0"
                  ) : (
                    <CountUp end={categoryCount} duration={2} />
                  )}
                </h1>
                <p className="font-normal text-[18px] sm:text-[12px] lg:text-[18px] md:text-[18px]">
                  Kategori Acara
                </p>
              </div>
            </div>
          </div>

          <img
            src={gambar}
            alt="Gambar utama"
            className="relative z-10 w-full sm:w-[200px] md:w-[440px] lg:w-[550px]"
          />

          <div className="relative">
            <img
              src={circle5}
              alt="Circle dekorasi"
              className="absolute left-0 top-[1300px]"
            />
          </div>
        </main>
      </header>

      <div className="flex flex-col gap-y-[12px] mb-[12px]" id="kategori">
        <h1 className="flex justify-center mt-[12px] items-center font-semibold text-[32px]">
          Kategori
        </h1>
        <div>
          <ul className="flex gap-x-[64px] justify-center">
            <li>
              <Link to="/webinar">
                <img src={webinar} alt="Webinar" />
              </Link>
            </li>
            <li>
              <Link to="/seminar">
                <img src={seminar} alt="Seminar" />
              </Link>
            </li>
            <li>
              <Link to="/kuliah-tamu">
                <img src={kuliah} alt="Kuliah" />
              </Link>
            </li>
            <li>
              <Link to="/workshop">
                <img src={workshop} alt="Workshop" />
              </Link>
            </li>
            <li>
              <Link to="/sertifikasi">
                <img src={sertifikasi} alt="Sertifikasi" />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div
        id="acara"
        className="bg-[#EAF4FF] border-transparent rounded-t-[100px] flex flex-col items-center"
      >
        <h1 className="font-semibold text-[48px] text-[#003266] mt-[80px] mb-[80px] sm:text-[32px] md:text-[48px]">
          Jelajahi Acara Unggulan
        </h1>

        <div className="flex flex-wrap justify-center">
          {isLoading ? (
            <div className="flex items-center justify-center h-screen w-full">
              <div className="loader w-16 h-16 border-4 border-[#027FFF] border-t-transparent rounded-full animate-spin"></div>
              <p className="ml-4 text-lg font-medium">Loading...</p>
            </div>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <CardPage events={events} />
          )}
          <img
            src={circle6}
            alt="Circle dekorasi"
            className="absolute left-0 top-[1300px]"
          />
        </div>
      </div>
      <div id="aboutus">
        <Footer></Footer>
      </div>
    </motion.div>
  );
}

export default Homepage;
