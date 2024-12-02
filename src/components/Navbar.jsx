import { Link } from "react-router-dom";
import Logo from "../assets/CampusHub.svg";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("https://your-backend-api.com/api/user/profile");
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("Failed to fetch user profile data.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();

    const savedMenuState = localStorage.getItem("isMenuOpen");
    if (savedMenuState === "true") {
      setIsMenuOpen(true);
      setIsMenuVisible(true);
    }
  }, []);

  const handleMenuToggle = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      setTimeout(() => {
        setIsMenuVisible(false);
        localStorage.setItem("isMenuOpen", "false");
      }, 500);
    } else {
      setIsMenuVisible(true);
      setIsMenuOpen(true);
      localStorage.setItem("isMenuOpen", "true");
    }
  };

  return (
    <div className="navbar w-full bg-[#003266] h-20">
      <div className="container mx-auto flex items-center lg:justify-between px-4 sm:px-6 h-full lg:gap-48">
        {/* Logo */}
        <div className="logo sm:w-auto lg:w-auto mx-auto">
          <Link to="#" className="flex items-center">
            <img
              src={Logo}
              alt="Logo"
              className="hover:filter hover:drop-shadow-lg transition duration-300"
            />
          </Link>
        </div>

        <div className="flex md:hidden">
          <button
            onClick={handleMenuToggle}
            className="text-white relative w-8 h-8 flex justify-center items-center focus:outline-none"
          >
            <div
              className={`absolute w-6 h-0.5 bg-white transition-transform duration-500 ease-in-out ${
                isMenuOpen ? "rotate-45" : "-translate-y-2"
              }`}
            />
            <div
              className={`absolute w-6 h-0.5 bg-white transition-all duration-500 ease-in-out ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <div
              className={`absolute w-6 h-0.5 bg-white transition-transform duration-500 ease-in-out ${
                isMenuOpen ? "-rotate-45" : "translate-y-2"
              }`}
            />
          </button>
        </div>

        <ul className="hidden md:flex gap-10 text-white mx-auto">
          <li>
            <Link to="#" className="font-medium text-[20px] hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/my-events" className="font-medium text-[20px] hover:underline">
              MyEvent
            </Link>
          </li>
          <li>
            <a href="#footer" className="font-medium text-[20px] hover:underline">
              About Us
            </a>
          </li>
        </ul>

        {/* Profile */}
        <div className="hidden md:block mx-auto">
          <Link to="/profile-info" className="flex items-center">
            {userData ? (
              <img
                src={userData.profile_picture || "https://via.placeholder.com/150"}
                alt="profile"
                className="w-16 h-16 rounded-full hover:scale-105 transition duration-300"
              />
            ) : (
              <img
                src="https://via.placeholder.com/150"
                alt="profile"
                className="w-12 h-12 rounded-full hover:scale-105 transition duration-300"
              />
            )}
          </Link>
        </div>
      </div>

      {isMenuVisible && (
        <div
          className={`fixed top-0 left-0 w-64 h-full bg-[#003266] text-white z-50 
            ${isMenuOpen ? "animate-slideIn" : "animate-slideOut"} opacity-90`}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={handleMenuToggle}
              className="text-white focus:outline-none"
            >
              <i className="ri-close-line text-2xl" />
            </button>
          </div>

          <div className="flex justify-center mb-4">
            <Link to="/profile-info" className="flex items-center">
              {userData ? (
                <img
                  src={userData.profile_picture || "https://via.placeholder.com/150"}
                  alt="profile"
                  className="w-14 h-14 rounded-full hover:scale-105 transition duration-300"
                />
              ) : (
                <img
                  src="https://via.placeholder.com/150"
                  alt="profile"
                  className="w-14 h-14 rounded-full hover:scale-105 transition duration-300"
                />
              )}
            </Link>
          </div>

          <ul className="flex flex-col gap-6 px-4">
            <li>
              <Link to="#" className="font-medium text-[18px] hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/my-events" className="font-medium text-[18px] hover:underline">
                MyEvent
              </Link>
            </li>
            <li>
              <a href="#footer" className="font-medium text-[18px] hover:underline">
                About Us
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
