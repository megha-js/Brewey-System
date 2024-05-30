import React from "react";
import { useAppContext } from "../context/appContext";
import SearchBar from "../components/SearchBar";
import BreweryCard from "../components/BreweryCard";

const Breweries = () => {
  const { user, breweries } = useAppContext();

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className='text-4xl font-bold text-center my-4'>Breweries</div>
      <SearchBar />
      <div className="text-2xl font-bold text-center my-4">
        {(breweries?.length === 0 || !breweries) && "No breweries to show"}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {breweries?.map((brewery, index) => (
          <BreweryCard key={index} brewery={brewery} />
        ))}
      </div>
    </div>
  );
};

export default Breweries;
