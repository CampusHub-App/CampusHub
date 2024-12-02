import { useState,useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import profile from "./../../assets/Image/profile.svg";
import gambar from "./../../assets/Image/gambarutama.svg";
import webinar from "./../../assets/Image/webinar.svg";
import seminar from "./../../assets/Image/seminar.svg";
import kuliah from "./../../assets/Image/kuliah.svg";
import workshop from "./../../assets/Image/workshop.svg";
import sertifikasi from "./../../assets/Image/sertifikasi.svg";
import circle5 from "./../../assets/Image/circle5.svg";
import Cardpage from "./../../components/Cardpage";
import circle6 from "./../../assets/Image/circle6.svg";
import arrowLeft from "./../../assets/Image/icon/arrow-circle-left.svg";
import arrowRight from "./../../assets/Image/icon/arrow-circle-right.svg";
import logo from "./../../assets/Image/logo.svg";
import { motion } from "framer-motion";
import Footer from "../../components/Footer";
import { getevents } from "../../../services/getevents";

const pageVariants = {
  initial: { y: "100%" },
  animate: { y: 0 },
  exit: { y: "-100%" },
};

function Homepage() {
  const [activeIndex, setActiveIndex] = useState(0); 
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [trendingCount, setTrendingCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const maxIndex = 4; 

  useEffect(() => {
    setIsLoading(true);
    getevents((eventsData) => {
      if (eventsData.length > 0) {
        setEvents(eventsData);
        setTrendingCount(eventsData.length); // Set jumlah trending events
      }
      setIsLoading(false);
    });
  }, []);

  // Carousel handlers
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === maxIndex ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? maxIndex : prevIndex - 1));
  };

  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
      
      <header className="bg-[#003266] w-full">
        <nav className="sm:px-[0px] md:p-5 bg-white w-full lg:px-10 xl:px-[85px] py-5">
          <div className="flex justify-between items-center w-full">
            <img
              src={logo}
              alt="Logo"
              className="sm:max-w-[150px] md:max-w-[229px]"
            />

            <ul className="hidden lg:flex space-x-8 items-center text-[#003266] text-[20px] font-medium">
              <Link to="/Homepage"><li>
                <a href="#">Home</a>
              </li></Link>
              <li>
                <a href="#">MyEvents</a>
              </li>
              <li>
              <ScrollLink
              to="aboutus"
              smooth={true}
              duration={800}
              className=" flex justify-center cursor-pointer"
            >
              <p>About Us</p>
            </ScrollLink>
              </li>
            </ul>

            <div className="flex items-center gap-x-3">
             
              <img
                src={profile}
                alt="Profile"
                className=" hidden sm:block"
              />

              
              <button
                onClick={toggleMenu}
                type="button"
                className="flex lg:hidden items-center justify-center p-2 w-10 h-10 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden mt-4">
              <ul className="flex flex-col space-y-4 text-[#003266] text-[20px] font-medium">
                
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">MyEvents</a>
                </li>
                <li>
                  <a href="#">About Us</a>
                </li>
              </ul>
              
            </div>
          )}
        </nav>

        
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
              className="max-w-[278px] px-[16px] py-[8px] bg-[#027FFF] rounded-[10px] sm:max-w-[200px] md:max-w-[278px] lg:max-w-[278px] tengah:max-w-[240px] flex justify-center cursor-pointer"
            >
              <p>Pesan</p>
            </ScrollLink>

            {/* Additional Info */}
            <div className="flex gap-x-[20px] sm:gap-x-[15px] sm:max-w-[200px] lg:gap-x-[20px] tengah:max-w-[530px] ">
              <div className="flex flex-col items-center">
                <h1 className="font-bold text-[38px] sm:text-[20px] lg:text-[38px] md:text-[38px]">{isLoading ? "..." : trendingCount}
                  
                </h1>
                <p className="font-normal text-[18px] sm:text-[12px] lg:text-[18px] md:text-[18px]">Trending Events</p>
              </div>
              <div className="flex flex-col items-center">
                <h1 className="font-bold text-[38px] sm:text-[20px] lg:text-[38px] md:text-[38px]">10+</h1>
                <p className="font-normal text-[18px] sm:text-[12px] lg:text-[18px] md:text-[18px]">Subtopik</p>
              </div>
              <div className="flex flex-col items-center">
                <h1 className="font-bold text-[38px] sm:text-[20px] lg:text-[38px] md:text-[38px]">5+</h1>
                <p className="font-normal text-[18px] sm:text-[12px] lg:text-[18px] md:text-[18px]">Kategori Acara</p>
              </div>
            </div>
          </div>

          <img
            src={gambar}
            alt="Gambar utama"
            className="relative z-10 w-full sm:w-[200px] md:w-[440px] lg:w-[550px]"
          />
        </main>
      </header>

      
      <img
        src={circle5}
        alt="Circle dekorasi"
        className="absolute right-0 top-72 md:hidden sm:hidden"
      />

      
      <div className="flex flex-col gap-y-[12px] mb-[12px]" id="kategori">
        <h1 className="flex justify-center mt-[12px] items-center font-semibold text-[32px]">
          Kategori
        </h1>
        <div>
          <ul className="flex gap-x-[64px] justify-center">
            
            <li>
            <Link to="/Webinar"><img src={webinar} alt="Webinar" /></Link>
            </li>
            <li>
              <img src={seminar} alt="Seminar" />
            </li>
            <li>
              <img src={kuliah} alt="Kuliah" />
            </li>
            <li>
              <img src={workshop} alt="Workshop" />
            </li>
            <li>
              <img src={sertifikasi} alt="Sertifikasi" />
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
          <Cardpage />
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
