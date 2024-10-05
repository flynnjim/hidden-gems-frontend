"use client";
import Map from "../components/Map.js";
import GemCard from "../components/GemCard.js";
import { useState, useEffect } from "react";
import { fetchGems } from "@/api/api.js";
import Link from "next/link.js";

export default function Home() {
  const [gemsData, setGemsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [topGems, setTopGems] = useState([]);
  const [soonestGems, setSoonestGems] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetchGems().then((gems) => {
      setGemsData(gems);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchGems("rating").then((gems) => {
      setTopGems([gems[0], gems[1], gems[2]]);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchGems("date", "ASC").then((gems) => {
      setSoonestGems([gems[0], gems[1], gems[2]]);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <h1>Home Page</h1>
      <Map gemsData={gemsData} />
      <div>
        <button><Link href={"/gems"}>Post a Gem HERE</Link></button>
      </div>
      <h2>TOP GEMS TODAY</h2>
      <div className="bg-red-100 overflow-x-auto whitespace-nowrap w-[80vw]">
        <ul className="flex space-x-4 p-4">
          {topGems.map((gem) => {
            return (
              <li key={gem.gem_id} className="inline-block px-4 py-2">
                <GemCard gem={gem} />
              </li>
            );
          })}
        </ul>
      </div>
      <h2>GEMS HAPPENING SOON</h2>
      <div className="bg-red-100 overflow-x-auto whitespace-nowrap w-[80vw]">
        <ul className="flex space-x-4 p-4">
          {soonestGems.map((gem) => {
            return (
              <li key={gem.gem_id} className="inline-block px-4 py-2">
                <GemCard gem={gem} />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  )}
