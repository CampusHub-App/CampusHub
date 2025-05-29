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
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
};

const whiteVariants = {
  initial: { y: "-100%" },
  animate: { y: 0 },
  exit: { y: "-100%" },
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
        setDatas(error.message || "Koneksi Timeout, Silahkan Coba Lagi");
        setShowGagal(true);
        setIsLoading(false);
      }
    }
  };

  return (
    <motion.div
      className="flex h-screen relative"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-5/12 sm:w-1/2 flex flex-col justify-center items-center mb-16 text-balance bg-white sm:px-1"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={whiteVariants}
        transition={{ duration: 0.5 }}
      >
        <div className="tengah:mb-12 tengah:mt-5 sm:mb-5  w-full sm:max-w-[282px] lg:max-w-[420px] max-w-[250px]">
          <h1 className="font-semibold tengah:text-[48px] sm:text-[40px] text-[#003266]">
            Selamat Datang!
          </h1>
        </div>

        <form
          className="w-full flex flex-col max-w-[250px] lg:max-w-[420px] sm:max-w-[282px] items-center"
          onSubmit={handleLogin}
        >
          <div className="mb-6 w-full max-w-[420px]">
            <label
              htmlFor="email"
              className="block mb-2 text-[20px] font-medium text-[#003266]"
            >
              Alamat email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className=" w-full flex justify-center h-[59px] px-4 py-2 border-2 border-[#003266] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6 relative w-full max-w-[420px]">
            <label
              htmlFor="password"
              className="block mb-2 text-[20px] font-medium text-[#003266]"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full h-[59px] px-4 pr-12 py-2 border-2 border-[#003266] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-[#003266]"
              >
                {showPassword ? (
                  <i className="ri-eye-line text-2xl"></i>
                ) : (
                  <i className="ri-eye-close-line text-2xl"></i>
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between w-full mb-6 max-w-[420px]">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-[#003266] border-[#003266] rounded focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-[#003266]">
                Ingat saya
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-[#003266] hover:underline"
              >
                Lupa password?
              </a>
            </div>
          </div>

          <div className="w-full max-w-[420px]">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full px-[24px] py-[16px] text-[20px] font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${isFormValid
                  ? "bg-[#003266] hover:bg-[#002855] focus:ring-[#003266]"
                  : "bg-[#A2A2A2] cursor-not-allowed"
                }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-7 w-7 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
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
                  </svg>
                </div>
              ) : (
                "Masuk"
              )}
            </button>
          </div>
        </form>
      </motion.div>

      {showGagal && (
        <PopUpGagal
          isVisible={showGagal}
          onClose={() => setShowGagal(false)}
          message={datas}
        />
      )}

      <motion.div
        className="w-7/12 sm:w-1/2 bg-[#003266] flex items-center justify-center"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={blueVariants}
        transition={{ duration: 0.5 }}
      >
        <img
          src={circle2}
          alt=""
          className="max-w-[284px] max-h-[284px] absolute top-0 right-0 sm:hidden tengah:block"
        />
        <img src={logo} alt="" />
      </motion.div>

      <img
        src={circle}
        alt="Circle"
        className="absolute bottom-0 left-0 sm:hidden tengah:block"
      />
    </motion.div>
  );
}

export default Loginadmin;
