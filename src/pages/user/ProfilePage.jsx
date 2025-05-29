import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Ellipse from "../../assets/image/Ellipse.svg";
import PopUpDelete from "../../components/PopUpDelete.jsx";
import PopUpLogout from "../../components/PopUpLogOut.jsx";
import Navbar from "../../components/Navbar.jsx";
import "../../styles/ProfilePagePersonalInfo.css";
import { motion } from "framer-motion";
import PopUpBerhasil from "../../components/PopUpBerhasil";
import PopUpGagal from "../../components/PopUpGagal";
import { fetchUserProfile, updateUserProfile } from "../../services/api.js";

const ProfilePagePersonalInfo = () => {
  const [activePage, setActivePage] = useState("info-personal");
  const [user, setUser] = useState(null);
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);  const [showLogoutPopUp, setShowLogoutPopUp] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [datas, setDatas] = useState(null);
  const [showBerhasil, setShowBerhasil] = useState(false);
  const [showGagal, setShowGagal] = useState(false);
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_STORAGE_BASE_URL;
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.7,
        delay: 0.2,
        ease: "easeOut",
      },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.4,
        ease: "easeOut",
      },
    },
  };

  const profilePictureVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.5,
        ease: "easeOut",
      },
    },
  };const formContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.6,
        ease: "easeOut",
      },
    },
  }; const nameFieldVariants = {
    hidden: { opacity: 0, x: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.0,
        ease: "easeOut",
      },
    },
  };

  const emailFieldVariants = {
    hidden: { opacity: 0, x: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.25,
        ease: "easeOut",
      },
    },
  };

  const phoneFieldVariants = {
    hidden: { opacity: 0, x: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.5,
        ease: "easeOut",
      },
    },
  };

  const buttonContainerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.3,
        ease: "easeOut",
      },
    },
  };
  const sidebarVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: 0.8,
        ease: "easeOut",
      },
    },
  };

  const isFormValid = user?.fullname && user?.email && user?.nomor_telepon;
  useEffect(() => {
    if (!token) {
      navigate("/welcome", { replace: true });
      return;
    }

    setUser(JSON.parse(localStorage.getItem("user")));

  }, []);

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
    const formData = new FormData();
    formData.append("name", user.fullname);
    formData.append("email", user.email);
    formData.append("phone", user.nomor_telepon);
    if (selectedImage) {
      formData.append("photo", image);
    }

    try {
      await updateUserProfile(formData, token);

      try {
        const data = await fetchUserProfile(token);

        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(data));
        setDatas("Profil berhasil diubah");
        setShowBerhasil(true);
        setTimeout(() => {
          window.location.reload();
        }, 2800);

      } catch (error) {
        setDatas(error.data || "Koneksi bermasalah, silahkan coba lagi");
        setShowGagal(true);
      } finally {
        setIsProcessing(false);
      }
    } catch (error) {
      setDatas(error.data || "Koneksi bermasalah, silahkan coba lagi");
      setShowGagal(true);
    } finally {
      setIsProcessing(false);
    }
  };  return (
    <div
      className="font-sans flex flex-col box-border w-full"
    >
      <div className="profile-page h-screen">
        <Navbar />
        <motion.div
          className="mx-4 sm:mx-10 md:mx-20 lg:mx-32"
          variants={containerVariants}
          initial="hidden"
          animate="visible"        >          {user ? (<div className="content-box px-4 sm:px-8 md:px-16 py-0">
            <div className="header flex flex-col lg:flex-row justify-between lg:py-10 py-6">
              <motion.div 
                className="text-header flex flex-col"
                variants={headerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.span
                  className="page-title font-semibold text-[24px] lg:text-[32px]"
                  variants={titleVariants}
                >
                  Info Personal
                </motion.span>
                <motion.span
                  className="description text-regular text-[14px] lg:text-[18px]"
                  variants={descriptionVariants}
                >
                  Anda dapat mengubah foto profil dan informasi pribadi di
                  sini.
                </motion.span>
              </motion.div>
              <span
                className="title font-semibold text-[24px] lg:text-[32px] mt-4 lg:mt-0"
              >
                Profil Akun
              </span>
            </div>

            <div className="content flex flex-col sm:flex-row justify-between gap-8">
              <div className="profile flex flex-col lg:flex-row lg:items-start justify-center lg:justify-between lg:w-10/12 py-10">
                <motion.div
                  className="profile-picture w-[120px] lg:w-2/12 mx-auto rounded-full relative group"
                  variants={profilePictureVariants}
                >                  <img
                    src={
                      selectedImage ||
                      (user?.photo ? `${API}/${user.photo}` : null) ||
                      `https://eu.ui-avatars.com/api/?name=${encodeURIComponent(
                        user?.fullname || "User"
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
                      onChange={handleImageChange} />
                  </div>
                </motion.div>

                <motion.div
                  className="form flex flex-col w-full lg:w-10/12 gap-12 mt-6 lg:mt-0"
                  variants={formContainerVariants}
                >                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:w-11/12 pl-0 lg:pl-12">
                    <div className="form-label flex flex-col gap-6 lg:gap-20 w-full lg:w-4/12">
                      <motion.label
                        htmlFor="name"
                        className="font-semibold text-[16px] lg:text-[20px] hidden sm:block"
                        variants={nameFieldVariants}
                      >
                        Nama
                      </motion.label>
                      <motion.label
                        htmlFor="email"
                        className="font-semibold text-[16px] lg:text-[20px] hidden sm:block"
                        variants={emailFieldVariants}
                      >
                        Alamat Email
                      </motion.label>
                      <motion.label
                        htmlFor="phone"
                        className="font-semibold text-[16px] lg:text-[20px] hidden sm:block"
                        variants={phoneFieldVariants}
                      >
                        Nomor Telepon
                      </motion.label>
                    </div>
                    <div className="form-input flex flex-col gap-4 lg:gap-16 w-full lg:w-8/12">
                      <motion.div
                        className="flex flex-col sm:flex-col sm:items-start sm:gap-2"
                        variants={nameFieldVariants}
                      >
                        <label
                          htmlFor="name"
                          className="sm:block lg:hidden font-semibold text-[16px]"
                        >
                          Nama
                        </label>
                        <motion.div
                          className="input-box p-3 border-2 border-[#027FFF] rounded-lg hover:shadow-lg transition duration-300 px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
                          whileHover={{ scale: 1.02 }}
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
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
                        </motion.div>
                      </motion.div>
                      <motion.div
                        className="relative"
                        variants={emailFieldVariants}
                      >
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
                      </motion.div>
                      <motion.div
                        className="relative"
                        variants={phoneFieldVariants}
                      >
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
                      </motion.div>
                    </div>
                  </div>
                  <motion.div
                    className="save-button flex flex-col lg:flex-row gap-4 items-center justify-center py-6 w-full"
                    variants={buttonContainerVariants}
                  >
                    <motion.button
                      type="button"
                      onClick={() => navigate("/")}
                      className="bg-transparent border-2 border-customBlue font-medium w-full sm:w-1/3 h-11 my-2 rounded-lg text-medium text-black text-[16px] hover:shadow-lg transition duration-30"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      Kembali
                    </motion.button>
                    <motion.button
                      type="submit"
                      onClick={handleUpdate}
                      className={`${isFormValid
                        ? "bg-[#027FFF] border-2 border-white font-medium w-full sm:w-1/3 h-11 my-2 rounded-lg text-medium text-white text-[16px] hover:shadow-lg transition duration-30"
                        : "bg-[#A2A2A2] cursor-not-allowed border-2 border-white font-medium w-full sm:w-1/3 h-11 my-2 rounded-lg text-medium text-white text-[16px] transition duration-30"
                        }`}
                      disabled={!isFormValid}
                      whileHover={isFormValid ? { scale: 1.05 } : {}}
                      whileTap={isFormValid ? { scale: 0.95 } : {}}
                      transition={{ duration: 0.2 }}
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
                        </div>) : (
                        "Ubah Profil"
                      )}
                    </motion.button>
                  </motion.div>                  </motion.div>              </div>                <div
                className="action-list flex flex-col lg:text-right text-center gap-6 lg:gap-11"
              >
                <ul className="flex flex-col gap-4 lg:gap-11">
                  <li>
                    <Link
                      to="/account/profile"
                      className={`font-regular text-lg ${activePage === "info-personal"
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
                      className={`font-regular text-lg ${activePage === "password"
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
                      className={`font-regular text-lg ${activePage === "delete-account"
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
                      className={`font-regular text-lg ${activePage === "logout"
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
          </div>          ) : null}
          <motion.div 
            className="absolute bottom-0 left-0"
          >
            <img src={Ellipse} alt="Background" />
          </motion.div>{showDeletePopUp && <PopUpDelete setShowPopUp={setShowDeletePopUp} />}
          {showLogoutPopUp && <PopUpLogout setShowPopUp={setShowLogoutPopUp} />}          {showBerhasil && (<PopUpBerhasil isVisible={setShowBerhasil} message={datas} onClose={() => setShowBerhasil(false)} />)}
          {showGagal && (<PopUpGagal isVisible={setShowGagal} message={datas} onClose={() => setShowGagal(false)} />)}
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePagePersonalInfo;