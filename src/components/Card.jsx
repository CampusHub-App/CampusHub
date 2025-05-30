import date from "../assets/image/date.svg";

const storage = import.meta.env.VITE_STORAGE_BASE_URL;

export const Card = ({ children, onClick }) => {
  return (
    <div
      className="border border-gray-200 rounded-[20px] bg-white max-w-[420px] h-[580px] text-[#003266] shadow-md hover:shadow-xl cursor-pointer flex flex-col transition-all duration-300 hover:scale-[1.02] active:scale-95 overflow-hidden"
      onClick={onClick}
    >
      <div className="p-[24px] flex flex-col h-full gap-y-4">{children}</div>
    </div>
  );
};

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
    <div className="w-full max-w-[369px] space-y-3 flex-grow">
      <h1 className="font-bold text-[24px] leading-tight text-gray-800 line-clamp-2">
        {truncateText(title, 4)}
      </h1>
      <p className="text-[15px] font-normal text-gray-600 leading-relaxed line-clamp-3">
        {truncateText(children, 12)}
      </p>
    </div>
  );
};

export const Kategori = ({ kategori, children }) => {
  return (
    <div className="flex gap-x-[4px] text-white">
      <p className="border bg-[#027FFF] rounded-[20px] p-[4px] w-[122px] text-[14px] justify-center flex">
        {kategori}
      </p>
    </div>
  );
};

export const Image = ({ image }) => {
  return (
    <div className="relative overflow-hidden rounded-[16px] group">
      <img
        src={`${storage}/${image}`}
        alt="Event image"
        className="w-[372px] h-[232px] object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export const Tanggal = ({ children }) => {
  return (
    <div className="flex items-center gap-x-[8px] bg-gray-50 rounded-lg px-3 py-1.5 w-fit">
      <img src={date} alt="Date icon" className="w-5 h-5 opacity-80" />
      <p className="text-[14px] font-medium text-gray-700">{children}</p>
    </div>
  );
};

export const Creator = ({ image, nama, title }) => {
  return (
    <div className="flex gap-x-[16px] items-center pt-4 border-t border-gray-100 mt-auto">
      <div className="relative">
        <img 
          src={`${storage}/${image}`} 
          alt={`${nama}'s profile`} 
          className="w-[44px] h-[44px] rounded-full object-cover ring-2 ring-gray-100" 
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[15px] text-gray-800 truncate">{nama}</p>
        <p className="font-normal text-[13px] text-gray-500 truncate">{title}</p>
      </div>
    </div>
  );
};