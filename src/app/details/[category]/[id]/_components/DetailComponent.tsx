"use client";

import React from "react";
import { useParams } from "next/navigation";
import useFetchDetails from "@/hooks/useFetchDetail";
import useFetch from "@/hooks/useFetch";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/interface";
import { FaStar } from "react-icons/fa";
import moment from "moment";
import Divider from "./Divider";
import MovieSection from "@/app/_components/MovieSection";

const DetailsPage = () => {
  const params = useParams();
  const imageUrl = useSelector((state: RootState) => state.movie.imageUrl);
  const { category, id } = params;

  const endpoint = category === "tv" ? `/tv/${id}` : `/movie/${id}`;
  const { data, loading } = useFetchDetails(endpoint);

  const castEndpoint =
    category === "tv" ? `/tv/${id}/credits` : `/movie/${id}/credits`;
  const { data: castData, loading: castLoading } =
    useFetchDetails(castEndpoint);

  const similarEndpoint =
    category === "tv" ? `/tv/${id}/similar` : `/movie/${id}/similar`;
  const { data: similarData, loading: similarLoading } =
    useFetch(similarEndpoint);

  const recommendationEndpoint =
    category === "tv"
      ? `/tv/${id}/recommendations`
      : `/movie/${id}/recommendations`;
  const { data: recommendationData, loading: recommendationLoading } = useFetch(
    recommendationEndpoint
  );

  if (loading || castLoading || similarLoading || recommendationLoading) {
    return <div>Loading...</div>;
  }

  const duration = (Number(data?.runtime) / 60).toFixed(1).split(".");
  const director = castData?.crew
    ?.filter((el: { job: string }) => el?.job === "Director")
    ?.map((el: { name: any }) => el?.name)
    .join(", ");
  const writer = castData?.crew
    ?.filter((el: { job: string }) => el?.job === "Writer")
    ?.map((el: { name: any }) => el?.name)
    .join(", ");

  const validCategory = category as "movie" | "tv";

  const similarTitle =
    category === "tv" ? "Similar TV Shows" : "Similar Movies";
  const recommendationTitle =
    category === "tv" ? "Recommendations TV Shows" : "Recommendations Movies";

  return (
    <div>
      <div className="w-full h-[400px] relative hidden lg:block">
        <div className="w-full h-full">
          <img
            src={imageUrl + data?.backdrop_path}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent"></div>
      </div>

      <div className="container mx-auto px-2 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10">
        <div className="relative mx-auto lg:-mt-40 lg:mx-0 w-fit min-w-[300px]">
          <img
            src={imageUrl + data?.poster_path}
            alt=""
            className="w-[300px] h-[400px] object-cover rounded"
          />
        </div>

        <div>
          <h2 className="text-5xl font-bold text-white">
            {data?.title || data?.name}
          </h2>
          <p className="text-neutral-400">{data?.tagline}</p>

          <Divider />

          <div className="flex items-center gap-3">
            <p className="flex items-center gap-2 text-md">
              <FaStar color="yellow" className="mb-1" />
              {Number(data?.vote_average).toFixed(1)}
            </p>
            <span>|</span>
            <p>View : {data?.popularity}</p>
            <span>|</span>
            <p>
              Duration : {duration[0]}h {duration[1]} Min
            </p>
          </div>

          <Divider />

          <div>
            <h3 className="text-2xl font-bold text-white my-1">Overview</h3>
            <p>{data?.overview}</p>

            <Divider />

            <div className="flex items-center my-1 gap-3 text-center">
              <p>Status : {data?.status}</p>
              <span>|</span>
              <p>
                Release Date :{" "}
                {moment(data?.release_date).format("MMM Do YYYY")}
              </p>
              <span>|</span>
              <p>
                Revenue : {Number(data?.revenue).toLocaleString("in-ID", {})}
              </p>
            </div>

            <Divider />

            <div>
              <p>
                <span className="text-white">Director</span> : {director}
              </p>
              <Divider />
              <p>
                <span className="text-white">Writer</span> : {writer}
              </p>
            </div>

            <Divider />

            <h2 className="font-bold text-2xl text-white">Cast :</h2>

            <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-5">
              {castData?.cast
                ?.filter((el: any) => el?.profile_path)
                .map((cast: any) => (
                  <div key={cast.id}>
                    <div>
                      <img
                        src={imageUrl + cast?.profile_path}
                        alt={cast.name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    </div>

                    <p className="font-bold text-center text-md">
                      {cast?.name}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <MovieSection
          title={similarTitle}
          data={similarData}
          category={validCategory}
        />
        <MovieSection
          title={recommendationTitle}
          data={recommendationData}
          category={validCategory}
        />
      </div>
    </div>
  );
};

export default DetailsPage;
