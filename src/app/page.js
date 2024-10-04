"use client";
import Map from "../components/Map.js";
import GemCard from '../components/GemCard.js'
import { useState, useEffect } from "react";
import { fetchGems } from "@/api/api.js";

export default function Home() {
  const [gemsData, setGemsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetchGems().then((gems) => {
      setGemsData(gems);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <h1>Homepage</h1>
      <Map gemsData={gemsData} isLoading={isLoading}/>
      <GemCard gemsData={gemsData}/>
    </>
  );
}
