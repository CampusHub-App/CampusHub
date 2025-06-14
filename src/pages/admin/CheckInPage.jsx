import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Ellipse from "../../assets/image/Ellipse.svg";
import Ellipse2 from "../../assets/image/Ellipse2.svg";
import "../../styles/KodeUnik.css";
import { useParams } from "react-router-dom";
import PopUpGagal from "../../components/PopUpGagal";
import PopUpBerhasil from "../../components/PopUpBerhasil";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { checkInParticipant } from "../../services/api";

const KodeUnik = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [fadeClass, setFadeClass] = useState("fade-in");
  const navigate = useNavigate();
  const { id } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [showGagal, setShowGagal] = useState(false);
  const [datas, setDatas] = useState(null);
  const [user, setUser] = useState(null);
  const lokasi = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate(`/welcome?redirect=${encodeURIComponent(lokasi.pathname)}`);
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (!user.is_admin) {
        navigate("/", { replace: true });
        return;
      }
    }
  }, []);

  const handleNavigation = () => {
    setFadeClass("fade-out");
    setTimeout(() => {
      navigate(`/my-events/${id}/participants`);
    }, 1000);
  };
  const handleCheckIn = async () => {
    try {
      setIsLoading(true);
      const data = await checkInParticipant(id, code.join(""), localStorage.getItem("token"));
      setDatas(data.message);
      setUser(data.name);
      setShowPopup(true);
    } catch (error) {
      setDatas(error.data || "Koneksi bermasalah, silahkan coba lagi");
      setShowGagal(true);
    } finally {
      setCode(["", "", "", ""]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/welcome", { replace: true });
      return;
    }

    document.getElementById(`input-0`).focus();
  }, []);

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    const newCode = [...code];

    if (value.match(/^[a-zA-Z0-9]$/)) {
      newCode[index] = value;
      setCode(newCode);
    }
  };

  const handleBackspace = (e, index) => {
    const newCode = [...code];
    if (e.key === "Backspace") {
      newCode[index] = "";
      setCode(newCode);

      if (index > 0) {
        document.getElementById(`input-${index - 1}`).focus();
      }
    } else if (e.key === "ArrowLeft") {
      if (index > 0) {
        document.getElementById(`input-${index - 1}`).focus();
      }
    } else if (e.key === "ArrowRight") {
      if (index < code.length - 1) {
        document.getElementById(`input-${index + 1}`).focus();
      }
    } else if (e.key === "Delete") {
      newCode[index] = "";
      setCode(newCode);

      if (index < code.length - 1) {
        document.getElementById(`input-${index + 1}`).focus();
      }
    } else if (/^[a-zA-Z0-9]$/.test(e.key)) {
      if (code[index] !== "") {
        document.getElementById(`input-${index + 1}`).focus();
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="unique-code h-auto mt-12 mx-8 sm:mx-18 lg:mx-32 flex items-center justify-center">
        <div
          className={`container w-full sm:w-3/4 lg:w-4/6 h-auto sm:h-11/12 py-2 bg-white shadow-lg rounded-2xl flex flex-col items-center ${fadeClass}`}
        >
          <div className="content-box flex flex-col items-center py-8 sm:px-8 lg:px-12">
            <h1 className="font-semibold text-[26px] sm:text-[34px] lg:text-[42px] text-center">
              Masukkan Kode Tiket
            </h1>
            <p className="font-regular text-[14px] sm:text-[16px] lg:text-[16px] text-center py-4 sm:py-8">
              Masukkan kode unik sebagai bukti pemesanan tiket peserta.
              <br />
              Perhatikan kode dengan baik dan daftarkan peserta terdaftar dalam
              acara Anda.
            </p>            
            <div className="unique-code bg-[#027FFF] w-fit flex flex-col mb-4 items-center px-6 py-6 rounded-xl mx-auto">              <form className="unique-code-output flex gap-2 sm:gap-4 justify-center">
              {code.map((char, index) => (
                <input
                  key={index}
                  id={`input-${index}`}
                  type="text"
                  maxLength={1}
                  value={char}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                  className="w-12 h-14 sm:w-16 sm:h-20 lg:w-20 lg:h-24 text-center text-[16px] sm:text-[24px] lg:text-[32px] font-bold border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0"
                />
              ))}
            </form>
            </div>

            <div className="border-t-2 border-[#003266] w-8/12 my-3 sm:my-6"></div>
            <button
              className="bg-[#027FFF] border-2 border-white font-regular w-3/4 sm:w-1/2 lg:w-1/2 h-10 sm:h-11 my-1 sm:my-2 rounded-lg text-medium text-white text-[14px] sm:text-[16px]"
              onClick={handleCheckIn}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-7 w-7 text-white-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="white"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="none"
                      stroke="white"
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

            <button
              className="bg-transparent border-2 border-[#027FFF] font-regular w-3/4 sm:w-1/2 lg:w-1/2 h-10 sm:h-11 my-1 sm:my-2 rounded-lg text-medium text-black text-[14px] sm:text-[16px]"
              onClick={handleNavigation}
            >
              Kembali
            </button>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 -z-10">
          <img
            src={Ellipse}
            alt="Background"
            className="w-[200px] sm:w-[50px] lg:w-[300px]"
          />
        </div>
        <div className="fixed bottom-0 right-0 -z-10">
          <img
            src={Ellipse2}
            alt="Background"
            className="w-[200px] sm:w-[50px] lg:w-[300px]"
          />
        </div>
        {showPopup && (
          <PopUpBerhasil
            isVisible={showPopup}
            onClose={() => setShowPopup(false)}
            message={datas}
            user={user}
          />
        )}
        {showGagal && (
          <PopUpGagal
            isVisible={showGagal}
            onClose={() => setShowGagal(false)}
            message={datas}
          />
        )}
      </div>
    </div>
  );
};

export default KodeUnik;