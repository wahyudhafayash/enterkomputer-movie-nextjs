import React from "react";
import moment from "moment";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { CardProps } from "@/utils/interface";
import { FaStar } from "react-icons/fa";

const Card: React.FC<CardProps> = ({ data, category, index }) => {
  const imageUrl = useSelector(
    (state: RootState) => state.movie.imageUrl || ""
  );

  const renderLabel = () => {
    if (category === "trending" && index !== undefined) {
      return (
        <span className="text-md font-semibold py-1 px-4 bg-black/60 backdrop-blur-3xl rounded-r-full overflow-hidden">
          #{index + 1} Trending
        </span>
      );
    }

    if (category === "popular" && data.popularity) {
      return (
        <span className="text-md font-semibold py-1 px-4 bg-black/60 backdrop-blur-3xl rounded-r-full overflow-hidden">
          {data.popularity.toFixed(1)} Views
        </span>
      );
    }
    if (category === "top-rated" && data.vote_average) {
      return (
        <span className="flex items-center text-md font-semibold py-1 px-4 gap-2 bg-black/60 backdrop-blur-3xl rounded-r-full overflow-hidden">
          <FaStar color="yellow" className="mb-1" />
          {data.vote_average.toFixed(1)}
        </span>
      );
    }
    if (category === "now-playing" && data.release_date) {
      return (
        <span className="flex items-center text-md font-semibold py-1 px-4 gap-2 bg-black/60 backdrop-blur-3xl rounded-r-full overflow-hidden">
          {moment(data.release_date).format("MMM Do YYYY")}
        </span>
      );
    }
    return null;
  };

  const posterPath = data.poster_path
    ? imageUrl + data.poster_path
    : "/default-poster.png";

  return (
    <div className="w-full min-w-[195px] h-full rounded overflow-hidden relative hover:border hover:border-white">
      <Link href={`/details/${category}/${data.id}`}>
        <img
          src={posterPath}
          alt={data.title}
          className="w-full h-auto object-cover"
        />
        <div className="absolute top-2">{renderLabel()}</div>
      </Link>
    </div>
  );
};

export default Card;
