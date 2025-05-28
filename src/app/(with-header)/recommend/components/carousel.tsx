"use client";

import { type ReactNode, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  children: ReactNode[];
  itemsPerPage?: number;
}

export default function Carousel({
  children,
  itemsPerPage = 4,
}: CarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(children.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleItems = children.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="relative">
      <button
        onClick={prevPage}
        disabled={totalPages <= 1}
        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md z-10 disabled:opacity-50 hover:bg-gray-50 transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft className="h-5 w-5 text-gray-600" />
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden">
        {visibleItems}
      </div>
      <button
        onClick={nextPage}
        disabled={totalPages <= 1}
        className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md z-10 disabled:opacity-50 hover:bg-gray-50 transition-colors"
        aria-label="Next"
      >
        <ChevronRight className="h-5 w-5 text-gray-600" />
      </button>
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-2 h-2 rounded-full mx-1 ${currentPage === index ? "bg-indigo-600" : "bg-gray-300"}`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
