import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import admin from "../../assets/image/admin/admin.svg";
import admin2 from "../../assets/image/admin/admin2.svg";
import circle5 from "../../assets/image/user/circle5.svg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const pageVariants = {
  initial: { opacity: 0.4 },
  animate: { opacity: 1 },
  exit: { opacity: 0.4 },
};

function Adminpage() {
  return (
    <motion.div
      className="font-sans flex flex-col box-border mx-auto w-full relative"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 1.6, ease: "easeInOut" }}
    >
      <Navbar />

      <div className="bg-[#003266] w-full">
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
              <Link to="/events/upload">
              <button className="hover:scale-105 animations-all duration-300 shadow-xl max-w-[310px] max-h-[46px] px-[24px] py-[8px] sm:max-w-[200px] tengah:max-w-[310px] text-white text-[16px] md:text-[20px] bg-[#027FFF] rounded-[10px]">
                Buat Sekarang
              </button>
              </Link>
            </div>
            <img
              src={admin2}
              alt="Ilustrasi admin"
              className="relative z-10 w-full sm:max-w-[200px] md:max-w-[450px] lg:max-w-[640px]"
            />
          </main>
        </div>
      </div>
      <img
        src={circle5}
        alt="Circle dekorasi"
        className="absolute right-0 top-96 sm:hidden md:block"
      />
      <div id="aboutus">
        <Footer></Footer>
      </div>
    </motion.div>
  );
}

export default Adminpage;
