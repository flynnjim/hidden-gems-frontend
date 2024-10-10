"use client";
import { useState, useEffect } from "react";
import { fetchGems } from "@/api/api.js";
import Link from "next/link.js";
import { LoadingScreen } from "@/components/LoadingStatuses.js";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map.js"), { ssr: false });
const GemCard = dynamic(() => import("../components/GemCard.js"), {
  ssr: false,
});

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
    fetchGems("rating", "desc").then((gems) => {
      const filteredGems = gems.filter((gem) => gem.rating !== null);

      const topGemListLength = Math.min(filteredGems.length, 3);

      const gemsTopShowTrending = filteredGems.slice(0, topGemListLength);

      setTopGems(gemsTopShowTrending);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchGems("date", "ASC").then((gems) => {
      const today = new Date();

      const futureGems = gems.filter((gem) => new Date(gem.date) > today);

      const gemsComingSoon = futureGems.slice(
        0,
        Math.min(futureGems.length, 3)
      );

      setSoonestGems(gemsComingSoon);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  }
  return (
    <>
      <Map gemsData={gemsData} />
      <div className="bg-listcolor overflow-x-auto whitespace-nowrap w-[100%] ">
        <h2 className="italic font-bold text-center text-bgcolor pt-3">
          Top Gems Today
        </h2>
      </div>
      <div className="bg-listcolor overflow-x-auto whitespace-nowrap w-[100%]">
        <ul className="flex space-x-4">
          {topGems.map((gem) => {
            return (
              <li
                key={gem.gem_id}
                className="inline-block px-4 py-2 ml-4 mb-4 mr-4"
              >
                <GemCard gem={gem} />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="bg-listcolor overflow-x-auto whitespace-nowrap w-[100%] mt-3">
        <h2 className="italic font-bold text-center text-bgcolor pt-3">
          Gems Happening Soon
        </h2>
      </div>
      <div className="bg-listcolor overflow-x-auto whitespace-nowrap w-[100%]">
        <ul className="flex space-x-4">
          {soonestGems.map((gem) => {
            return (
              <li
                key={gem.gem_id}
                className="inline-block px-4 py-2 ml-4 mb-4 mr-4"
              >
                <GemCard gem={gem} />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
