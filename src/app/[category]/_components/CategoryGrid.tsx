"use client";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { BannerItem } from "@/utils/interface";

interface CategoryGridProps {
  data: BannerItem[];
  imageUrl: string;
  validCategory: string;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
  data,
  imageUrl,
  validCategory,
}) => {
  const renderLabel = (item: BannerItem) => {
    if (item.popularity !== undefined && item.vote_average !== undefined) {
      return (
        <span className="flex items-center text-md font-semibold py-1 px-4 gap-2 bg-black/60 backdrop-blur-3xl rounded-r-full overflow-hidden">
          <FaStar color="yellow" className="mb-1" />
          {item.vote_average.toFixed(1)} | {item.popularity} Views
        </span>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {data.map((item) => (
        <Link
          href={`/details/${validCategory}/${item.id}`}
          key={item.id}
          className="w-full min-w-[195px] h-full rounded overflow-hidden relative hover:border hover:border-white"
        >
          <img
            src={`${imageUrl}${item.poster_path || ""}`}
            alt={item.title || item.name || "No Title"}
            className="w-full h-auto object-cover"
          />
          <div className="absolute top-2">{renderLabel(item)}</div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid;
