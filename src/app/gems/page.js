"use client";
import dynamic from "next/dynamic";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
// import Map from "@/components/Map";
// import GemCard from "@/components/GemCard";
const Map = dynamic(() => import("../components/Map.js"), { ssr: false });
const GemCard = dynamic(() => import("../components/GemCard.js"), {
  ssr: false,
});

import { useState, useEffect } from "react";
import { fetchGems } from "@/api/api.js";
import { PostGem } from "@/components/PostGem";

const GemsList = () => {
  const [gemsData, setGemsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cultureGems, setCultureGems] = useState([]);
  const [natureGems, setNatureGems] = useState([]);
  const [foodGems, setFoodGems] = useState([]);
  const [sortBy, setSortBy] = useState("date");
  const [order, setOrder] = useState("ASC");
  const [buttonIcon, setButtonIcon] = useState("↑");
  const [expandGemForm, setExpandGemForm] = useState(null);

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
    setExpandGemForm(true)
  }

  function closeForm(event) {
    event.preventDefault()
    setExpandGemForm(false)
  }

  return (
    <>
      <h1>Gems Page</h1>
      <Map gemsData={gemsData} />
      <div> 
        <button onClick={expandForm}>Post a New Gem HERE</button>
        {expandGemForm ? <div><PostGem setGemsData={setGemsData}/> <button onClick={closeForm}>Cancel</button> </div> : null}
      </div>
      <TabGroup className="flex flex-col justify-center items-center">
        <TabList className="container inline-flex place-content-around">
          <Tab>All Gems</Tab>
          <Tab>Culture</Tab>
          <Tab>Food</Tab>
          <Tab>Nature</Tab>
        </TabList>
        <h1>SORT BY:</h1>
        <div className="container inline-flex place-content-around">
          <button onClick={switchDate}>DATE</button>
          <button onClick={switchRating}>RATING</button>
          <button aria-label={order} onClick={switchOrder}>
            {buttonIcon}
          </button>
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
                      <GemCard gem={gem} />
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
                      <GemCard gem={gem} />
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
                      <GemCard gem={gem} />
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
                      <GemCard gem={gem} />
                    </li>
                  );
                })}
              </ul>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  );
};
export default GemsList;
