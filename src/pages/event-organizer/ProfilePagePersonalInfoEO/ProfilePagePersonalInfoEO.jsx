import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Profile from "../../../assets/Profile.svg";
import Verify from "../../../assets/Verify.svg";
import Ellipse from "../../../assets/Ellipse.svg";
import PopUpUpdate from "../../../components/PopUpUpdate";
import PopUpDelete from "../../../components/PopUpDelete";
import PopUpLogout from "../../../components/PopUpLogout";
import "../ProfilePagePersonalInfoEO/ProfilePagePersonalInfoEO.css"

const ProfilePagePersonalInfoEO = () => {
  const [activePage, setActivePage] = useState("info-personal");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);
  const [showLogoutPopUp, setShowLogoutPopUp] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);

    const fetchProfileData = async () => {
      try {
        const response = await fetch("https://example.com/api/user/profile");
        const data = await response.json();

        if (data.profileImage) {
          setProfileImage(data.profileImage);
        } else {
          setProfileImage(Profile);
        }

        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const handleEmailChange = (e) => {
    const emailInput = e.target.value;
    setEmail(emailInput);

    if (emailInput === "") {
      setEmailError("");
    } else {
      const isValid = emailInput.includes("@") && emailInput.includes(".");
      setIsEmailValid(isValid);
      setEmailError(isValid ? "" : "Masukkan E-mail yang valid (ex: hasbimeong1@.gmail.com)");
    }
    validateForm();
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "name") {
      setName(value);
      if (value === "") {
        setEmailError("");
      }
    }

    if (id === "phone") {
      const regex = /^[0-9]*$/;
      if (regex.test(value)) {
        setPhone(value);
        setPhoneError("");
      } else {
        setPhoneError("Masukkan nomor telepon yang valid (Hanya berupa angka).");
      }
    }

    if (value === "") {
      setPhoneError("");
    }

    validateForm();
  };

  const validateForm = () => {
    setIsFormValid(name.trim() !== "" && isEmailValid && phone.trim() !== "");
  };

  const handleSave = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    const updatedData = {
      name,
      email,
      phone,
    };

    try {
      const response = await fetch("https://example.com/api/user/profile/update", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      setTimeout(() => {
        setShowPopUp(true);
        setIsSubmitting(false);
        resetFormFields();
      }, 1000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setIsSubmitting(false);
      alert("An error occurred while updating your profile.");
    }
  };

  const resetFormFields = () => {
    setEmail("");
    setName("");
    setPhone("");
    setIsEmailValid(false);
    setPhoneError("");
    setEmailError("");
    setIsFormValid(false);
  };

  return (
<div className="profile-page h-[1024px] pt-10 mx-4 sm:mx-10 md:mx-20 lg:mx-32">
  <div className={`container ${showAnimation ? "animate-slide-up" : ""}`}
      style={{
        transition: "transform 0.8s ease-out",
      }}>
    <div className="content-box px-4 sm:px-8 md:px-16">
      <div className="header flex flex-col lg:flex-row justify-between lg:py-10 py-6">
        <div className="text-header flex flex-col">
          <span className="page-title font-semibold text-[24px] lg:text-[32px]">Info Personal</span>
          <span className="description text-regular text-[14px] lg:text-[18px]">
            You can update your profile photo and personal details here.
          </span>
        </div>
        <span className="title font-semibold text-[24px] lg:text-[32px] mt-4 lg:mt-0">Profile Akun</span>
      </div>
      <div className="content flex flex-col sm:flex-row justify-between gap-8">
        <div className="profile flex flex-col lg:flex-row lg:items-start justify-center lg:justify-between lg:w-10/12 py-10">
          <div className="profile-picture w-[120px] lg:w-2/12 mx-auto lg:mx-0 rounded-full">
            <img
              src={profileImage || Profile}
              alt="Profile Picture"
              className="w-full rounded-full"
            />
          </div>
          <div className="form flex flex-col w-full lg:w-10/12 gap-12 mt-6 lg:mt-0">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:w-11/12 pl-0 lg:pl-12">
            <div className="form-label flex flex-col gap-6 lg:gap-20 w-full lg:w-4/12">
              <label htmlFor="name" className="font-semibold text-[16px] lg:text-[20px] hidden sm:block">Name</label>
              <label htmlFor="email" className="font-semibold text-[16px] lg:text-[20px] hidden sm:block">Email Address</label>
              <label htmlFor="phone" className="font-semibold text-[16px] lg:text-[20px] hidden sm:block">No. Telp</label>
            </div>
            <div className="form-input flex flex-col gap-4 lg:gap-16 w-full lg:w-4/5">
                <div className="flex flex-col sm:flex-col sm:items-start sm:gap-2">
                  <label htmlFor="name" className="sm:block lg:hidden font-semibold text-[16px]">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleInputChange}
                    placeholder="Masukkan Nama Anda..."
                    className="p-3 border border-customBlue rounded-lg hover:shadow-lg transition duration-300 px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="relative">
                  <div className="flex flex-col sm:flex-col sm:items-start sm:gap-2">
                    <label htmlFor="email" className="sm:block lg:hidden font-semibold text-[16px]">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Masukkan Alamat E-mail Anda..."
                      className="p-3 border border-customBlue rounded-lg hover:shadow-lg transition duration-300 px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
                      disabled={isSubmitting}
                    />
                    {isEmailValid && !isSubmitting && (
                      <span className="absolute right-3 py-2 animate-fade-in" style={{ animationDuration: "1s" }}>
                        <img
                          src={Verify}
                          alt="Valid Email"
                          className="w-6 h-6"
                        />
                      </span>
                    )}
                  </div>
                  {emailError && !isSubmitting && (
                    <div className="error-popup absolute left-0 top-full mt-2 p-3 w-full rounded-lg border-2 border-red-500 bg-red-100 text-red-500 text-sm shadow-lg z-10">
                      {emailError}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <label htmlFor="phone" className="sm:block lg:hidden font-semibold text-[16px]">No. Telp</label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={handleInputChange}
                    placeholder="Masukkan Nomor Telepon Anda..."
                    className="p-3 border border-customBlue rounded-lg hover:shadow-lg transition duration-300 px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
                    disabled={isSubmitting}
                  />
                  {phoneError && !isSubmitting && (
                    <div className="error-popup absolute left-0 top-full mt-2 p-3 w-full rounded-lg border-2 border-red-500 bg-red-100 text-red-500 text-sm shadow-lg z-10">
                      {phoneError}
                    </div>
                  )}
                </div>
              </div>
            </div>            
            <div className="save-button flex flex-col lg:flex-row gap-4 items-center justify-center py-6 w-full">
              <button
                type="button"
                className="bg-transparent border-2 border-customBlue font-medium w-full lg:w-1/3 h-11 rounded-lg text-medium text-black text-[16px] hover:shadow-lg transition duration-300"
              >
                Kembali
              </button>
              <button
                type="submit"
                className={`${
                  isFormValid && !isSubmitting
                    ? "bg-customBlue border-2 border-white font-medium w-full lg:w-1/3 h-11 rounded-lg text-medium text-white text-[16px] hover:shadow-lg transition duration-300"
                    : "bg-[#A2A2A2] cursor-not-allowed border-2 border-white font-medium w-full lg:w-1/3 h-11 rounded-lg text-medium text-white text-[16px] transition duration-300"
                }`}
                disabled={!isFormValid || isSubmitting}
                onClick={handleSave}
              >
                {isSubmitting ? "Saving..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>

        <div className="action-list flex flex-col lg:text-right text-center gap-6 lg:gap-11">
          <ul className="flex flex-col gap-4 lg:gap-11">
            <li>
              <Link to="/profile-infoEO"
                className={`font-regular text-lg ${activePage === "info-personal" ? "font-semibold underline" : ""} hover:underline`}
                onClick={() => handlePageChange("info-personal")}>
                Info Personal
              </Link>
            </li>
            <li>
              <Link to="/profile-passwordEO"
                className={`font-regular text-lg ${activePage === "password" ? "font-semibold underline" : ""} hover:underline`}
                onClick={() => handlePageChange("password")}>
                Password
              </Link>
            </li>
            <li>
              <button
                className={`font-regular text-lg ${activePage === "delete-account" ? "font-semibold underline" : ""} hover:underline`}
                onClick={(e) => {
                  e.preventDefault();
                  setShowDeletePopUp(true);
                }}>
                Hapus Akun
              </button>
            </li>
            <li>
              <button
                className={`font-regular text-lg ${activePage === "delete-account" ? "font-semibold underline" : ""} hover:underline`}
                onClick={(e) => {
                  e.preventDefault();
                  setShowLogoutPopUp(true);
                }}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </div>
    <div className="fixed bottom-0 left-0 -z-10">
      <img
        src={Ellipse}
        alt="Background"
        className="w-[200px] lg:w-[300px]"
      />
    </div>
    {showDeletePopUp && <PopUpDelete setShowPopUp={setShowDeletePopUp} />}
    {showLogoutPopUp && <PopUpLogout setShowPopUp={setShowLogoutPopUp} />}
    {showPopUp && <PopUpUpdate setShowPopUp={setShowPopUp} />}
  </div>
  );
};

export default ProfilePagePersonalInfoEO;