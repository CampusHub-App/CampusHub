import profile from "../../assets/Image/profile.svg";
import logo from "../../assets/Image/logo.svg";
import admin from "../../assets/Image/adminimage/admin.svg";
import admin2 from "../../assets/Image/adminimage/admin2.svg";
import circle5 from "../../assets/Image/circle5.svg";
import circle from "../../assets/Image/adminimage/circleadmin.svg";
import { useState } from "react";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { y: "100%" },
  animate: { y: 0 },
  exit: { y: "-100%" },
};

function Adminpage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.div
      className="font-sans flex flex-col box-border mx-auto w-full relative"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-[#003266] w-full">
        <nav className="p-5 bg-white">
          <div className="flex justify-between items-center px-[62px] sm:px-0 tengah:px-[62px]">
            <img src={logo} alt="Logo" className="sm:max-w-[150px] md:max-w-[229px]" />
            <ul className="hidden lg:flex gap-[40px] text-[#003266] font-medium text-[20px]">
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
            <div className="flex items-center gap-3">
              <img src={profile} alt="Profile" className="hidden sm:block" />
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
            <ul className="flex flex-col lg:hidden mt-4 space-y-4 text-[#003266] text-[20px] font-medium">
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
          )}
        </nav>

        <main className="flex gap-x-0 text-white items-center sm:px-0 tengah:px-5 py-8 ">
          <div className="flex flex-col gap-y-[24px] px-[62px]  sm:px-0 tengah:px-[62px]">
            <h1 className="font-bold md:text-[32px] sm:text-[20px] lg:text-[54px]">
              Buat Acara dengan Mudah, Jalin Hubungan dengan Peserta Anda!
            </h1>
            <p className="max-w-[550px] font-medium md:text-[20px]  lg:text-[26px]">
              Personalisasi acara Anda dengan gambar dan deskripsi yang menarik
              untuk perhatian pengunjung.
            </p>
          </div>
          <img
            src={admin}
            alt="Gambar utama"
            className="relative z-10 w-full sm:max-w-[200px] md:max-w-[400px] lg:max-w-[550px]"
          />
        </main>

        <div className="bg-[#EAF4FF] border-transparent rounded-t-[100px] flex flex-col items-center ">
          <h1 className="font-semibold text-[32px] lg:text-[48px] text-black mt-[50px] relative z-10 ">
            Realisasikan Acaramu!
          </h1>
          <main className="flex  justify-around text-black items-center py-14 p-5 relative z-10 sm:px-0 tengah:px-5">
            <div className="flex flex-col gap-y-[24px] px-[62px] sm:px-0 tengah:px-[62px]  xl:mb-32">
              <h1 className="font-semibold text-[24px] ">
                Buat Acaramu Sekarang!
              </h1>
              <p className="font-medium text-[18px] md:text-[26px] ">
                Setelah melakukan tahap verifikasi identitas, realisasikan
                acaramu dengan langkah yang mudah!
              </p>
              <button className="max-w-[310px] max-h-[46px] px-[24px] py-[8px] sm:max-w-[200px] tengah:max-w-[310px] text-white text-[16px] md:text-[20px] bg-[#027FFF] rounded-[10px]">
                Buat Sekarang
              </button>
            </div>
            <img
              src={admin2}
              alt="Ilustrasi admin"
              className="relative z-10 w-full sm:max-w-[200px] md:max-w-[450px] lg:max-w-[640px]"
            />
          </main>
        </div>
      </div>
      <img src={circle5} alt="Circle dekorasi" className="absolute right-0 top-96 sm:hidden md:block" />
      <img src={circle} alt="Dekorasi lingkaran" className="absolute left-0 bottom-[-300px] sm:hidden xl:block" />
    </motion.div>
  );
}

export default Adminpage;
