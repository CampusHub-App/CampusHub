import profile from "../../assets/Image/profile.svg";
import logo from "../../assets/Image/logo2.svg";
import upload from "../../assets/Image/adminimage/upload.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";

function Uploadevent() {
  const [file, setFile] = useState();
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function getFile(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
    }
  }

  const isFormValid = () => {
    return file && category && title && date && time && description;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="font-sans flex flex-col box-border mx-auto w-full relative bg-white">
      <div className="w-full h-full">
        <nav className="p-5 bg-[#003266]">
          <div className="flex justify-between items-center tengah:px-[62px]">
            <img
              src={logo}
              alt="Logo"
              className="w-full h-full max-w-[229px] max-h-[64px]"
            />
            <ul className="hidden lg:flex gap-8 items-center text-white text-[20px] font-medium">
              <Link to="/">
                <li>Home</li>
              </Link>
              <li>MyEvents</li>
              <li>About Us</li>
            </ul>
            <div className="flex items-center gap-4">
              <img src={profile} alt="Profile" className="hidden sm:block" />
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 text-white rounded-lg hover:bg-gray-700 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <ul className="flex flex-col mt-4 text-white text-[20px] font-medium lg:hidden">
              <Link to="/">
                <li className="py-2">Home</li>
              </Link>
              <li className="py-2">MyEvents</li>
              <li className="py-2">About Us</li>
            </ul>
          )}
        </nav>
      </div>

      <div className="p-5 ">
        <div className="flex flex-col px-[62px]  pt-10">
          <div className="flex gap-x-[7px] text-[20px] mb-4 text-black">
            <Link>
              <p>Home</p>
            </Link>
            <p> &gt; </p>
            <Link>
              <p>Upload Event</p>
            </Link>
            <p> &gt; </p>
            <Link>
              <p>Detail Event</p>
            </Link>
          </div>

          <div className="mb-8 W-[750px]">
            <h1 className="font-semibold text-[38px] text-[#003266]">
              Masukkan Acara Anda
            </h1>
            <p className="font-light text-[20px] text-[#003266]">
              Isi kelengkapan acara Anda sebagai penyelenggara.
            </p>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row justify-center px-[62px] pb-16 gap-12 w-full">
          <div className="flex flex-col w-full">
            <div className="border-dashed border-2 w-full h-[338px] border-[#003266] xl:max-w-[475px] sm:w-full flex flex-col items-center justify-center text-[#003266]">
              <label
                htmlFor="file-upload"
                className="items-center justify-center flex flex-col cursor-pointer text-[#003266] text-[18px] font-light gap-y-[28px]"
              >
                {file ? (
                  <img
                    src={file}
                    alt="Preview"
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <>
                    <img src={upload} alt="" />
                    <div>
                      Letakkan poster acara Anda di sini atau{" "}
                      <span className=" underline">Pilih file</span>
                    </div>
                  </>
                )}
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".png, .jpg, .jpeg, .pdf"
                className="hidden"
                onChange={getFile}
              />
            </div>

            <div className="flex justify-between max-w-[475px]">
              <p className="text-[12px] mt-2">
                Supported format: PNG, JPG, PDF
              </p>
              <p className="text-[12px] mt-2">Ukuran maksimum: 25MB</p>
            </div>
          </div>

          <div className="w-full">
            <form className="flex flex-col gap-6 md:max-w-[770px] sm:w-full ">
              <div className="flex justify-between gap-x-[20px] items-center w-full">
                <p className="text-[20px] font-semibold text-[#003266]">
                  Kategori
                </p>
                <select
                  className="border border-[#027FFF]   w-[640px] rounded-lg p-3 xl:m-0 ml-[33px]"
                  style={{
                    color: category ? "black" : "#BFBFBF",
                  }}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Pilih kategori
                  </option>
                  <option value="seminar">Seminar</option>
                  <option value="workshop">Workshop</option>
                </select>
              </div>

              <div className="flex justify-between gap-x-[20px] items-center">
                <p className="text-[20px] font-semibold text-[#003266]">
                  Judul
                </p>
                <input
                  type="text"
                  placeholder="Masukkan judul acara..."
                  className="border border-[#027FFF] rounded-lg p-3 w-full tengah:max-w-[640px] xl:m-0 ml-[62px]"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-x-[20px] ">
                <div className="flex items-center w-full gap-x-[24px] ">
                  <p className="text-[20px] font-semibold text-[#003266]">
                    Tanggal
                  </p>
                  <input
                    type="date"
                    className="border border-[#027FFF] rounded-lg p-3 w-full  xl:m-0 ml-[30px]"
                    style={{
                      color: date ? "black" : "#BFBFBF",
                    }}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center  mt-6 gap-x-[20px]  lg:mt-0 w-full">
                  <p className="text-[20px] font-semibold text-[#003266]">
                    Pukul
                  </p>
                  <input
                    type="time"
                    className="border border-[#027FFF] rounded-lg p-3 w-full lg:m-0 ml-[64px]"
                    style={{
                      color: time ? "black" : "#BFBFBF",
                    }}
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-between w-full  gap-x-[20px]">
                <p className="text-[20px] font-semibold text-[#003266]">
                  Deskripsi
                </p>
                <textarea
                  placeholder="Tulis deskripsi di sini..."
                  rows="5"
                  className="border border-[#027FFF] rounded-lg p-3 w-full max-w-[640px] xl:m-0 ml-[28px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="flex gap-[30px] justify-end">
                <button
                  type="button"
                  className="w-full border-[#027FFF] border-2 text-[#003266] text-[20px] max-w-[279px] h-[46px] rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className={`w-full text-[20px] h-[46px] max-w-[279px] text-white rounded-lg ${
                    isFormValid() ? "bg-[#027FFF]" : "bg-[#A2A2A2]"
                  }`}
                  disabled={!isFormValid()}
                >
                  Lanjut
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Uploadevent;
