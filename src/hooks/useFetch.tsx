import axios from "@/config/axiosConfig";
import { setBannerData, setImageUrl } from "@/store/movieSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useFetch = (endpoint: string) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTrendingData = async () => {
    try {
      const response = await axios.get("/trending/all/week");
      dispatch(setBannerData(response.data.results));
    } catch (error) {
      console.error("Error fetching trending data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(endpoint);
      setData(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchConfiguration = async () => {
    try {
      const response = await axios.get("/configuration");
      const imageUrl = response.data.images.secure_base_url + "original";
      dispatch(setImageUrl(imageUrl));
    } catch (error) {
      console.error("Error fetching configuration:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchTrendingData();
    fetchData();
    fetchConfiguration().finally(() => setLoading(false));
  }, [endpoint]);

  return { data, loading };
};

export default useFetch;
