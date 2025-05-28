import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/api";
import circle from "./assets/image/circle3.svg";
import circle2 from "./assets/image/circle4.svg";
import logo from "./assets/image/logo2.svg";
import { useEffect, useState } from "react";
import PopUpGagal from "../../components/PopUpGagal";
import PopUpBerhasil from "../../components/PopUpBerhasil";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
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
  };

  return (
    <motion.div
      className="delay-100 transition-transform flex relative min-h-screen h-[1024px] xl:h-[1024px]"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 1 }}
    >
      <div className="tengah:w-5/12 sm:w-1/2 flex mb-32 flex-col justify-center items-center sm:px-1 tengah:px-0 bg-white">
        <div className="mb-10 sm:max-w-[282px] lg:max-w-[420px] max-w-[250px]">
          <h1 className="font-semibold lg:text-[48px] sm:text-[40px] text-[#003266]">
            Daftar Sekarang!
          </h1>
          <p className="text-[#003266] font-normal lg:text-[24px] text-[17px]">
            Buat akun anda di Campus Hub
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col max-w-[250px] lg:max-w-[420px] sm:max-w-[282px] items-center"
        >
          <div className="mb-6 w-full max-w-[420px]">
            <label
              htmlFor="nama"
              className="block mb-2 text-[20px] font-medium text-[#003266]"
            >
              Nama
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              placeholder="Your Name"
              className="w-full h-[59px] px-4 py-2 border-2 border-[#003266] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.nama}
              onChange={handleChange}
              required
            />
          </div>

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
              className="w-full h-[59px] px-4 py-2 border-2 border-[#003266] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
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

          <div className="mb-6 w-full max-w-[420px]">
            <label
              htmlFor="telepon"
              className="block mb-2 text-[20px] font-medium text-[#003266]"
            >
              No Telepon
            </label>
            <input
              type="text"
              id="telepon"
              name="telepon"
              className="w-full h-[59px] px-4 py-2 border-2 border-[#003266] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.telepon}
              onChange={handlePhoneChange}
              placeholder="08123456789"
              required
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
          </div>

          {responseMessage && (
            <p
              className={`text-sm mt-2 ${
                errorMessage ? "text-red-500" : "text-green-500"
              }`}
            >
              {responseMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`w-full max-w-[420px] px-[24px] py-[16px] text-[20px] font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isFormValid
                ? "bg-[#003266] hover:bg-blue-800 focus:ring-[#003266]"
                : "bg-[#A2A2A2] cursor-not-allowed"
            }`}
          >
            {loading ? "Mengirim..." : "Daftar"}
          </button>
        </form>
      </div>

      <img
        src={circle}
        alt=""
        className="absolute max-w-[284px] max-h-[284px] bottom-0 left-0 sm:hidden tengah:block"
      />
      <img
        src={circle2}
        alt=""
        className="absolute max-w-[284px] max-h-[284px] top-0 right-0 sm:hidden tengah:block"
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

      <div className="tengah:w-7/12 sm:w-1/2 bg-[#003266] flex items-center justify-center">
        <img src={logo} alt="" />
      </div>
    </motion.div>
  );
}

export default Signinpeserta;