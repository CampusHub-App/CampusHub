import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import peserta from "../../assets/image/newuser.svg";
import circle from "../../assets/image/circle.svg";
import admin from "../../assets/image/newadmin.svg";
import circle2 from "../../assets/image/circle2.svg";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Welcome() {

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {

    const token = localStorage.getItem("token");
    if (token) {
      navigate("/", { replace: true });
      return;
    }
  }, [navigate]);

  const params = new URLSearchParams(location.search);
  const redirectPath = params.get("redirect") || "/"; return (
    <motion.div
      className="flex delay-100 transition-transform"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="h-screen w-full flex md:flex-col sm:flex-col lg:flex-row relative">
        <div className="h-screen w-full flex flex-col justify-center mx-auto gap-y-[20px] pb-[70px] relative">          <motion.div
            className="px-4 mb-16 ml-12"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <motion.h1
              className="text-[64px] font-semibold text-[#003266]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              Selamat Datang!
            </motion.h1>
            <motion.p
              className="text-[24px] font-medium text-[#003266]"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              Pilihlah peranmu saat ini!
            </motion.p>          </motion.div>          <motion.div
            className="flex flex-col items-center gap-y-[20px] z-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <motion.img
              className="max-w-[440px] max-h-[342px]"
              src={peserta}
              alt="Peserta"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              whileHover={{ scale: 1.05 }}
            />
            <motion.div
              className="items-center flex flex-col gap-y-[20px] relative z-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.65 }}
            >
              <motion.h1
                className="text-[32px] font-semibold text-[#003266]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.75 }}
              >
                Sebagai peserta
              </motion.h1>
              <Link to={`/user/login?redirect=${redirectPath}`}>
                <motion.button
                  className="text-white tengah:w-[440px] sm:w-[400px] px-[24px] py-[16px] text-[20px] font-medium bg-[#003266] rounded-[10px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.85 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 50, 102, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Masuk
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>        </div>        <motion.div
          className="bg-[#003266] h-screen w-full flex flex-col items-center justify-center sm:pb-[70px] md:pb-[0px] sm:relative md:relative lg:static"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.div
            className="mt-[8rem] relative z-10 flex flex-col items-center gap-y-[20px] mt-[34px]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            <motion.img
              src={admin}
              alt="Admin"
              className="max-w-[440px] max-h-[356px]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              whileHover={{ scale: 1.05 }}
            />
            <motion.h1
              className="text-[32px] font-semibold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.75 }}
            >
              Sebagai penyelenggara
            </motion.h1>
            <Link to={`/admin/login?redirect=${redirectPath}`}>
              <motion.button
                className="text-white bg-[#027FFF] rounded-[10px] tengah:w-[440px] sm:w-[400px]  px-[24px] py-[16px] text-[20px] font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.85 }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(2, 127, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                Masuk
              </motion.button>
            </Link>          </motion.div>          <motion.img
            src={circle}
            alt="Circle"
            className="absolute bottom-0 left-0 sm:hidden tengah:block"
            initial={{ opacity: 0, scale: 0.8, rotate: 80 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.0, delay: 1.0 }}
          />
        </motion.div>

        <motion.img
          src={circle2}
          alt="Circle2"
          className="max-w-[284px] max-h-[284px] absolute top-[-50px] right-0 overflow-hidden sm:hidden tengah:block"
          initial={{ opacity: 0, scale: 0.5, rotate: 90 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.0, delay: 1.0 }}
        />
      </div>
    </motion.div>
  );
}

export default Welcome;
