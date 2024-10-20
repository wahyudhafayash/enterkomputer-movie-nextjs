"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "@/config/axiosConfig";
import SearchResults from "@/app/search/_components/SearchResult";
import { BannerItem } from "@/utils/interface";

const SearchPage: React.FC = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const [data, setData] = useState<BannerItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (query: string) => {
    setLoading(true);
    try {
      const allResults: BannerItem[] = [];
      let page = 1;

      while (true) {
        const response = await axios.get(`/search/collection`, {
          params: { query, page },
        });
        allResults.push(...response.data.results);
        if (response.data.results.length === 0) break;
        page++;
      }

      setData(allResults);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchData(searchQuery);
    } else {
      setData([]);
    }
  }, [searchQuery]);

  return (
    <div className="pt-16">
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">
          Search Results for "{searchQuery}"
        </h3>
        <SearchResults data={data} loading={loading} />
      </div>
    </div>
  );
};

const Page: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SearchPage />
  </Suspense>
);

export default Page;
