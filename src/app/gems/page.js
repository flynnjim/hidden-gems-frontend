"use client";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Map from "@/components/Map";
import GemCard from "@/components/GemCard";
import { useState, useEffect } from "react";
import { fetchGems } from "@/api/api.js";

const Gems = () => {
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

  return (
    <>
      <h1>Gems Page</h1>
      <Map gemsData={gemsData} />
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
export default Gems;
