import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { MovieSectionProps, RootState } from "@/utils/interface";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const BannerHome: React.FC<MovieSectionProps> = ({ category }) => {
  const router = useRouter();
  const bannerData = useSelector((state: RootState) => state.movie.bannerData);
  const imageUrl = useSelector((state: RootState) => state.movie.imageUrl);
  const [currentImage, setCurrentImage] = useState<number>(0);

  const handleNext = useCallback(() => {
    setCurrentImage((prev) => (prev < bannerData.length - 1 ? prev + 1 : 0));
  }, [bannerData.length]);

  const handlePrev = useCallback(() => {
    setCurrentImage((prev) => (prev > 0 ? prev - 1 : bannerData.length - 1));
  }, [bannerData.length]);

  const handleDetails = (id: number) => {
    router.push(`/details/${category}/${id}`);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 4000);
    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <section className="w-full h-full">
      {bannerData.length > 0 ? (
        <div className="flex min-h-full max-h-[100vh] overflow-hidden">
          {bannerData.map((data, index) => {
            const imageSrc = data.backdrop_path
              ? `${imageUrl}${data.backdrop_path}`
              : null;

            return (
              <div
                key={index}
                className="min-w-full min-h-[600px] lg:min-h-full overflow-hidden relative group transition-transform duration-1000"
                style={{ transform: `translateX(${-currentImage * 100}%)` }}
              >
                <div className="w-full h-full relative">
                  {imageSrc && (
                    <img
                      src={imageSrc}
                      alt={data.title || data.name}
                      className="h-full w-full object-cover"
                    />
                  )}
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
                    <div className="flex items-center gap-2">
                      <p>Rating: {data.vote_average.toFixed(1)}+</p>
                      <span>|</span>
                      <p>{data.popularity} Views</p>
                    </div>

                    <button
                      onClick={() => handleDetails(data.id)}
                      className="bg-white px-4 py-2 text-black font-bold rounded mt-4 mb-4 hover:bg-gradient-to-l from-[#0e5c2d] to-[#01FF00] shadow-md transition-all hover:scale-105"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No data available</p>
      )}
    </section>
  );
};

export default BannerHome;
