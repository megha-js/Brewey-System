import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import Loader from './Loader';

const BreweryInfoPageCard = () => {
  const { breweriesInfo, isLoading } = useAppContext();
  const {
    name,
    brewery_type,
    address_1,
    city,
    state_province,
    postal_code,
    country,
    longitude,
    latitude,
    phone,
    website_url,
    state,
    street
  } = breweriesInfo;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white shadow-lg border border-gray-200 rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-black">{name}</h1>
        <p className="text-lg text-indigo-600 font-semibold">{brewery_type?.toUpperCase()}</p>
      </div>
      <p className="text-black text-base mb-4">
        {address_1}, {street}, {city}, {state_province}, {state}, {postal_code}, {country}
      </p>
      <p className="text-black text-base mb-4">
        Longitude: {longitude}, Latitude: {latitude}
      </p>
      <div className="flex justify-between items-center mb-4">
        <p className="text-black text-base">Phone: {phone}</p>
        <p className="text-black text-base">
          Website: <a href={website_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{website_url}</a>
        </p>
      </div>
    </div>
  );
};

export default BreweryInfoPageCard;
