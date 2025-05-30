import { useState } from "react";
import circle from "../../assets/image/circle.svg";
import circle2 from "../../assets/image/circle2.svg";
import logo from "../../assets/image/logo2.svg";
import { useEffect } from "react";
import { motion } from "framer-motion";
import PopUpGagal from "../../components/PopUpGagal";
import { useNavigate } from "react-router-dom";
import { loginAdmin, fetchUserProfile } from "../../services/api";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const blueVariants = {
  initial: { x: "100%", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "100%", opacity: 0 },
};

const whiteVariants = {
  initial: { x: "-100%", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
};

const formVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, y: -30 },
};

const inputVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

function Loginadmin() {
  const [showGagal, setShowGagal] = useState(false);
  const [datas, setDatas] = useState(null);
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxChange = (e) => {
    setRemember(e.target.checked);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isFormValid = email.trim() !== "" && password.trim() !== "";
  const handleLogin = async (e) => {
    e.preventDefault();

    if (isFormValid) {
      try {
        setIsLoading(true);
        const data = await loginAdmin({ email, password, remember });
        setDatas(data.message);

        if (data.access_token) {
          localStorage.setItem("token", data.access_token);
          localStorage.setItem("token_type", data.token_type);
        }

        try {
          const userData = await fetchUserProfile(data.access_token);
          localStorage.setItem("user", JSON.stringify(userData));
        } finally {
          setTimeout(() => {
            window.location.href = redirectPath;
          }, 200);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
      } catch (error) {
        setDatas(error.data || "Koneksi Timeout, Silahkan Coba Lagi");
        setShowGagal(true);
        setIsLoading(false);
      }
    }
  };

  return (    <motion.div
      className="flex h-screen relative"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{
        duration: 0.6,
        ease: "easeInOut"
      }}
    >      <motion.div
        className="w-5/12 sm:w-1/2 flex flex-col justify-center items-center mb-16 text-balance bg-white sm:px-1"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={whiteVariants}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.15
        }}
      >
        <motion.div 
          className="tengah:mb-12 tengah:mt-5 sm:mb-5  w-full sm:max-w-[282px] lg:max-w-[420px] max-w-[250px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: 0.4
          }}
        >
          <motion.h1 
            className="font-semibold tengah:text-[48px] sm:text-[40px] text-[#003266]"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: 0.5
            }}
          >
            Selamat Datang!
          </motion.h1>
        </motion.div>        <motion.form
          className="w-full flex flex-col max-w-[250px] lg:max-w-[420px] sm:max-w-[282px] items-center"
          onSubmit={handleLogin}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={formVariants}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: 0.7
          }}
        >          <motion.div 
            className="mb-6 w-full max-w-[420px]"
            variants={inputVariants}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: 0.8
            }}
          >
            <motion.label
              htmlFor="email"
              className="block mb-2 text-[20px] font-medium text-[#003266]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.9
              }}
            >
              Alamat email
            </motion.label>
            <motion.input
              type="email"
              id="email"
              name="email"
              className=" w-full flex justify-center h-[59px] px-4 py-2 border-2 border-[#003266] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </motion.div>          <motion.div 
            className="mb-6 relative w-full max-w-[420px]"
            variants={inputVariants}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: 0.9
            }}
          >
            <motion.label
              htmlFor="password"
              className="block mb-2 text-[20px] font-medium text-[#003266]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: 1.0
              }}
            >
              Password
            </motion.label>
            <div className="relative">
              <motion.input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full h-[59px] px-4 pr-12 py-2 border-2 border-[#003266] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your password here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <motion.span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-[#003266]"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                {showPassword ? (
                  <i className="ri-eye-line text-2xl"></i>
                ) : (
                  <i className="ri-eye-close-line text-2xl"></i>
                )}
              </motion.span>
            </div>
          </motion.div>          <motion.div 
            className="flex items-center justify-between w-full mb-6 max-w-[420px]"
            variants={inputVariants}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: 1.0
            }}
          >
            <div className="flex items-center">
              <motion.input
                type="checkbox"
                id="remember"
                name="remember"
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-[#003266] border-[#003266] rounded focus:ring-blue-500 transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
              <motion.label 
                htmlFor="remember" 
                className="ml-2 text-sm text-[#003266]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 1.1
                }}
              >
                Ingat saya
              </motion.label>
            </div>

            <div className="text-sm">
              <motion.a
                href="#"
                className="font-medium text-[#003266] hover:underline transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 1.1
                }}
              >
                Lupa password?
              </motion.a>
            </div>
          </motion.div>          <motion.div 
            className="w-full max-w-[420px]"
            variants={inputVariants}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: 1.1
            }}
          >
            <motion.button
              type="submit"
              disabled={!isFormValid}
              className={`w-full px-[24px] py-[16px] text-[20px] font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ${isFormValid
                  ? "bg-[#003266] hover:bg-[#002855] focus:ring-[#003266]"
                  : "bg-[#A2A2A2] cursor-not-allowed"
                }`}
              whileTap={isFormValid ? { scale: 0.98 } : {}}
              transition={{ duration: 0.2 }}
            >
              {isLoading ? (
                <motion.div 
                  className="flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.svg
                    className="h-7 w-7 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      d="M22 12a10 10 0 01-10 10"
                    ></path>
                  </motion.svg>
                </motion.div>
              ) : (
                "Masuk"
              )}
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>

      {showGagal && (
        <PopUpGagal
          isVisible={showGagal}
          onClose={() => setShowGagal(false)}
          message={datas}
        />
      )}      <motion.div
        className="w-7/12 sm:w-1/2 bg-[#003266] flex items-center justify-center"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={blueVariants}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.1
        }}
      >
        <motion.img
          src={circle2}
          alt=""
          className="max-w-[284px] max-h-[284px] absolute top-0 right-0 sm:hidden tengah:block"
          initial={{ y: -100, opacity: 0, scale: 0.3, rotate: 120 }}
          animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            duration: 1.0,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.8
          }}
        />
        <motion.img 
          src={logo} 
          alt=""
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.6
          }}
        />
      </motion.div>      
      <motion.img
        src={circle}
        alt="Circle"
        className="absolute bottom-0 left-0 sm:hidden tengah:block"
        initial={{ y: 100, opacity: 0, scale: 0.3, rotate: 120 }}
        animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          duration: 1.0,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.9
        }}
      />
    </motion.div>
  );
}

export default Loginadmin;
