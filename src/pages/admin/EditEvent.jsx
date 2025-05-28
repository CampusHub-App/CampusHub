import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import upload from "../assets/image/adminimage/upload.svg";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

function EditEvent() {
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
  const [isOffline, setIsOffline] = useState(false);
  const [speaker, setSpeaker] = useState("");
  const [role, setRole] = useState("");
  const [slot, setSlot] = useState("");
  const [location, setVenue] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const initialStep = state?.step || 1;
  const [step, setStep] = useState(initialStep); // Step of the form (1 or 2)
  const lokasi = useLocation();

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
    navigate(`/my-events/${id}/preview`, {
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
    } else {
      const FetchEvent = async () => {
        try {
          const response = await fetch(
            `https://campushub.web.id/api/events/${id}/view`
          );
          const data = await response.json();

          if (response.ok) {
            setEventsPreview(data.foto_event);
            setSpeakerPreview(data.foto_pembicara);
            setCategory(data.kategori_id);
            setTitle(data.judul);
            setDate(data.date);
            setStartTime(data.start_time);
            setEndTime(data.end_time);
            setDes(data.deskripsi);
            setSpeaker(data.pembicara);
            setRole(data.role);
            setSlot(data.available_slot);
            setVenue(data.tempat);
            setIsOffline(data.tempat !== "Online");
          } else {
            alert(`Booking gagal: ${data.message || "Coba lagi nanti."}`);
          }
        } catch (err) {
          alert("Terjadi kesalahan saat booking. Silakan coba lagi.");
          console.log(err);
        }
      };

      FetchEvent();
    }
  }, []);

  const pageVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <div className="font-sans flex flex-col box-border mx-auto w-full relative bg-white overflow-hidden">
      <Navbar />

      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{
          opacity: { duration: 1.4, ease: "easeInOut" }, // Smooth fade-in/out
          scale: { duration: 1, ease: "easeInOut" }, // Smooth scaling
        }}
      >
        <div className="p-5">
          <div className="flex flex-col px-[62px]  pt-10">
            {step === 1 ? (
              <div className="flex gap-x-[7px] text-[20px] mb-4 text-black">
                <Link to={"/my-events"}>
                  <p>My Events</p>
                </Link>
                <p> &gt; </p>
                <Link onClick={() => setStep(1)}>
                  <p>Update Event</p>
                </Link>
              </div>
            ) : (
              <div className="flex gap-x-[7px] text-[20px] mb-4 text-black">
                <Link to={"/my-events"}>
                  <p>My Events</p>
                </Link>
                <p> &gt; </p>
                <Link onClick={() => setStep(1)}>
                  <p>Update Event</p>
                </Link>
                <p> &gt; </p>
                <Link onClick={() => setStep(2)}>
                  <p>Detail Event</p>
                </Link>
              </div>
            )}

            <div className="mb-8 W-[750px]">
              <h1 className="font-semibold text-[38px] text-[#003266]">
                {step === 1 ? "Masukkan Acara Anda" : "Detail Acara"}
              </h1>
              <p className="font-light text-[20px] text-[#003266]">
                Isi kelengkapan acara Anda sebagai penyelenggara.
              </p>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row justify-between px-[62px] pb-16 gap-12">
            {step === 1 ? (
              <>
                <div className="flex flex-col w-auto">
                  <div
                    className="border-dashed border-2 h-[30rem] border-[#003266] xl:w-[36rem] sm:w-full flex flex-col items-center justify-center text-[#003266] relative overflow-hidden"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    <label
                      htmlFor="file-upload"
                      className="items-center justify-center flex flex-col cursor-pointer text-[#003266] text-[18px] font-light gap-y-[28px] h-full w-full"
                    >
                      {eventsPreview ? (
                        <img
                          src={eventsPreview}
                          alt="Preview"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <>
                          <img src={upload} alt="Upload" />
                          <div>
                            Drag and drop your event image here or{" "}
                            <span className="underline">Select a file</span>
                          </div>
                        </>
                      )}
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      className="hidden"
                      onChange={getFile}
                    />
                  </div>
                  <div className="flex justify-between max-w-[40rem]">
                    <p className="text-[12px] mt-2">
                      Supported format: PNG, JPG, JPEG
                    </p>
                    <p className="text-[12px] mt-2">Ukuran maksimum: 25MB</p>
                  </div>
                </div>

                <div className="w-max max-h-screen">
                  <form className="flex flex-col gap-6 w-max">
                    <div className="flex justify-between gap-x-[20px] items-center w-full">
                      <p className="text-[20px] font-semibold text-[#003266]">
                        Kategori
                      </p>
                      <select
                        className="border border-[#027FFF]  w-[54rem] rounded-lg p-3 xl:m-0 ml-[33px]"
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
                        <option value="1">Webinar</option>
                        <option value="2">Seminar</option>
                        <option value="3">Kuliah Tamu</option>
                        <option value="4">Workshop</option>
                        <option value="5">Sertifikasi</option>
                      </select>
                    </div>

                    <div className="flex justify-between gap-x-[20px] items-center">
                      <p className="text-[20px] font-semibold text-[#003266]">
                        Judul
                      </p>
                      <input
                        type="text"
                        placeholder="Masukkan judul acara"
                        className="border border-[#027FFF] rounded-lg p-3 w-[54rem]"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-x-[20px] ">
                      <div className="flex items-center w-full gap-x-[27px] ">
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
                          Mulai
                        </p>
                        <input
                          type="time"
                          className="border border-[#027FFF] rounded-lg p-3 w-full lg:m-0 ml-[64px]"
                          style={{
                            color: start_time ? "black" : "#BFBFBF",
                          }}
                          value={start_time}
                          onChange={(e) => setStartTime(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex items-center  mt-6 gap-x-[20px]  lg:mt-0 w-full">
                        <p className="text-[20px] font-semibold text-[#003266]">
                          Berakhir
                        </p>
                        <input
                          type="time"
                          className="border border-[#027FFF] rounded-lg p-3 w-full lg:m-0 ml-[64px]"
                          style={{
                            color: end_time ? "black" : "#BFBFBF",
                          }}
                          value={end_time}
                          onChange={(e) => setEndTime(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex justify-between w-full gap-x-[20px] h-[13rem]">
                      <p className="text-[20px] font-semibold text-[#003266]">
                        Deskripsi
                      </p>
                      <textarea
                        placeholder="Tulis deskripsi di sini..."
                        rows="5"
                        className="border border-[#027FFF] rounded-lg p-3 w-[54rem]"
                        value={desc}
                        onChange={(e) => setDes(e.target.value)}
                        required
                      ></textarea>
                    </div>

                    <div
                      className={`flex gap-[30px] justify-end ${
                        step === 2
                          ? isOffline
                            ? "mt-[12rem]"
                            : "mt-[15.15rem]"
                          : "mt-[0.7rem]"
                      }`}
                    >
                      <button
                        type="button"
                        className="w-full border-[#027FFF] border-2 text-[#003266] text-[20px] max-w-[279px] h-[46px] rounded-lg"
                        onClick={
                          step === 1 ? () => navigate("/my-events") : handleBack
                        } // Step 1: No action, Step 2: Go back
                      >
                        {step === 1 ? "Batal" : "Kembali"}
                      </button>
                      <button
                        type="button"
                        className={`w-full text-[20px] h-[46px] max-w-[279px] text-white rounded-lg ${
                          (step === 1 && isFormValid()) ||
                          (step === 2 && isSecondStepValid())
                            ? "bg-[#027FFF]"
                            : "bg-[#A2A2A2]"
                        }`}
                        onClick={step === 1 ? handleNext : handlePreview} // Step 1: Next, Step 2: Preview
                        disabled={
                          (step === 1 && !isFormValid()) ||
                          (step === 2 && !isSecondStepValid())
                        }
                      >
                        {step === 1 ? "Lanjut" : "Preview"}
                      </button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col w-auto">
                  <div
                    className="border-dashed border-2 h-[30rem] border-[#003266] xl:w-[36rem] sm:w-full flex flex-col items-center justify-center text-[#003266] relative overflow-hidden"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    <label
                      htmlFor="file-upload"
                      className="items-center justify-center flex flex-col cursor-pointer text-[#003266] text-[18px] font-light gap-y-[28px] h-full w-full"
                    >
                      {speakerPreview ? (
                        <img
                          src={speakerPreview}
                          alt="Preview"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <>
                          <img src={upload} alt="Upload" />
                          <div>
                            Drag and drop your speaker image here or{" "}
                            <span className="underline">Select a file</span>
                          </div>
                        </>
                      )}
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      className="hidden"
                      onChange={getSpeakerFile}
                    />
                  </div>
                  <div className="flex justify-between max-w-[40rem]">
                    <p className="text-[12px] mt-2">
                      Supported format: PNG, JPG, JPEG
                    </p>
                    <p className="text-[12px] mt-2">Ukuran maksimum: 25MB</p>
                  </div>
                </div>

                <div className="w-max max-h-screen">
                  <form className="flex flex-col gap-6 w-max">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-x-[20px] ">
                      <div className="flex items-center w-full gap-x-[2.4rem]">
                        <p className="text-[20px] font-semibold text-[#003266] ">
                          Pembicara
                        </p>
                        <input
                          type="text"
                          className="border border-[#027FFF] rounded-lg p-3 w-full xl:m-0 ml-[30px]"
                          value={speaker}
                          placeholder="Masukkan nama pembicara"
                          onChange={(e) => setSpeaker(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center mt-6 gap-x-[20px] lg:mt-0 w-full">
                        <p className="text-[20px] font-semibold text-[#003266]">
                          Role
                        </p>
                        <input
                          type="text"
                          placeholder="Masukkan pekerjaan pembicara"
                          className="border border-[#027FFF] rounded-lg p-3 w-full lg:m-0 ml-[64px]"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between gap-x-[20px] items-center">
                      <p className="text-[20px] font-semibold text-[#003266]">
                        Jumlah Tiket
                      </p>
                      <input
                        type="text"
                        placeholder="Masukkan jumlah tiket"
                        className="border border-[#027FFF] rounded-lg p-3 w-[54rem]"
                        value={slot}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            // Regex to allow only digits
                            setSlot(value);
                          }
                        }}
                        required
                      />
                    </div>

                    <div className="flex items-center mt-6 gap-x-[20px] lg:mt-0 w-full">
                      <p className="text-[20px] font-semibold text-[#003266]">
                        Online
                      </p>
                      <div className="flex items-center gap-x-[10px]">
                        <input
                          type="radio"
                          id="online"
                          name="eventType"
                          value="online"
                          checked={!isOffline}
                          onChange={() => setIsOffline(false)}
                          className="appearance-none w-6 h-6 border-2 border-[#003266] rounded-md checked:bg-[#003266] checked:border-[#003266] checked:after:content-['✔'] checked:after:text-white checked:after:block checked:after:font-bold checked:after:text-center"
                        />
                      </div>
                      <p className="text-[20px] font-semibold text-[#003266]">
                        Offline
                      </p>
                      <div className="flex items-center gap-x-[10px]">
                        <input
                          type="radio"
                          id="offline"
                          name="eventType"
                          value="offline"
                          checked={isOffline}
                          onChange={() => setIsOffline(true)}
                          className="appearance-none w-6 h-6 border-2 border-[#003266] rounded-md checked:bg-[#003266] checked:border-[#003266] checked:after:content-['✔'] checked:after:text-white checked:after:block checked:after:font-bold checked:after:text-center"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col flex-grow">
                      {isOffline && (
                        <div className="flex justify-between gap-x-[20px] items-center">
                          <p className="text-[20px] font-semibold text-[#003266]">
                            Tempat
                          </p>
                          <input
                            type="text"
                            placeholder="Isi Alamat"
                            className="border border-[#027FFF] rounded-lg p-3 w-[54rem]"
                            value={location !== "Online" ? location : ""}
                            onChange={(e) => setVenue(e.target.value)}
                            required
                          />
                        </div>
                      )}
                    </div>

                    <div
                      className={`flex gap-[30px] justify-end ${
                        step === 2
                          ? isOffline
                            ? "mt-[12rem]"
                            : "mt-[15.15rem]"
                          : "mt-[0.7rem]"
                      }`}
                    >
                      <button
                        type="button"
                        className="w-full border-[#027FFF] border-2 text-[#003266] text-[20px] max-w-[279px] h-[46px] rounded-lg"
                        onClick={step === 1 ? () => navigate("/") : handleBack} // Step 1: No action, Step 2: Go back
                      >
                        {step === 1 ? "Batal" : "Kembali"}
                      </button>
                      <button
                        type="button"
                        className={`w-full text-[20px] h-[46px] max-w-[279px] text-white rounded-lg ${
                          (step === 1 && isFormValid()) ||
                          (step === 2 && isSecondStepValid())
                            ? "bg-[#027FFF]"
                            : "bg-[#A2A2A2]"
                        }`}
                        onClick={step === 1 ? handleNext : handlePreview} // Step 1: Next, Step 2: Preview
                        disabled={
                          (step === 1 && !isFormValid()) ||
                          (step === 2 && !isSecondStepValid())
                        }
                      >
                        {step === 1 ? "Lanjut" : "Preview"}
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default EditEvent;
