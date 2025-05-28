import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import peserta from "../../assets/image/peserta.svg";
import circle from "../../assets/image/circle.svg";
import admin from "../../assets/image/admin.svg";
import circle2 from "../../assets/image/circle2.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

function Welcome() {

  const navigate = useNavigate();
  useEffect(() => {

    const token = localStorage.getItem("token");
    if (token) {
      navigate("/", { replace: true });
      return;
    }
  }, []);

  const params = new URLSearchParams(location.search);
  const redirectPath = params.get("redirect") || "/";
  return (
    <motion.div
      className="flex delay-100 transition-transform"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 1 }}
    >
      <div className="h-screen w-full flex md:flex-col sm:flex-col lg:flex-row relative">
        <div className="h-screen w-full flex flex-col justify-center mx-auto gap-y-[20px] pb-[70px] relative">
          <div className="px-4 mb-16 ml-12">
            <h1 className="text-[64px] font-semibold text-[#003266]">
              Selamat Datang!
            </h1>
            <p className="text-[24px] font-medium text-[#003266]">
              Pilihlah peranmu saat ini!
            </p>
          </div>

          <div className="flex flex-col items-center gap-y-[20px] z-10">
            <img
              className="max-w-[440px] max-h-[342px]"
              src={peserta}
              alt="Peserta"
            />
            <div className="items-center flex flex-col gap-y-[20px] relative z-10">
              <h1 className="text-[32px] font-semibold text-[#003266]">
                Sebagai peserta
              </h1>
              <Link to={`/user/login?redirect=${redirectPath}`}>
                <button className="text-white tengah:w-[440px] sm:w-[400px] px-[24px] py-[16px] text-[20px] font-medium bg-[#003266] rounded-[10px]">
                  Masuk
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-[#003266] h-screen w-full flex flex-col items-center justify-center sm:pb-[70px] md:pb-[0px] sm:relative md:relative lg:static">
          <div className="mt-[8rem] relative z-10 flex flex-col items-center gap-y-[20px] mt-[34px]">
            <img
              src={admin}
              alt="Admin"
              className="tengah:max-w-[440px] tengah:max-h-[342px] sm:max-w-[400px] sm:max-h-[300px] "
            />
            <h1 className="text-[32px] font-semibold text-white">
              Sebagai penyelenggara
            </h1>
            <Link to={`/admin/login?redirect=${redirectPath}`}>
              <button className="text-white bg-[#027FFF] rounded-[10px] tengah:w-[440px] sm:w-[400px]  px-[24px] py-[16px] text-[20px] font-medium">
                Masuk
              </button>
            </Link>
          </div>

          <img
            src={circle}
            alt="Circle"
            className="absolute bottom-0 left-0 sm:hidden tengah:block"
          />
        </div>

        <img
          src={circle2}
          alt="Circle2"
          className="max-w-[284px] max-h-[284px] absolute top-[-50px] right-0 overflow-hidden sm:hidden tengah:block"
        />
      </div>
    </motion.div>
  );
}

export default Welcome;
