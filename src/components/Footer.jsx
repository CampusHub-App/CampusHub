import { Link } from "react-router-dom";
import logo from "../assets/image/user/logo.svg";
import facebook from "../assets/image/user/Facebook.svg";
import instagram from "../assets/image/user/Instagram.svg";
import linkedin from "../assets/image/user/Linkedin.svg";
import tiktok from "../assets/image/user/TikTok.svg";
import x from "../assets/image/user/X.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: facebook, alt: "Facebook", url: "https://facebook.com" },
    { icon: instagram, alt: "Instagram", url: "https://instagram.com" },
    { icon: linkedin, alt: "LinkedIn", url: "https://linkedin.com" },
    { icon: tiktok, alt: "TikTok", url: "https://tiktok.com" },
    { icon: x, alt: "X", url: "https://x.com" },
  ];

  return (
    <footer id="footer" className="bg-[#003266] text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0">
            <Link to="/" className="inline-block mb-4">
              <img src={logo} alt="CampusHub Logo" className="h-12" />
            </Link>
            <p className="max-w-md text-sm">
              Platform yang menghubungkan mahasiswa dengan berbagai acara kampus
              seperti webinar, seminar, workshop, dan sertifikasi.
            </p>
          </div>

          {/* Contact Information */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Kontak Kami</h3>
            <address className="not-italic">
              <p className="mb-2">Email: info@campushub.web.id</p>
              <p className="mb-2">Telepon: +62 812 3456 7890</p>
              <p>
                Alamat: Gedung A Lantai 3,<br />
                Universitas Indonesia, Depok
              </p>
            </address>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Ikuti Kami</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img src={social.icon} alt={social.alt} className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-4 text-center">
          <p className="text-sm">
            &copy; {currentYear} CampusHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;