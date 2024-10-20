import React, { useRef } from "react";
import Card from "./Card";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { MovieSectionProps } from "@/utils/interface";

const MovieSection: React.FC<MovieSectionProps> = ({
  title,
  data,
  category,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += containerRef.current.offsetWidth;
    }
  };

  const handlePrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= containerRef.current.offsetWidth;
    }
  };

  return (
    <div className="container mx-auto px-3 my-10">
      <h2 className="text-[30px] font-bold mb-3 text-white">{title}</h2>
      <div className="relative group">
        <div
          ref={containerRef}
          className="flex gap-4 overflow-hidden overflow-x-scroll relative z-10 scroll-smooth transition-all scrollbar-hide"
        >
          {data.map((item) => (
            <div key={item.id}>
              <Card data={item} category={category} />
            </div>
          ))}
        </div>

        <div className="absolute top-0 hidden group-hover:flex justify-between items-center w-full h-full">
          <button
            onClick={handlePrev}
            className="bg-white p-1 text-black rounded-full -ml-3 z-10"
          >
            <FaAngleLeft size={25} />
          </button>
          <button
            onClick={handleNext}
            className="bg-white p-1 text-black rounded-full -mr-3 z-10"
          >
            <FaAngleRight size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieSection;
