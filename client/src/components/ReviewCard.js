import React from 'react';
import { BsFillStarFill } from 'react-icons/bs';

const ReviewCard = ({ review }) => {
  const { reviewerName, rating, description } = review;

  // Function to render the star icons based on the rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <BsFillStarFill
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden mb-4">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900">{reviewerName}</h3>
          <div className="flex items-center">
            <div className="flex">
              {renderStars(rating)}
            </div>
            <span className="ml-2 text-blue-600 font-semibold">{rating}/5</span>
          </div>
        </div>
        <div className="text-gray-700 text-base mt-2">
          <h4 className="font-semibold mb-1">Description:</h4>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
