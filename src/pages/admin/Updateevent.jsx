import profile from "../../assets/Image/profile.svg";
import logo from "../../assets/Image/logo2.svg";
import upload from "../../assets/Image/adminimage/upload.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";

function Updateevent() {
  const [file, setFile] = useState();
  const [speaker, setSpeaker] = useState("");
  const [role, setRole] = useState("");
  const [ticketCount, setTicketCount] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [location, setLocation] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function getFile(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
    }
  }

  const isFormValid = () => {
    return (
      file &&
      speaker &&
      role &&
      ticketCount &&
      (isOnline || isOffline) &&
      (isOffline ? location.trim() : true)
    );
  };

  const handleCheckboxChange = (type) => {
    if (type === "online") {
      setIsOnline(true);
      setIsOffline(false); 
    } else {
      setIsOffline(true);
      setIsOnline(false); 
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="font-sans flex flex-col box-border mx-auto w-full relative bg-white">
      <div className="w-full h-full">
        <nav className="p-5 bg-[#003266]">
          <div className="flex justify-between items-center px-[62px]">
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
          <div className="p-5">
      <div className="flex flex-col px-[62px] pt-10">
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

        <div className="mb-8">
          <h1 className="font-semibold text-[38px] text-[#003266]">
            Masukkan Acara Anda
          </h1>
          <p className="font-light text-[20px] text-[#003266]">
            Isi kelengkapan acara Anda sebagai penyelenggara.
          </p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row justify-between px-[62px] pb-16 gap-12 w-full">
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

        <form className="flex flex-col gap-6 w-full max-w-[770px]">
  
  <div className="flex flex-col xl:flex-row xl:justify-between gap-y-7 xl:gap-x-2 xl:gap-y-0 w-full">
    
    <div className="flex items-center gap-x-4 w-full xl:w-auto">
      <p className="text-[20px] font-semibold text-[#003266] w-[120px] flex-shrink-0">
        Pembicara
      </p>
      <input
        type="text"
        placeholder="Masukkan nama..."
        className="border border-[#027FFF] rounded-lg p-3 w-full xl:w-[261px]"
        value={speaker}
        onChange={(e) => setSpeaker(e.target.value)}
        required
      />
    </div>

    
    <div className="flex items-center gap-x-4 w-full xl:w-auto">
      <p className="text-[20px] font-semibold text-[#003266] sm:w-[113px] xl:w-9 flex-shrink-0">
        Role
      </p>
      <input
        type="text"
        placeholder="Tulis pekerjaan/keahliannya"
        className="border border-[#027FFF] rounded-lg p-3 flex-grow w-full xl:w-[299px]"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      />
    </div>
  </div>

  
  <div className="flex items-center gap-x-4 w-full">
    <p className="text-[20px] font-semibold text-[#003266] w-[120px] flex-shrink-0">
      Jumlah Tiket
    </p>
    <input
      type="text"
      placeholder="Masukkan jumlah tiket..."
      className="border border-[#027FFF] rounded-lg p-3 flex-grow w-full"
      value={ticketCount}
      onChange={(e) => setTicketCount(e.target.value)}
      required
    />
  </div>

  
  <div className="flex items-center gap-x-4 w-full">
    <p className="text-[20px] font-semibold text-[#003266] w-[120px] flex-shrink-0">
      Online
    </p>
    <div className="flex gap-x-8">
      <label className="flex items-center gap-x-2">
        <input
          type="checkbox"
          id="online"
          name="eventType"
          className="w-6 h-6 border border-[#027FFF] rounded-md appearance-none cursor-pointer checked:appearance-auto checked:bg-[#027FFF] checked:border-[#027FFF] checked:text-white flex items-center justify-center"
          checked={isOnline}
          onChange={() => handleCheckboxChange("online")}
        />
      </label>
      <label className="flex items-center gap-5 text-[20px] font-semibold text-[#003266] w-[120px] flex-shrink-0">
        Offline
        <input
          type="checkbox"
          id="offline"
          name="eventType"
          className="w-6 h-6 border border-[#027FFF] rounded-md appearance-none cursor-pointer checked:appearance-auto checked:bg-[#027FFF] checked:border-[#027FFF] checked:text-white flex items-center justify-center"
          checked={isOffline}
          onChange={() => handleCheckboxChange("offline")}
        />

        
      </label>
    </div>
  </div>

  
  {isOffline && (
    <div className="flex items-center gap-x-4 w-full">
      <p className="text-[20px] font-semibold text-[#003266] w-[120px] flex-shrink-0">
        Tempat
      </p>
      <input
        type="text"
        placeholder="Masukkan lokasi acara"
        className="border border-[#027FFF] rounded-lg p-3 flex-grow w-full"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
    </div>
  )}
</form>


      </div>
    </div>
    </div>
  );
}

export default Updateevent;
