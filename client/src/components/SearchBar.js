import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppContext } from '../context/appContext';
import Loader from './Loader';

const SearchBar = () => {
  const { getBreweries, isLoading } = useAppContext();
  const [selectedOption, setSelectedOption] = useState('by_city');
  const [searchTerm, setSearchTerm] = useState('');

  async function handleSearch(e) {
    e.preventDefault();
    if (searchTerm?.length === 0) {
      toast.error("Please enter some search text.");
      return;
    }
    const searchParameter = { category: selectedOption, value: searchTerm };
    await getBreweries(searchParameter);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-2xl mx-auto">
      <div className="flex justify-center items-center space-x-4">
        <select
          className="p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-black"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="by_city">City</option>
          <option value="by_name">Name</option>
          <option value="by_type">Type</option>
        </select>
        <form onSubmit={handleSearch} className="flex space-x-2">
          <input
            type="text"
            placeholder={`Search By ${selectedOption === 'by_city' ? 'City' : selectedOption === 'by_name' ? 'Name' : 'Type'}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="p-3 bg-black text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
