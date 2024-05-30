import React from 'react';
import { useNavigate } from 'react-router-dom';

const BreweryCard = ({ brewery }) => {
  const {
    id,
    name,
    address_1,
    phone,
    website_url,
    rating,
    state,
    city,
  } = brewery;
  const navigate = useNavigate();

  return (
    <div
      className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden my-4 cursor-pointer transition-transform transform hover:scale-105"
      onClick={() => navigate(`/breweryInfo/${id}`)}
    >
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-bold text-gray-800">{name}</div>
          <div className="ml-4 text-sm text-yellow-500 flex items-center">
          </div>
        </div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-600">{address_1}</p>
          <p className="text-sm text-gray-600">
            {city}, {state}
          </p>
        </div>
        <p className="text-sm text-gray-600 mb-2">{phone}</p>
        <a
          href={website_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-500 hover:underline"
        >
          {website_url}
        </a>
      </div>
    </div>
  );
};

export default BreweryCard;
