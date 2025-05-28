import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserProfile, updateUserProfile } from "../../services/api.js";
import Ellipse from "../../assets/image/Ellipse.svg";
import PopUpDelete from "../../components/PopUpDelete.jsx";
import PopUpLogout from "../../components/PopUpLogOut.jsx";
import Navbar from "../../components/Navbar.jsx";
import "../../styles/ProfilePagePersonalInfo.css";
import { motion } from "framer-motion";
import PopUpBerhasil from "../../components/PopUpBerhasil.jsx";
import PopUpGagal from "../../components/PopUpGagal.jsx";

const ProfilePagePersonalInfo = () => {
  const [activePage, setActivePage] = useState("info-personal");
  const [user, setUser] = useState(null);
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);
  const [showLogoutPopUp, setShowLogoutPopUp] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState(null);
  const [showBerhasil, setShowBerhasil] = useState(false);
  const [showGagal, setShowGagal] = useState(false);

  const pageVariants = {
    initial: { opacity: 0.8 },
    animate: { opacity: 1 },
    exit: { opacity: 0.8 },
  };

  const isFormValid = user?.fullname && user?.email && user?.nomor_telepon;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/welcome", { replace: true });
      return;
    }

    const loadUserProfile = async () => {
      try {
        const userData = await fetchUserProfile(token);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoading(false);
    } else {
      loadUserProfile();
    }
  }, [navigate]);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleUpdate = async () => {
    setIsProcessing(true);
    
    try {
      const token = localStorage.getItem("token");
      const userData = {
        name: user.fullname,
        email: user.email,
        phone: user.nomor_telepon,
        photo: image
      };
      
      await updateUserProfile(userData, token);
      
      // Fetch updated user data
      const updatedUserData = await fetchUserProfile(token);
      
      // Update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUserData));
      
      setMessage("Profil berhasil diubah");
      setShowBerhasil(true);
      
      setTimeout(() => {
        window.location.reload();
      }, 2800);
    } catch (error) {
      setMessage(error.message || "Koneksi bermasalah, silahkan coba lagi");
      setShowGagal(true);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      className="font-sans flex flex-col box-border w-full"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 1.6 }}
    >
      <div className="profile-page h-screen">
        <Navbar />
        <div className="mx-4 sm:mx-10 md:mx-20 lg:mx-32">
          {!isLoading ? (
            <div className="content-box px-4 sm:px-8 md:px-16 py-0">
              <div className="header flex flex-col lg:flex-row justify-between lg:py-10 py-6">
                <div className="text-header flex flex-col">
                  <span className="page-title font-semibold text-[24px] lg:text-[32px]">
                    Info Personal
                  </span>
                  <span className="description text-regular text-[14px] lg:text-[18px]">
                    Anda dapat mengubah foto profil dan informasi pribadi di
                    sini.
                  </span>
                </div>
                <span className="title font-semibold text-[24px] lg:text-[32px] mt-4 lg:mt-0">
                  Profil Akun
                </span>
              </div>
              <div className="content flex flex-col sm:flex-row justify-between gap-8">
                <div className="profile flex flex-col lg:flex-row lg:items-start justify-center lg:justify-between lg:w-10/12 py-10">
                  <div className="profile-picture w-[120px] lg:w-2/12 mx-auto rounded-full relative group">
                    <img
                      src={
                        selectedImage ||
                        user.photo ||
                        `https://eu.ui-avatars.com/api/?name=${encodeURIComponent(
                          user.fullname
                        )}&size=250`
                      }
                      alt="Foto Profil"
                      className="w-full aspect-square rounded-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 rounded-full cursor-pointer">
                      <label htmlFor="upload-photo" className="cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 text-white"
                        >
                          <path d="M16.862 3.487a2.5 2.5 0 0 1 3.536 3.536l-10.37 10.37a1.5 1.5 0 0 1-.635.377l-4.657 1.33a.75.75 0 0 1-.92-.92l1.33-4.657a1.5 1.5 0 0 1 .377-.635l10.37-10.37Zm2.475 2.12a1 1 0 0 0-1.414-1.414l-10.37 10.37a.5.5 0 0 0-.126.212l-.92 3.222 3.222-.92a.5.5 0 0 0 .212-.126l10.37-10.37Z" />
                        </svg>
                      </label>
                      <input
                        id="upload-photo"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>

                  <div className="form flex flex-col w-full lg:w-10/12 gap-12 mt-6 lg:mt-0">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:w-11/12 pl-0 lg:pl-12">
                      <div className="form-label flex flex-col gap-6 lg:gap-20 w-full lg:w-4/12">
                        <label
                          htmlFor="name"
                          className="font-semibold text-[16px] lg:text-[20px] hidden sm:block"
                        >
                          Nama
                        </label>
                        <label
                          htmlFor="email"
                          className="font-semibold text-[16px] lg:text-[20px] hidden sm:block"
                        >
                          Alamat Email
                        </label>
                        <label
                          htmlFor="phone"
                          className="font-semibold text-[16px] lg:text-[20px] hidden sm:block"
                        >
                          Nomor Telepon
                        </label>
                      </div>
                      <div className="form-input flex flex-col gap-4 lg:gap-16 w-full lg:w-8/12">
                        <div className="flex flex-col sm:flex-col sm:items-start sm:gap-2">
                          <label
                            htmlFor="name"
                            className="sm:block lg:hidden font-semibold text-[16px]"
                          >
                            Nama
                          </label>
                          <div className="input-box p-3 border-2 border-[#027FFF] rounded-lg hover:shadow-lg transition duration-300 px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              className=" transition duration-300 w-full focus:outline-none"
                              placeholder="Masukkan Nama"
                              value={user?.fullname || ""}
                              onChange={(e) =>
                                setUser((prev) => ({
                                  ...prev,
                                  fullname: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>
                        <div className="relative">
                          <div className="flex flex-col sm:flex-col sm:items-start sm:gap-2">
                            <label
                              htmlFor="email"
                              className="sm:block lg:hidden font-semibold text-[16px]"
                            >
                              Alamat Email
                            </label>
                            <div className="input-box p-3 border-2 border-[#027FFF] rounded-lg hover:shadow-lg transition duration-300 px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none">
                              <input
                                type="email"
                                id="email"
                                name="email"
                                className=" transition duration-300 w-full focus:outline-none"
                                placeholder="Masukkan Email"
                                value={user?.email || ""}
                                onChange={(e) =>
                                  setUser((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                  }))
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="relative">
                          <label
                            htmlFor="phone"
                            className="sm:block lg:hidden font-semibold text-[16px]"
                          >
                            Nomor Telepon
                          </label>
                          <div className="input-box p-3 border-2 border-[#027FFF] rounded-lg hover:shadow-lg transition duration-300 px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none">
                            <span>
                              <input
                                type="text"
                                id="phone"
                                name="phone"
                                className=" transition duration-300 w-full focus:outline-none"
                                placeholder="Masukkan Nomor Telepon"
                                value={user?.nomor_telepon || ""}
                                onChange={(e) =>
                                  setUser((prev) => ({
                                    ...prev,
                                    nomor_telepon: e.target.value,
                                  }))
                                }
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="save-button flex flex-col lg:flex-row gap-4 items-center justify-center py-6 w-full">
                      <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="bg-transparent border-2 border-customBlue font-medium w-full sm:w-1/3 h-11 my-2 rounded-lg text-medium text-black text-[16px] hover:shadow-lg transition duration-30"
                      >
                        Kembali
                      </button>
                      <button
                        type="submit"
                        onClick={handleUpdate}
                        className={`${
                          isFormValid
                            ? "bg-[#027FFF] border-2 border-white font-medium w-full sm:w-1/3 h-11 my-2 rounded-lg text-medium text-white text-[16px] hover:shadow-lg transition duration-30"
                            : "bg-[#A2A2A2] cursor-not-allowed border-2 border-white font-medium w-full sm:w-1/3 h-11 my-2 rounded-lg text-medium text-white text-[16px] transition duration-30"
                        }`}
                        disabled={!isFormValid}
                      >
                        {isProcessing ? (
                          <div className="flex items-center justify-center">
                            <svg
                              className="animate-spin h-5 w-5 text-white-500"
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
                          "Ubah Profil"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="action-list flex flex-col lg:text-right text-center gap-6 lg:gap-11">
                  <ul className="flex flex-col gap-4 lg:gap-11">
                    <li>
                      <Link
                        to="/account/profile"
                        className={`font-regular text-lg ${
                          activePage === "info-personal"
                            ? "font-semibold underline"
                            : ""
                        } hover:underline`}
                        onClick={() => handlePageChange("info-personal")}
                      >
                        Info Personal
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/account/password"
                        className={`font-regular text-lg ${
                          activePage === "password"
                            ? "font-semibold underline"
                            : ""
                        } hover:underline`}
                        onClick={() => handlePageChange("password")}
                      >
                        Password
                      </Link>
                    </li>
                    <li>
                      <button
                        className={`font-regular text-lg ${
                          activePage === "delete-account"
                            ? "font-semibold underline"
                            : ""
                        } hover:underline`}
                        onClick={() => setShowDeletePopUp(true)}
                      >
                        Hapus Akun
                      </button>
                    </li>
                    <li>
                      <button
                        className={`font-regular text-lg ${
                          activePage === "logout"
                            ? "font-semibold underline"
                            : ""
                        } hover:underline`}
                        onClick={() => setShowLogoutPopUp(true)}
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
          <div className="absolute bottom-0 left-0">
            <img src={Ellipse} alt="Background" />
          </div>
          {showDeletePopUp && <PopUpDelete setShowPopUp={setShowDeletePopUp} />}
          {showLogoutPopUp && <PopUpLogout setShowPopUp={setShowLogoutPopUp} />}
          {showBerhasil && (
            <PopUpBerhasil
              isVisible={setShowBerhasil}
              message={message}
              onClose={() => setShowBerhasil(false)}
            />
          )}
          {showGagal && (
            <PopUpGagal
              isVisible={setShowGagal}
              message={message}
              onClose={() => setShowGagal(false)}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePagePersonalInfo;