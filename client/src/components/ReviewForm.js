import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

const ReviewForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    rating: 1,
    description: ""
  });
  const { createReviewPost } = useAppContext();
  const { breweryId } = useParams();

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const { rating, description } = formData;
  const review = { rating, description, breweryId };

  const handleSubmit = (e) => {
    e.preventDefault();
    createReviewPost(review);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Add Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-6">
          <label
            className="text-lg font-semibold text-gray-700 mb-2"
            htmlFor="rating"
          >
            Rating
          </label>
          <select
            id="rating"
            name="rating"
            className="w-full h-12 border border-gray-300 rounded-lg p-3
              focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
            value={rating}
            required
            onChange={onChange}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col mb-6">
          <label
            className="text-lg font-semibold text-gray-700 mb-2"
            htmlFor="description"
          >
            Review Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            className="w-full h-32 border border-gray-300 rounded-lg p-3
              focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out resize-none"
            value={description}
            onChange={onChange}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg font-semibold
            hover:bg-blue-600 focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
        >
          Add Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
