// pages/[category].tsx (or wherever your CategoryPage is defined)
"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "@/config/axiosConfig";
import { BannerItem, RootState } from "@/utils/interface";
import CategoryGrid from "./_components/CategoryGrid";

const validCategories = [
  "trendingData",
  "popular",
  "now-playing",
  "top-rated",
  "movie",
  "tv",
] as const;

type Category = (typeof validCategories)[number];

const useFetchData = (category: Category) => {
  const [data, setData] = useState<BannerItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const allResults: BannerItem[] = [];
        let page = 1;

        while (allResults.length < 300) {
          const response = await axios.get(`/discover/${category}`, {
            params: { page },
          });
          allResults.push(...response.data.results);

          if (response.data.results.length === 0) break;
          page++;
        }

        setData(allResults.slice(0, 300));
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  return { data, loading, error };
};

const CategoryPage = () => {
  const { category } = useParams();
  const imageUrl = useSelector((state: RootState) => state.movie.imageUrl);

  const categoryParam = Array.isArray(category) ? category[0] : category;
  const validCategory: Category = validCategories.includes(
    categoryParam as Category
  )
    ? (categoryParam as Category)
    : "popular";

  const { data, loading, error } = useFetchData(validCategory);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="pt-16 px-20">
      <h1 className="my-6 text-3xl font-bold">
        {validCategory === "tv" ? "Popular TV Shows" : "Popular Movies"}
      </h1>
      <CategoryGrid
        data={data}
        imageUrl={imageUrl}
        validCategory={validCategory}
      />
    </div>
  );
};

export default CategoryPage;
