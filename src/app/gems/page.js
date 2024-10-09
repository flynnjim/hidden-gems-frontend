"use client";
import dynamic from "next/dynamic";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
// import Map from "@/components/Map";
// import GemCard from "@/components/GemCard";
const Map = dynamic(() => import("@/components/Map"), { ssr: false });
const GemCard = dynamic(() => import("@/components/GemCard"), {
  ssr: false,
});

import { useState, useEffect } from "react";
import { fetchGems } from "@/api/api.js";
import { Button } from "@headlessui/react";

const GemsList = () => {
  const [gemsData, setGemsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cultureGems, setCultureGems] = useState([]);
  const [natureGems, setNatureGems] = useState([]);
  const [foodGems, setFoodGems] = useState([]);
  const [sortBy, setSortBy] = useState("date");
  const [order, setOrder] = useState("ASC");
  const [buttonIcon, setButtonIcon] = useState("↑");

  useEffect(() => {
    setIsLoading(true);
    fetchGems(sortBy, order).then((gems) => {
      setGemsData(gems);
      fetchGems(sortBy, order, "culture").then((gems) => {
        setCultureGems(gems);
      });
      fetchGems(sortBy, order, "nature").then((gems) => {
        setNatureGems(gems);
      });
      fetchGems(sortBy, order, "food").then((gems) => {
        setFoodGems(gems);
      });
      setIsLoading(false);
    });
  }, [order, sortBy]);

  function switchDate() {
    setSortBy("date");
    setOrder("ASC");
    setButtonIcon("↑");
  }

  function switchRating() {
    setSortBy("rating");
    setOrder("DESC");
    setButtonIcon("↓");
  }

  function switchOrder() {
    const newOrder = order === "ASC" ? "DESC" : "ASC";
    setOrder(newOrder);
    const icon = order === "ASC" ? "↓" : "↑";
    setButtonIcon(icon);
  }

  // Expandable Form to post a new gem

  function expandForm(event) {
    event.preventDefault();
    setExpandGemForm(true);
  }

  function closeForm(event) {
    event.preventDefault();
    setExpandGemForm(false);
  }

  const tabClass =
    "rounded bg-customyellow p-2 text-sm text-black data-[hover]:bg-[#ffe8a7] data-[active]:bg-[#c2b16d] mb-2 mt-1 ml-2";

  const sortByClass =
    "rounded bg-customyellow p-2 text-sm text-black data-[hover]:bg-[#ffe8a7] data-[active]:bg-[#c2b16d] mb-2 mt-1 ml-2";

  return (
    <>
      <Map gemsData={gemsData} />
      <div className="container mt-3">
        <TabGroup className="flex flex-col justify-center items-center">
          <TabList className="container inline-flex place-content-around ">
            <Tab className={tabClass}>All Gems</Tab>
            <Tab className={tabClass}>Culture</Tab>
            <Tab className={tabClass}>Food</Tab>
            <Tab className={tabClass}>Nature</Tab>
          </TabList>
          <div className="container inline-flex place-content-around text-sm mt-1">
            <h1>Sort By:</h1>
            <Button className={sortByClass} onClick={switchDate}>
              Date
            </Button>
            <Button className={sortByClass} onClick={switchRating}>
              Rating
            </Button>
            <Button
              className={sortByClass}
              aria-label={order}
              onClick={switchOrder}
            >
              {buttonIcon}
            </Button>
          </div>
          <TabPanels>
            <TabPanel>
              <div className=" whitespace-wrap w-[80vw]">
                <ul className="">
                  {gemsData.map((gem) => {
                    return (
                      <li
                        key={gem.gem_id}
                        className="inline-block px-4 py-2 w-[80vw]"
                      >
                        <GemCard gem={gem} width={"900px"} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="whitespace-wrap w-[80vw]">
                <ul className="">
                  {cultureGems.map((gem) => {
                    return (
                      <li
                        key={gem.gem_id}
                        className="inline-block px-4 py-2 w-[80vw]"
                      >
                        <GemCard gem={gem} width={"900px"} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="whitespace-wrap w-[80vw]">
                <ul className="">
                  {foodGems.map((gem) => {
                    return (
                      <li
                        key={gem.gem_id}
                        className="inline-block px-4 py-2 w-[80vw]"
                      >
                        <GemCard gem={gem} width={"900px"} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="whitespace-wrap w-[80vw]">
                <ul className="">
                  {natureGems.map((gem) => {
                    return (
                      <li
                        key={gem.gem_id}
                        className="inline-block px-4 py-2 w-[80vw]"
                      >
                        <GemCard gem={gem} width={"900px"} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </>
  );
};
export default GemsList;
