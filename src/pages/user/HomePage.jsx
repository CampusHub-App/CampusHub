import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { fetchEvents } from "../../services/api";

import CardPage from "../../components/CardPage";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

import gambar from "../../assets/image/gambarutama.svg";
import webinar from "../../assets/image/webinar.svg";
import seminar from "../../assets/image/seminar.svg";
import kuliah from "../../assets/image/kuliah.svg";
import workshop from "../../assets/image/workshop.svg";
import sertifikasi from "../../assets/image/sertifikasi.svg";
import circle6 from "../../assets/image/circle6.svg";

function Homepage() {
  const [trendingCount, setTrendingCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const heroTextVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const heroImageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut",
        delay: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    
    fetchEvents()
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
    >
      <Navbar />

      <header className="bg-[#003266] w-full">
        <main className="max-w-7xl mx-auto flex justify-around text-white items-center px-5 py-10">
          <motion.div 
            className="flex flex-col gap-y-[24px] flex-1 pr-12"
            variants={heroTextVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="font-bold sm:text-[20px] md:text-[28px] lg:text-[54px] max-w-[640px] w-full tengah:text-[24px]"
              variants={itemVariants}
            >
              Wujudkan Potensimu Melalui Pengalaman yang Tak Terbatas!
            </motion.h1>
            <motion.p 
              className="max-w-[550px] font-medium sm:text-[15px] md:text-[23px] tengah:text-[20px] lg:text-[26px]"
              variants={itemVariants}
            >
              Kembangkan dirimu sekarang dan raih prestasi luar biasa.
            </motion.p>
            <motion.div variants={itemVariants}>
              <ScrollLink
                to="acara"
                smooth={true}
                duration={800}
                className="hover:scale-105 transition-all duration-300 max-w-[278px] px-[16px] py-[8px] bg-[#027FFF] rounded-[10px] sm:max-w-[200px] md:max-w-[278px] lg:max-w-[278px] tengah:max-w-[240px] flex justify-center cursor-pointer"
              >
                <p>Pesan</p>
              </ScrollLink>
            </motion.div>

            <motion.div 
              className="flex gap-x-[20px] sm:gap-x-[15px] sm:max-w-[200px] lg:gap-x-[20px] tengah:max-w-[530px]"
              variants={itemVariants}
            >
              <motion.div 
                className="flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="font-bold text-[38px] sm:text-[20px] lg:text-[38px] md:text-[38px]">
                  {isLoading ? "0" : <CountUp end={trendingCount} duration={2} />}
                </h1>
                <p className="font-normal text-[18px] sm:text-[12px] lg:text-[18px] md:text-[18px]">
                  Trending Events
                </p>
              </motion.div>

              <motion.div 
                className="flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="font-bold text-[38px] sm:text-[20px] lg:text-[38px] md:text-[38px]">
                  {isLoading ? "0" : <CountUp end={categoryCount} duration={2} />}
                </h1>
                <p className="font-normal text-[18px] sm:text-[12px] lg:text-[18px] md:text-[18px]">
                  Kategori Acara
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.img
            src={gambar}
            alt="Gambar utama"
            className="relative z-10 w-full sm:w-[200px] md:w-[440px] lg:w-[550px]"
            variants={heroImageVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3 }}
          />
        </main>
      </header>

      <div className="flex flex-col gap-y-[24px] my-[24px]" id="kategori">
        <motion.h1 
          className="flex justify-center items-center font-semibold text-[32px]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Kategori
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <ul className="flex gap-x-[64px] justify-center">
            <motion.li
              whileHover={{ scale: 1.1, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <Link to="/webinar">
                <img src={webinar} alt="Webinar" />
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <Link to="/seminar">
                <img src={seminar} alt="Seminar" />
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <Link to="/kuliah-tamu">
                <img src={kuliah} alt="Kuliah" />
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <Link to="/workshop">
                <img src={workshop} alt="Workshop" />
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <Link to="/sertifikasi">
                <img src={sertifikasi} alt="Sertifikasi" />
              </Link>
            </motion.li>
          </ul>
        </motion.div>
      </div>

      <div
        id="acara"
        className="bg-[#EAF4FF] border-transparent rounded-t-[100px] flex flex-col items-center"
      >
        <motion.h1 
          className="font-semibold text-[48px] text-[#003266] mt-[80px] mb-[80px] sm:text-[32px] md:text-[48px]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Jelajahi Acara Unggulan
        </motion.h1>

        <motion.div 
          className="flex flex-wrap justify-center mb-[80px] relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
        >
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
        </motion.div>

        <motion.img
          src={circle6}
          alt="Circle dekorasi"
          className="absolute left-0 top-[1300px] z-0"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>
      
      <div id="aboutus">
        <Footer />
      </div>
    </motion.div>
  );
}

export default Homepage;