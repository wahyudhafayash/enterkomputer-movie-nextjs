"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const SearchPage: React.FC = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  useEffect(() => {
    console.log("Search Query:", searchQuery);
  }, [searchQuery]);
  return (
    <div>
      <h1>Search Page</h1>
      <p>Search Query: {searchQuery}</p>
    </div>
  );
};

export default SearchPage;
