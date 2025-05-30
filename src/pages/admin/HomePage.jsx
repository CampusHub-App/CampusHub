import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import admin from "../../assets/image/admin.svg";
import admin2 from "../../assets/image/admin2.svg";
import circle5 from "../../assets/image/circle5.svg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function Adminpage() {
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

  return (
    <motion.div
      className="font-sans flex flex-col box-border mx-auto w-full relative"
    >
      <Navbar />

      <div className="bg-[#003266] w-full">
        <main className="flex gap-x-0 text-white items-center sm:px-0 tengah:px-5 py-8 ">
          <motion.div 
            className="flex flex-col gap-y-[24px] px-[62px]  sm:px-0 tengah:px-[62px]"
            variants={heroTextVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="font-bold md:text-[32px] sm:text-[20px] lg:text-[54px]"
              variants={itemVariants}
            >
              Buat Acara dengan Mudah, Jalin Hubungan dengan Peserta Anda!
            </motion.h1>
            <motion.p 
              className="max-w-[550px] font-medium md:text-[20px]  lg:text-[26px]"
              variants={itemVariants}
            >
              Personalisasi acara Anda dengan gambar dan deskripsi yang menarik
              untuk perhatian pengunjung.
            </motion.p>
          </motion.div>
          <motion.img
            src={admin}
            alt="Gambar utama"
            className="relative z-10 w-full sm:max-w-[200px] md:max-w-[400px] lg:max-w-[550px]"
            variants={heroImageVariants}
            initial="hidden"
            animate="visible"
          />
        </main>        <div className="bg-[#EAF4FF] border-transparent rounded-t-[100px] flex flex-col items-center ">
          <motion.h1 
            className="font-semibold text-[32px] lg:text-[48px] text-black mt-[50px] relative z-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Realisasikan Acaramu!
          </motion.h1>
          <motion.main 
            className="flex  justify-around text-black items-center py-14 p-5 relative z-10 sm:px-0 tengah:px-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="flex flex-col gap-y-[24px] px-[62px] sm:px-0 tengah:px-[62px]  xl:mb-32"
              variants={itemVariants}
            >
              <motion.h1 
                className="font-semibold text-[24px]"
                variants={itemVariants}
              >
                Buat Acaramu Sekarang!
              </motion.h1>
              <motion.p 
                className="font-medium text-[18px] md:text-[26px]"
                variants={itemVariants}
              >
                Setelah melakukan tahap verifikasi identitas, realisasikan
                acaramu dengan langkah yang mudah!
              </motion.p>
              <motion.div variants={itemVariants}>
                <Link to="/events/upload">
                  <motion.button 
                    className="hover:scale-105 animations-all duration-300 shadow-xl max-w-[310px] max-h-[46px] px-[24px] py-[8px] sm:max-w-[200px] tengah:max-w-[310px] text-white text-[16px] md:text-[20px] bg-[#027FFF] rounded-[10px]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    Buat Sekarang
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
            <motion.img
              src={admin2}
              alt="Ilustrasi admin"
              className="relative z-10 w-full sm:max-w-[200px] md:max-w-[450px] lg:max-w-[640px]"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
            />
          </motion.main>
        </div>      </div>
      <motion.img
        src={circle5}
        alt="Circle dekorasi"
        className="absolute right-0 top-96 sm:hidden md:block"
        initial={{ opacity: 0, rotate: 90 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
      />
      <div id="aboutus">
        <Footer></Footer>
      </div>
    </motion.div>
  );
}

export default Adminpage;
