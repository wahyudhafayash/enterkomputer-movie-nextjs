"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBannerData, setImageUrl } from "@/store/movieSlice";
import axios from "@/config/axiosConfig";
import BannerHome from "./_components/homepageComponents/BannerHome";

const Page = () => {
  const dispatch = useDispatch();

  const fetchTrendingData = async () => {
    try {
      const response = await axios.get("/trending/all/week");

      dispatch(setBannerData(response.data.results));
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchCongiguration = async () => {
    try {
      const response = await axios.get("/configuration");

      dispatch(setImageUrl(response.data.images.secure_base_url + "original"));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrendingData();
    fetchCongiguration();
  }, []);

  return (
    <div>
      <BannerHome />
    </div>
  );
};

export default Page;
