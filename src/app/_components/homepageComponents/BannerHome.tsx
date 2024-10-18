"use client";
import React, { ReactNode, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

interface BannerItem {
  title: string;
  name: string;
  overview: string;
  vote_average: number;
  backdrop_path: string;
}

interface MovieState {
  bannerData: BannerItem[];
  imageUrl: string;
}

interface RootState {
  movie: MovieState;
}

const BannerHome: React.FC = () => {
  const bannerData = useSelector((state: RootState) => state.movie.bannerData);
  const imageUrl = useSelector((state: RootState) => state.movie.imageUrl);
  const [currentImage, setCurrentImage] = useState<number>(0);

  const handleNext = useCallback(() => {
    setCurrentImage((prev) => (prev < bannerData.length - 1 ? prev + 1 : 0));
  }, [bannerData.length]);

  const handlePrev = useCallback(() => {
    setCurrentImage((prev) => (prev > 0 ? prev - 1 : bannerData.length - 1));
  }, [bannerData.length]);

  useEffect(() => {
    const interval = setInterval(handleNext, 4000);
    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <section className="w-full h-full">
      {bannerData.length > 0 ? (
        <div className="flex min-h-full max-h-[100vh] overflow-hidden">
          {bannerData.map((data, index) => (
            <div
              key={index}
              className="min-w-full min-h-[600px] lg:min-h-full overflow-hidden relative group transition-transform duration-1000"
              style={{ transform: `translateX(${-currentImage * 100}%)` }}
            >
              <div className="w-full h-full">
                <Image
                  src={`${imageUrl}${data.backdrop_path}`}
                  alt={data.title || data.name}
                  width={1920}
                  height={1080}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>

              <div className="absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:lg:flex">
                <button
                  onClick={handlePrev}
                  aria-label="Previous banner"
                  className="text-black bg-white p-1 rounded-full text-xl z-10"
                >
                  <FaAngleLeft size={30} />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next banner"
                  className="text-black bg-white p-1 rounded-full z-10"
                >
                  <FaAngleRight size={30} />
                </button>
              </div>

              <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>
              <div className="container mx-auto">
                <div className="absolute w-full bottom-0 max-w-md px-3">
                  <h2 className="font-bold text-4xl text-white drop-shadow-2xl">
                    {data.title || data.name}
                  </h2>
                  <p className="text-ellipsis line-clamp-3 my-2">
                    {data.overview}
                  </p>
                  <p>Rating: {data.vote_average.toFixed(1)}+</p>

                  <button className="bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-[#0e5c2d] to-[#01FF00] shadow-md transition-all hover:scale-105">
                    Play Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No data available</p>
      )}
    </section>
  );
};

export default BannerHome;
