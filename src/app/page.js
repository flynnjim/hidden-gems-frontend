// "use client";
import Map from "../components/Map.js";
// import { useState, useEffect } from "react";
// import { fetchGems } from "@/api/api.js";

export default function Home() {
  // const [gemsData, setGemsData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   setIsLoading(true);
  //   setIsLoading(false);
  //   fetchGems().then((gems) => {
  //     setGemsData(gems);
  //   });
  // }, []);
  return (
    <>
      <h1>Homepage</h1>
      <Map />
    </>
  );
}
