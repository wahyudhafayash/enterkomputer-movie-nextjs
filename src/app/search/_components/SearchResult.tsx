import React from "react";
import Card from "@/app/_components/Card";
import { BannerItem } from "@/utils/interface";

interface SearchResultsProps {
  data: BannerItem[];
  loading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ data, loading }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (data.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.map((item) => (
        <Card key={item.id} data={item} category="search" />
      ))}
    </div>
  );
};

export default SearchResults;
