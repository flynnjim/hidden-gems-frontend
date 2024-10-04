"use client";
import Map from "@/components/Map";
import GemCard from "@/components/GemCard";
import { useState, useEffect } from "react";
import { fetchGems } from "@/api/api.js";

const Gems = () => {
  const [gemsData, setGemsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchGems().then((gems) => {
      setGemsData(gems);
      setIsLoading(false);
    });
  }, []);
  return (
    <>
      <h1>Gems Page</h1>
      <h1>FILTERS | SORT BY</h1>
      <Map gemsData={gemsData} />
      <div className="bg-red-100 whitespace-wrap w-[80vw]">
        <ul className="">
          {gemsData.map((gem) => {
            return (
              <li key={gem.gem_id} className="inline-block px-4 py-2 w-[80vw]">
                <GemCard gem={gem} />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default Gems;
