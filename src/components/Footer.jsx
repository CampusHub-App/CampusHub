import { Link, useLocation } from "react-router-dom";
import logo from "../assets/image/CampusHub.svg";
import facebook from "../assets/image/Facebook.svg";
import instagram from "../assets/image/Instagram.svg";
import Linkedin from "../assets/image/Linkedin.svg";
import tiktok from "../assets/image/TikTok.svg";
import x from "../assets/image/X.svg";

const Footer = () => {
  const location = useLocation();

  const isLandingPage = location.pathname === "/";
  const isHomePage = location.pathname === "/home";
  const isAdminPage = location.pathname === "/admin";

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative footer bg-[#003266] w-full transition all z-10" id="footer">
      <div className="w-full">
        <div className="content-box mx-20">
          <div className="footer-box flex sm:flex-col lg:flex-row gap-72 sm:gap-y-20 mx-auto">
            <div className="about-us">
              <div className="logo mt-24 pb-8">
                <Link
                  to={"/"}
                  onClick={handleScrollToTop}
                >
                  <img src={logo} alt="Logo" />
                </Link>
              </div>
              <div className="address text-white text-medium text-[14px] lg:mb-20 sm:mb-10">
                <p>Gedung Rektorat Lantai 2</p>
                <p>Jl. Veteran No.10-11, Ketawanggede</p>
                <p>Kec. Lowokwaru, Kota Malang, Jawa Timur, 65145</p>
              </div>
              <div className="contact">
                <span className="text-white text-bold text-[16px] py-4 block">
                  Subscribe Email
                </span>
                <p className="text-white text-[14px] text-medium">
                  Get the best new products in your inbox, every day.
                </p>
                <p className="text-white text-[14px] text-medium">
                  Get the latest content first
                </p>
                <div className="social-media flex gap-4 my-8">
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={facebook} alt="Facebook" className="text-4xl" />
                  </a>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={instagram} alt="Instagram" className="text-4xl" />
                  </a>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={Linkedin} alt="LinkedIn" className="text-4xl" />
                  </a>
                  <a
                    href="https://www.tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={tiktok} alt="TikTok" className="text-4xl" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={x} alt="Twitter/X" className="text-4xl" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="flex md:gap-72 sm:gap-20">
            <div className="kategori lg:mt-32 sm:mt-0">
              <span className="text-white mb-6 block text-bold text-[18px] font-semibold">
                Kategori
              </span>
              <ul className="text-white space-y-6 text-[18px] text-medium">
                <li>
                  <Link to="/seminar" onClick={handleScrollToTop}>
                    Seminar
                  </Link>
                </li>
                <li>
                  <Link to="/webinar" onClick={handleScrollToTop}>
                    Webinar
                  </Link>
                </li>
                <li>
                  <Link to="/kuliah-tamu" onClick={handleScrollToTop}>
                    Kuliah Tamu
                  </Link>
                </li>
                <li>
                  <Link to="/workshop" onClick={handleScrollToTop}>
                    Workshop
                  </Link>
                </li>
                <li>
                  <Link to="/sertifikasi" onClick={handleScrollToTop}>
                    Sertifikasi
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="halaman lg:mt-32 sm:mt-0 flex-col justify-center items-center">
              <span className="text-white mb-6 block text-bold text-[18px] font-semibold">
                Halaman
              </span>
              <ul className="text-white space-y-6 text-[18px] text-medium">
                <li>
                  <Link
                    to={
                      isLandingPage
                        ? "/"
                        : isHomePage
                        ? "/home"
                        : isAdminPage
                        ? "/admin"
                        : "/home"
                    }
                    onClick={handleScrollToTop}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/my-events" onClick={handleScrollToTop}>
                    MyEvent
                  </Link>
                </li>
                <li>
                  <Link to="#footer" onClick={handleScrollToTop}>
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          </div>


          <div className="border-b-2 border-white w-full"></div>
          <div className="copyright-box flex gap-4 justify-center py-8">
            <i className="ri-copyright-line text-white text-2xl"></i>
            <div className="copyright text-white text-[16px] text-medium mt-1">
              Copyright 2024. CampusHub. All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;