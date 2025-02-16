import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import arrowLeft from "../assets/image/icon/arrow-circle-left.svg";
import arrowRight from "../assets/image/icon/arrow-circle-right.svg";
import { Card, Body, Kategori, Image, Tanggal, Creator } from "../fragment/Card";

const CardPage = ({ events }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate(); // Hook untuk navigasi

    const eventsPerPage = 6;
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    const nextPage = () => {
        if (currentPage < Math.ceil(events.length / eventsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const maxPage = Math.ceil(events.length / eventsPerPage);

    // Fungsi untuk menangani klik pada card
    const handleCardClick = (id) => {
        navigate(`/events/${id}/view`); // Redirect ke halaman dengan ID tertentu
    };

    return (
        <div className="relative z-10">
            <div className="flex flex-wrap justify-around px-14 gap-10">
                {currentEvents.length > 0 ? (
                    currentEvents.map((event) => {
                        const { id, foto_event, category_name, accessibility, judul, deskripsi, date, foto_pembicara, pembicara, role } = event;
                        return (
                            <div key={id} className="gap-y-[50px]">
                                <Card onClick={() => handleCardClick(id)}> {/* Tambahkan onClick */}
                                    <Image image={foto_event} />
                                    <Kategori kategori={category_name}>{accessibility}</Kategori>
                                    <Body title={judul.substring(0, 35)}>{deskripsi}</Body>
                                    <Tanggal>{date}</Tanggal>
                                    <Creator
                                        image={foto_pembicara}
                                        nama={pembicara}
                                        title={role}
                                    />
                                </Card>
                            </div>
                        );
                    })
                ) : (
                    <p>Belum ada acara unggulan saat ini.</p>
                )}
            </div>

            <div className="flex justify-center items-center gap-3 mt-8 mb-8">
                <div className="flex justify-center items-center gap-8 mt-4">
                    <img
                        src={arrowLeft}
                        alt="Panah kiri"
                        className="w-[54px] h-[54px] cursor-pointer sm:w-[40px] md:w-[54px]"
                        onClick={prevPage}
                    />
                    {[...Array(maxPage)].map((_, index) => (
                        <span
                            key={index}
                            className={`w-[24px] h-[24px] rounded-full cursor-pointer sm:w-[20px] sm:h-[20px] md:w-[24px] md:h-[24px] ${
                                currentPage === index + 1 ? "bg-[#027FFF]" : "bg-gray-300"
                            }`}
                            onClick={() => goToPage(index + 1)}
                        ></span>
                    ))}
                    <img
                        src={arrowRight}
                        alt="Panah kanan"
                        className="w-[54px] h-[54px] cursor-pointer sm:w-[40px] md:w-[54px]"
                        onClick={nextPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default CardPage;
