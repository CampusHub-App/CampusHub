import { useState, useEffect } from "react";
import logo from "../assets/image/logo.svg";
import logo2 from "../assets/image/logo2.svg";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const darkThemePaths = [
    "/my-events",
    "/account/profile",
    "/account/password",
    "/events/upload",
    "/events/preview",
  ];

  const isDarkTheme = () => {
    const currentPath = location.pathname;
    return darkThemePaths.includes(currentPath) || 
           currentPath.includes(`/my-events/${id}/`) ||
           currentPath.includes(`/events/${id}/`) ||
           currentPath.includes(`/my-participants/${id}/`);
  };

  const getStyles = () => {
    const dark = isDarkTheme();
    return {
      bg: dark ? "bg-[#003266]" : "bg-white",
      text: dark ? "text-white" : "text-[#003266]",
      logo: dark ? logo2 : logo,
      border: dark ? "border-white/70" : "border-[#027FFF]",
      buttonText: dark ? "text-white" : "text-[#027FFF]",
    };
  };

  const aboutus = () => {
    const aboutUsElement = document.getElementById("footer");

    if (!aboutUsElement) {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 200);
    } else {
      setTimeout(() => {
        aboutUsElement.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserData(JSON.parse(user));
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }

    const savedMenuState = localStorage.getItem("isMenuOpen");
    if (savedMenuState === "true") {
      setIsMenuOpen(true);
    }
  }, []);

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    localStorage.setItem("isMenuOpen", newState.toString());
  };

  const styles = getStyles();

  return (
    <nav
      className={`sm:px-[0px] md:p-5 tengah:px-6 ${styles.bg} w-full lg:px-10 xl:px-[85px] py-5`}
    >
      <div className="flex justify-between items-center px-[0px] w-full">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={styles.logo}
            alt="Logo"
            className="hover:scale-105 hover:filter hover:drop-shadow-lg transition duration-300 sm:max-w-[150px] md:max-w-[229px] tengah:max-w-[180px]"
          />
        </Link>
        <ul
          className={`hidden mr-[12rem] lg:flex space-x-8 items-center ${styles.text} text-[20px] font-medium`}
        >
          <Link to="/" className="transition-all duration-3000 hover:scale-105">
            <li>Home</li>
          </Link>
          <Link
            to="/my-events"
            className="transition-all duration-3000 hover:scale-105"
          >
            <li>My Events</li>
          </Link>
          <li>
            <button
              onClick={aboutus}
              className="transition-all duration-3000 hover:scale-105 cursor-pointer"
            >
              About Us
            </button>
          </li>
        </ul>

        <div className="flex justify-center gap-x-3 items-center">
          {isLoading ? (
            <div className="sm:flex gap-x-[20px] sm:gap-x-[10px] item-center text-nowrap pl-[3rem]"></div>
          ) : userData ? (
            <Link to="/account/profile">
              <img
                src={
                  userData.photo ||
                  `https://eu.ui-avatars.com/api/?name=${encodeURIComponent(
                    userData.fullname
                  )}&size=250`
                }
                alt="profile"
                className="w-12 h-12 rounded-full hover:scale-105 transition duration-300 object-cover"
              />
            </Link>
          ) : (
            <div className="sm:flex gap-x-[20px] sm:gap-x-[10px] item-center text-nowrap">
              <Link to="/welcome">
                <button className="hover:scale-105 transition-all duration-300 bg-[#027FFF] border rounded-[10px] text-white sm:text-[15px] font-medium sm:w-[80px] sm:h-[30px] md:w-[155px] md:h-[46px] md:text-[20px] tengah:w-[120px] tengah:h-[36px] tengah:text-[17px]">
                  Login
                </button>
              </Link>
              <Link to="/user/register">
                <button
                  className={`hover:scale-105 transition-all duration-300 ${styles.border} border-2 rounded-[10px] ${styles.buttonText} sm:text-[15px] font-medium sm:w-[80px] sm:h-[30px] md:w-[155px] md:h-[46px] md:text-[20px] tengah:w-[120px] tengah:h-[36px] tengah:text-[17px]`}
                >
                  Sign Up
                </button>
              </Link>
            </div>
          )}

          <button
            onClick={toggleMenu}
            className="lg:hidden flex items-center justify-center p-2 w-10 h-10 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && !isLoading && (
        <div className="lg:hidden mt-4">
          <ul
            className={`flex flex-col space-y-4 ${styles.text} text-[20px] font-medium`}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/my-events">MyEvent</Link>
            </li>
            <li>
              <button
                onClick={aboutus}
                className="transition-all duration-3000 hover:scale-105 cursor-pointer"
              >
                About Us
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;