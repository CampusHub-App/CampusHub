import { useState } from "react";
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
import detail from "./../../assets/Image/detail.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "./../../components/footer";

function Webinarpage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const maxIndex = 4;

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === maxIndex ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? maxIndex : prevIndex - 1));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const pageVariants = {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "-100%" },
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
    <div className="font-sans flex flex-col box-border mx-auto w-full">
      
      <header className="w-full">
        <nav className="p-5 bg-white sm:px-0 ">
          <div className="flex justify-between items-center px-5 tengah:px-[62px] sm:px-[0]">
            <img src={logo} alt="Logo" className="" />
            <ul className="hidden lg:flex gap-8 items-center text-[#003266] text-[20px] font-medium">
              <Link to="/Homepage">
                <li>
                  <a href="#">Home</a>
                </li>
              </Link>
              <li>
                <a href="#">MyEvents</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
            </ul>
            <div className="flex items-center gap-4">
              <img src={profile} alt="Profile" className="hidden sm:block" />
              <button
                onClick={toggleMenu}
                className="lg:hidden flex items-center justify-center p-2 w-10 h-10 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none"
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
            <ul className="flex flex-col mt-4 text-[#003266] text-[20px] font-medium lg:hidden">
              <Link to="/Homepage">
                <li className="py-2 px-5">
                  <a href="#">Home</a>
                </li>
              </Link>
              <li className="py-2 px-5">
                <a href="#">MyEvents</a>
              </li>
              <li className="py-2 px-5">
                <a href="#">About Us</a>
              </li>
            </ul>
          )}

          <img src={detail} alt="Detail gambar" className="w-full sm:px-0 tengah:px-[62px]  mt-5" />
        </nav>
        
      </header>

      
      <div className="bg-[#EAF4FF] border-transparent rounded-t-[100px] flex flex-col mt-12 items-center">
        <h1 className="font-semibold text-[32px] sm:text-[32px] md:text-[48px] text-[#003266] mt-10 mb-10">
          Jelajahi Acara Unggulan
        </h1>
        <div className="flex flex-wrap justify-center">
          <Cardpage />
          <img src={circle6} alt="Dekorasi lingkaran" className="absolute left-0 top-[1300px]" />
        </div>
      </div>
    </div>
    <Footer/>
    </motion.div>
  );
}

export default Webinarpage;
