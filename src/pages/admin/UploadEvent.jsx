import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import upload from "../../assets/image/upload.svg";
import Navbar from "../../components/Navbar";

function UploadEvent() {

  const [event_img, setEventImg] = useState();
  const [speaker_img, setSpeakerImg] = useState();
  const [eventsPreview, setEventsPreview] = useState();
  const [speakerPreview, setSpeakerPreview] = useState();
  
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [desc, setDes] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [role, setRole] = useState("");
  const [slot, setSlot] = useState("");
  const [location, setVenue] = useState("");
  const [isOffline, setIsOffline] = useState(false);
  
  const navigate = useNavigate();
  const { state } = useLocation();
  const lokasi = useLocation();
  const initialStep = state?.step || 1;
  const [step, setStep] = useState(initialStep);

  useEffect(() => {
    setStep(initialStep);
  }, [initialStep]);

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

  useEffect(() => {
    if (state) {
      setCategory(state.data.category || "");
      setTitle(state.data.title || "");
      setDate(state.data.date || "");
      setStartTime(state.data.start_time || "");
      setEndTime(state.data.end_time || "");
      setDes(state.data.desc || "");
      setIsOffline(state.data.isOffline || false);
      setEventImg(state.data.event_img || "");
      setSpeakerImg(state.data.speaker_img || "");
      setEventsPreview(state.data.eventsPreview || "");
      setSpeakerPreview(state.data.speakerPreview || "");
      setSpeaker(state.data.speaker || "");
      setRole(state.data.role || "");
      setSlot(state.data.slot || "");
      setVenue(state.data.location || "");
    }
  }, [state]);

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      const fileUrl = URL.createObjectURL(droppedFile);
      setEventImg(fileUrl);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const getFile = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setEventImg(selectedFile);
      const fileUrl = URL.createObjectURL(selectedFile);
      setEventsPreview(fileUrl);
    }
  };

  const getSpeakerFile = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setSpeakerImg(selectedFile);
      const fileUrl = URL.createObjectURL(selectedFile);
      setSpeakerPreview(fileUrl);
    }
  };

  const isFormValid = () => {
    return (
      eventsPreview &&
      category &&
      title &&
      date &&
      end_time > start_time &&
      desc
    );
  };

  const isSecondStepValid = () => {
    return (
      speakerPreview && speaker && role && slot && (!isOffline || location)
    );
  };

  const handleNext = () => {
    if (step === 1) setStep(2);
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
  };

  const handlePreview = () => {
    navigate("/events/preview", {
      state: {
        eventsPreview,
        speakerPreview,
        event_img,
        category,
        title,
        date,
        start_time,
        end_time,
        desc,
        speaker,
        role,
        slot,
        location,
        isOffline,
        speaker_img,
      },
    });
  };
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const inputClasses = "border-2 border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-3 transition-all duration-200 outline-none";
  const labelClasses = "text-lg font-semibold text-gray-700 min-w-[120px]";
  const buttonPrimaryClasses = "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg";
  const buttonSecondaryClasses = "border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-all duration-200";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">
      <Navbar />

      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="container mx-auto px-4 py-8"
      >

        <div className="max-w-6xl mx-auto my-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {step === 1 ? "Buat Acara Baru" : "Detail Pembicara"}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Isi kelengkapan acara Anda sebagai penyelenggara dengan detail yang menarik
            </p>
              {/* Step Indicator */}
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button 
                onClick={() => setStep(1)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold transition-all duration-200 hover:scale-110 cursor-pointer ${step >= 1 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300'}`}
              >
                1
              </button>
              <div className={`w-16 h-1 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-300'} rounded transition-colors duration-200`}></div>
              <button 
                onClick={() => isFormValid() && setStep(2)}
                disabled={!isFormValid()}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold transition-all duration-200 ${
                  isFormValid() 
                    ? 'cursor-pointer hover:scale-110' 
                    : 'cursor-not-allowed opacity-70'
                } ${step >= 2 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300'}`}
              >
                2
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Image Upload Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {step === 1 ? "Gambar Acara" : "Foto Pembicara"}
                  </h3>
                  <div
                    className="group border-3 border-dashed border-blue-300 hover:border-blue-500 rounded-2xl h-80 flex flex-col items-center justify-center text-blue-600 transition-all duration-300 cursor-pointer bg-blue-50 hover:bg-blue-100"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    <label
                      htmlFor="file-upload"
                      className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-8"
                    >                      {(step === 1 ? eventsPreview : speakerPreview) ? (
                        <div className="relative w-full h-full">
                          <img
                            src={step === 1 ? eventsPreview : speakerPreview}
                            alt="Preview"
                            className="w-full h-full object-contain rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold">
                              Klik untuk mengganti
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center space-y-4">
                          <div className="w-16 h-16 mx-auto bg-blue-200 rounded-full flex items-center justify-center group-hover:bg-blue-300 transition-colors">
                            <img src={upload} alt="Upload" className="w-8 h-8" />
                          </div>
                          <div className="space-y-2">
                            <p className="text-lg font-medium">
                              Drag & drop {step === 1 ? "gambar acara" : "foto pembicara"} di sini
                            </p>
                            <p className="text-sm text-gray-500">
                              atau <span className="text-blue-600 underline font-medium">pilih file</span>
                            </p>
                          </div>
                        </div>
                      )}
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      className="hidden"
                      onChange={step === 1 ? getFile : getSpeakerFile}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Format: PNG, JPG, JPEG</span>
                    <span>Maksimal: 25MB</span>
                  </div>
                </div>                {/* Form Section */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">
                    {step === 1 ? "Informasi Acara" : "Informasi Pembicara"}
                  </h3>
                  
                  {step === 1 ? (
                    /* Step 1 Form */
                    <div className="space-y-6">
                      {/* Category */}
                      <div className="space-y-2">
                        <label className={labelClasses}>Kategori *</label>
                        <select
                          className={`${inputClasses} w-full`}
                          style={{ color: category ? "black" : "#9CA3AF" }}
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          required
                        >
                          <option value="" disabled>Pilih kategori acara</option>
                          <option value="1">🎥 Webinar</option>
                          <option value="2">🎤 Seminar</option>
                          <option value="3">👨‍🏫 Kuliah Tamu</option>
                          <option value="4">🛠️ Workshop</option>
                          <option value="5">🏆 Sertifikasi</option>
                        </select>
                      </div>

                      {/* Title */}
                      <div className="space-y-2">
                        <label className={labelClasses}>Judul Acara *</label>
                        <input
                          type="text"
                          placeholder="Masukkan judul acara yang menarik"
                          className={`${inputClasses} w-full`}
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                      </div>

                      {/* Date and Time */}
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <label className={labelClasses}>Tanggal *</label>
                          <input
                            type="date"
                            className={`${inputClasses} w-full`}
                            style={{ color: date ? "black" : "#9CA3AF" }}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className={labelClasses}>Mulai *</label>
                          <input
                            type="time"
                            className={`${inputClasses} w-full`}
                            style={{ color: start_time ? "black" : "#9CA3AF" }}
                            value={start_time}
                            onChange={(e) => setStartTime(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className={labelClasses}>Berakhir *</label>
                          <input
                            type="time"
                            className={`${inputClasses} w-full`}
                            style={{ color: end_time ? "black" : "#9CA3AF" }}
                            value={end_time}
                            onChange={(e) => setEndTime(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-2">
                        <label className={labelClasses}>Deskripsi *</label>
                        <textarea
                          placeholder="Tulis deskripsi acara yang detail dan menarik..."
                          rows="5"
                          className={`${inputClasses} w-full resize-none`}
                          value={desc}
                          onChange={(e) => setDes(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  ) : (
                    /* Step 2 Form */
                    <div className="space-y-6">
                      {/* Speaker and Role */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className={labelClasses}>Nama Pembicara *</label>
                          <input
                            type="text"
                            className={`${inputClasses} w-full`}
                            value={speaker}
                            placeholder="Masukkan nama pembicara"
                            onChange={(e) => setSpeaker(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className={labelClasses}>Jabatan/Role *</label>
                          <input
                            type="text"
                            placeholder="Masukkan jabatan pembicara"
                            className={`${inputClasses} w-full`}
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      {/* Ticket Slot */}
                      <div className="space-y-2">
                        <label className={labelClasses}>Jumlah Tiket *</label>
                        <input
                          type="text"
                          placeholder="Masukkan jumlah tiket yang tersedia"
                          className={`${inputClasses} w-full`}
                          value={slot}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value)) {
                              setSlot(value);
                            }
                          }}
                          required
                        />
                      </div>

                      {/* Event Type */}
                      <div className="space-y-4">
                        <label className={labelClasses}>Tipe Acara *</label>
                        <div className="flex gap-8">
                          <label className="flex items-center space-x-3 cursor-pointer group">
                            <input
                              type="radio"
                              name="eventType"
                              value="online"
                              checked={!isOffline}
                              onChange={() => setIsOffline(false)}
                              className="w-5 h-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500"
                            />
                            <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                              🌐 Online
                            </span>
                          </label>
                          <label className="flex items-center space-x-3 cursor-pointer group">
                            <input
                              type="radio"
                              name="eventType"
                              value="offline"
                              checked={isOffline}
                              onChange={() => setIsOffline(true)}
                              className="w-5 h-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500"
                            />
                            <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                              📍 Offline
                            </span>
                          </label>
                        </div>
                      </div>

                      {/* Location (conditional) */}
                      {isOffline && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-2"
                        >
                          <label className={labelClasses}>Lokasi *</label>
                          <input
                            type="text"
                            placeholder="Masukkan alamat lengkap lokasi acara"
                            className={`${inputClasses} w-full`}
                            value={location}
                            onChange={(e) => setVenue(e.target.value)}
                            required
                          />
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200">
                    <button
                      type="button"
                      className={buttonSecondaryClasses}
                      onClick={step === 1 ? () => navigate("/") : handleBack}
                    >
                      {step === 1 ? "Batal" : "Kembali"}
                    </button>
                    <button
                      type="button"
                      className={`${
                        (step === 1 && isFormValid()) || (step === 2 && isSecondStepValid())
                          ? buttonPrimaryClasses
                          : "bg-gray-400 text-white py-3 px-8 rounded-lg cursor-not-allowed"
                      }`}
                      onClick={step === 1 ? handleNext : handlePreview}
                      disabled={
                        (step === 1 && !isFormValid()) || (step === 2 && !isSecondStepValid())
                      }
                    >
                      {step === 1 ? "Lanjut" : "Preview"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default UploadEvent;
