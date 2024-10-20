"use client";

import React, { useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import BannerHome from "./_components/homepageComponents/BannerHome";
import MovieSection from "./_components/MovieSection";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { RootState } from "@/store/store";

const Page: React.FC = () => {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const trendingData = useSelector(
    (state: RootState) => state.movie.bannerData
  );
  const { data: nowPlayingData } = useFetch("/movie/now_playing");
  const { data: trending } = useFetch("/trending/all/week");
  const { data: popularData } = useFetch("/movie/popular");
  const { data: topRatedData } = useFetch("/movie/top_rated");
  const { data: movieListData } = useFetch("/discover/movie");
  const { data: tvShowsData } = useFetch("/discover/tv");

  const checkLoginGuestCookie = (): boolean => {
    const cookies = document.cookie
      .split(";")
      .reduce((acc: Record<string, boolean>, cookie) => {
        const [name] = cookie.trim().split("=");
        acc[name] = true;
        return acc;
      }, {});
    return !!cookies["Login_Guest"];
  };

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn && !checkLoginGuestCookie()) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <div>
      <BannerHome
        title="Trending Movies"
        data={trendingData}
        category="trendingData"
      />
      <MovieSection
        title="Now Playing"
        data={nowPlayingData}
        category="now-playing"
      />
      <MovieSection title="Trending Show" data={trending} category="trending" />
      <MovieSection title="Popular" data={popularData} category="popular" />
      <MovieSection
        title="Top Rated"
        data={topRatedData}
        category="top-rated"
      />
      <MovieSection title="Movie" data={movieListData} category="movie" />
      <MovieSection title="TV Shows" data={tvShowsData} category="tv" />
    </div>
  );
};

export default Page;
