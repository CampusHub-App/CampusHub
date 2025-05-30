import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/api";
import circle from "../../assets/image/circle.svg";
import circle2 from "../../assets/image/circle4.svg";
import logo from "../../assets/image/logo2.svg";
import { useEffect, useState } from "react";
import PopUpGagal from "../../components/PopUpGagal";
import PopUpBerhasil from "../../components/PopUpBerhasil";

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
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

const inputVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

function Signinpeserta() {
  const [showPopup, setShowPopup] = useState(false);
  const [showGagal, setShowGagal] = useState(false);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/", { replace: true });
      return;
    }
  }, [navigate]);

  const params = new URLSearchParams(location.search);
  const redirectPath = params.get("redirect") || "/";

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    telepon: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage("");
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setFormData({ ...formData, telepon: value });
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.telepon.length < 11) {
      setErrorMessage("Nomor telepon harus memiliki minimal 11 digit!");
      return;
    }

    setLoading(true);
    try {
      const userData = {
        name: formData.nama,
        email: formData.email,
        password: formData.password,
        phone: formData.telepon,
      };

      const responseData = await register(userData);
      setData("Registrasi berhasil!");
      setShowPopup(true);

      setTimeout(() => {
        navigate(`/user/login?redirect=${redirectPath}`);
      }, 1000);
    } catch (error) {
      setData(error.message || "Koneksi Timeout, Silahkan Coba Lagi");
      setShowGagal(true);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = Object.values(formData).every(
    (value) => value.trim() !== ""
  );

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };  return (
    <motion.div
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
        className="w-5/12 sm:w-1/2 flex mb-32 flex-col justify-center items-center sm:px-1 bg-white"
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
          className="mb-10 sm:max-w-[282px] lg:max-w-[420px] max-w-[250px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: 0.4
          }}
        >
          <motion.h1 
            className="font-semibold lg:text-[48px] sm:text-[40px] text-[#003266]"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: 0.5
            }}
          >
            Daftar Sekarang!
          </motion.h1>
          <motion.p 
            className="text-[#003266] font-normal lg:text-[24px] text-[17px]"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: 0.6
            }}
          >
            Buat akun anda di Campus Hub
          </motion.p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="w-full flex flex-col max-w-[250px] lg:max-w-[420px] sm:max-w-[282px] items-center"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={formVariants}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: 0.7
          }}
        >
          <motion.div 
            className="mb-6 w-full max-w-[420px]"
            variants={inputVariants}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: 0.8
            }}
          >
            <motion.label
              htmlFor="nama"
              className="block mb-2 text-[20px] font-medium text-[#003266]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.9
              }}
            >
              Nama
            </motion.label>
            <motion.input
              type="text"
              id="nama"
              name="nama"
              placeholder="Your Name"
              className="w-full h-[59px] px-4 py-2 border-2 border-[#003266] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              value={formData.nama}
              onChange={handleChange}
              required
            />
          </motion.div>

          <motion.div 
            className="mb-6 w-full max-w-[420px]"
            variants={inputVariants}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: 0.9
            }}
          >
            <motion.label
              htmlFor="email"
              className="block mb-2 text-[20px] font-medium text-[#003266]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: 1.0
              }}
            >
              Alamat email
            </motion.label>
            <motion.input
              type="email"
              id="email"
              name="email"
              className="w-full h-[59px] px-4 py-2 border-2 border-[#003266] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </motion.div>

          <motion.div 
            className="mb-6 relative w-full max-w-[420px]"
            variants={inputVariants}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: 1.0
            }}
          >
            <motion.label
              htmlFor="password"
              className="block mb-2 text-[20px] font-medium text-[#003266]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: 1.1
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
                value={formData.password}
                onChange={handleChange}
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
          </motion.div>

          <motion.div 
            className="mb-6 w-full max-w-[420px]"
            variants={inputVariants}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: 1.1
            }}
          >
            <motion.label
              htmlFor="telepon"
              className="block mb-2 text-[20px] font-medium text-[#003266]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: 1.2
              }}
            >
              No Telepon
            </motion.label>
            <motion.input
              type="text"
              id="telepon"
              name="telepon"
              className="w-full h-[59px] px-4 py-2 border-2 border-[#003266] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              value={formData.telepon}
              onChange={handlePhoneChange}
              placeholder="08123456789"
              required
            />
            {errorMessage && (
              <motion.p 
                className="text-red-500 text-sm mt-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {errorMessage}
              </motion.p>
            )}
          </motion.div>

          {responseMessage && (
            <motion.p
              className={`text-sm mt-2 ${errorMessage ? "text-red-500" : "text-green-500"
                }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {responseMessage}
            </motion.p>
          )}

          <motion.div
            className="w-full max-w-[420px]"
            variants={inputVariants}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: 1.2
            }}
          >
            <motion.button
              type="submit"
              disabled={!isFormValid || loading}
              className={`w-full max-w-[420px] px-[24px] py-[16px] text-[20px] font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ${isFormValid
                  ? "bg-[#003266] hover:bg-blue-800 focus:ring-[#003266]"
                  : "bg-[#A2A2A2] cursor-not-allowed"
                }`}
              whileTap={isFormValid ? { scale: 0.98 } : {}}
              transition={{ duration: 0.2 }}
            >
              {loading ? (
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
                "Daftar"
              )}
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>

      <motion.img
        src={circle}
        alt=""
        className="absolute max-w-[284px] max-h-[284px] bottom-0 left-0 sm:hidden tengah:block"
        initial={{ opacity: 0, scale: 0.3, rotate: 180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          duration: 1.0,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.9
        }}
      />
      <motion.img
        src={circle2}
        alt=""
        className="absolute max-w-[284px] max-h-[284px] top-0 right-0 sm:hidden tengah:block"
        initial={{ opacity: 0, scale: 0.3, rotate: 180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          duration: 1.0,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.8
        }}
      />

      {showPopup && (
        <PopUpBerhasil
          isVisible={showPopup}
          onClose={() => setShowPopup(false)}
          message={data}
        />
      )}
      {showGagal && (
        <PopUpGagal
          isVisible={showGagal}
          onClose={() => setShowGagal(false)}
          message={data}
        />
      )}

      <motion.img
        src={circle}
        alt="Circle"
        className="absolute bottom-0 left-0 sm:hidden tengah:block"
        initial={{ opacity: 0, scale: 0.3, rotate: 180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          duration: 1.0,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.9
        }}
      />      <motion.div 
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
    </motion.div>
  );
}

export default Signinpeserta;