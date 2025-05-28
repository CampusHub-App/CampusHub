import { useRef, useEffect, useState } from "react";

const PopUpDeleteEvent = ({ setShowPopUp, id, onSuccess, onBack, onFailure }) => {
  const bookingRef = useRef(null);
  const [isExiting, setIsExiting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState(null);
  const [localId, setLocalId] = useState(null);
  const [message, setMessage] = useState();

  useEffect(() => {
    setLocalId(id);
  }, [id]);

  useEffect(() => {
    setIsVisible(true);

    const handleClickOutside = (event) => {
      if (bookingRef.current && !bookingRef.current.contains(event.target)) {
        triggerClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const triggerClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShowPopUp(false);
    }, 400);
    onBack();
  };

  const handleUpdate = async () => {
    const currentId = localId;
    setIsProcessing(true);
    try {
      const response = await fetch(
        `https://campushub.web.id/api/events/${currentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        setStatus("success");
        setTimeout(() => {
          setIsExiting(true)
        }, 1600);
        setTimeout(() => {
          setShowPopUp(false);
        }, 2000);
        setTimeout(() => {
          window.location.reload();
        }, 2100);
        setTimeout(() => {
          onSuccess();
        }, 2200);
      } else {
        setStatus("error");
        setTimeout(() => {
          setIsExiting(true)
        }, 1600);
        setTimeout(() => {
          setShowPopUp(false);
        }, 2000);
        setTimeout(() => {
          onFailure();
        }, 2200);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => {
        setIsExiting(true)
      }, 1600);
      setTimeout(() => {
        setShowPopUp(false);
      }, 2000);
      setTimeout(() => {
        onFailure();
      }, 2200);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-all ${
        isExiting
          ? "opacity-0 duration-700"
          : isVisible
          ? "opacity-100 duration-700"
          : "opacity-0"
      }`}
    >
      <div
        className={`absolute inset-0 bg-black transition-all ${
          isExiting
            ? "opacity-0 duration-700"
            : isVisible
            ? "opacity-30 duration-700"
            : "opacity-0"
        }`}
      ></div>

      <div
        ref={bookingRef}
        className={`relative booking w-[428px] h-[453px] px-6 py-6 mx-8 bg-white shadow-lg rounded-2xl flex flex-col justify-center gap-4 transition-all ${
          isExiting
            ? "opacity-0 scale-90 duration-700"
            : isVisible
            ? "opacity-100 scale-100 duration-700"
            : "opacity-0 scale-50 duration-700"
        }`}
      >
        {status === null && (
          <>
            <div className="confirmation-message flex flex-col items-center">
              <span className="font-medium text-[32px] text-center px-12 py-2">
                Apakah kamu yakin?
              </span>
              <p className="font-regular text-[20px] text-center px-10 py-2">
                Kamu akan menghapus seluruh data terkait event ini, klik kembali
                jika kamu berubah pikiran.
              </p>
            </div>
            <div className="myevent-button flex flex-col py-2">
              <button
                onClick={triggerClose}
                className="bg-[#027FFF] font-regular w-full h-11 my-2 rounded-lg font-medium text-white text-[20px] shadow-md hover:shadow-lg transition duration-300"
              >
                Kembali
              </button>
              <button
                onClick={() => handleUpdate(id)}
                disabled={isProcessing}
                className={`bg-transparent border-2 ${
                  isProcessing
                    ? "border-gray-400 text-gray-400"
                    : "border-[#027FFF] text-black"
                } font-medium w-full h-11 my-2 rounded-lg text-[20px] hover:bg-red-300 hover:border-red-500`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 text-gray-500"
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
                  </div>
                ) : (
                  "Hapus Event"
                )}
              </button>
            </div>
          </>
        )}
        {status === "success" && (
          <div className="flex flex-col items-center animate__animated animate__jackInTheBox">
            <div className="relative p-4 border-4 border-green-600 rounded-full animate-pulse">
              <svg
                className="h-24 w-24 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="mt-4 font-medium text-[20px] text-center text-green-500">
              Event Berhasil Dihapus!
            </span>
          </div>
        )}
        {status === "error" && (
          <div className="flex flex-col items-center animate__animated animate__shakeX">
            <div className="relative p-4 border-4 border-red-600 rounded-full animate-pulse">
              <svg
                className="h-24 w-24 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <span className="mt-4 font-medium text-[20px] text-center text-red-500">
              Gagal Menghapus Event!
            </span>
            <p className="text-center text-[16px] text-red-500">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopUpDeleteEvent;
