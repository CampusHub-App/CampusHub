import React from "react";
import date from "../assets/image/date.svg";

/**
 * Card component for displaying event information
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {Function} props.onClick - Click handler function
 */
export const Card = ({ children, onClick }) => {
  return (
    <div
      className="border-2 rounded-[20px] bg-white max-w-[420px] h-[560px] text-[#003266] shadow-lg cursor-pointer flex flex-col transition-transform duration-150 active:scale-95"
      onClick={onClick}
    >
      <div className="p-[24px] flex flex-col flex-1 gap-y-[12px]">{children}</div>
    </div>
  );
};

/**
 * Body component for displaying event title and description
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Description text
 * @param {string} props.title - Event title
 */
export const Body = ({ children, title }) => {
  const truncateText = (text, maxWords) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length > maxWords) {
      return `${words.slice(0, maxWords).join(" ")}...`;
    }
    return text;
  };

  return (
    <div className="w-full max-w-[369px]">
      <h1 className="font-semibold text-[26px] mb-[8px]">{truncateText(title, 3)}</h1>
      <p className="text-[16px] font-normal">{truncateText(children, 8)}</p>
    </div>
  );
};

/**
 * Kategori component for displaying event category
 * @param {Object} props - Component props
 * @param {string} props.kategori - Category name
 * @param {React.ReactNode} props.children - Additional information
 */
export const Kategori = ({ kategori, children }) => {
  return (
    <div className="flex gap-x-[4px] text-white">
      <p className="border bg-[#027FFF] rounded-[20px] p-[4px] w-[122px] text-[14px] justify-center flex">
        {kategori}
      </p>
    </div>
  );
};

/**
 * Image component for displaying event image
 * @param {Object} props - Component props
 * @param {string} props.image - Image URL
 */
export const Image = ({ image }) => {
  return (
    <img
      src={image}
      alt="Event image"
      className="w-[372px] h-[232px] object-cover rounded-[12px]"
    />
  );
};

/**
 * Tanggal component for displaying event date
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Date text
 */
export const Tanggal = ({ children }) => {
  return (
    <div className="flex gap-x-[12px]">
      <img src={date} alt="Date icon" />
      <p className="text-[16px] font-normal">{children}</p>
    </div>
  );
};

/**
 * Creator component for displaying event creator information
 * @param {Object} props - Component props
 * @param {string} props.image - Creator image URL
 * @param {string} props.nama - Creator name
 * @param {string} props.title - Creator title/role
 */
export const Creator = ({ image, nama, title }) => {
  return (
    <div className="flex gap-x-[16px] items-center mt-auto">
      <img src={image} alt={`${nama}'s profile`} className="w-[40px] h-[40px] rounded-full" />
      <div>
        <p className="font-medium text-[16px]">{nama}</p>
        <p className="font-normal text-[14px]">{title}</p>
      </div>
    </div>
  );
};