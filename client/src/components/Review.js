import React from "react";
import ReviewCard from "./ReviewCard";
import { useAppContext } from "../context/appContext";
import Loader from "./Loader";

const Review = () => {
  const { breweriesReviews, isLoading } = useAppContext();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-2xl mx-auto mt-4 bg-white shadow-lg border border-gray-200 rounded-lg p-6 mb-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Reviews</h2>
      <div className="grid gap-4">
        {breweriesReviews?.map((review, index) => (
          <ReviewCard review={review} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Review;
