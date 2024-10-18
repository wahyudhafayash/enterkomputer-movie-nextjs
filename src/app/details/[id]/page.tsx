"use client";
import { useParams } from "next/navigation";
import React from "react";

const DetailPage: React.FC = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Detail Page for Item {id}</h1>

      <p>Detail informasi untuk item dengan ID: {id}</p>
    </div>
  );
};

export default DetailPage;
