import React from "react";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-6xl font-bold text-gray-800">Oops!</div>
      <div className="text-3xl font-medium text-gray-600 mb-4">
        Something went wrong.
      </div>
      <p className="text-gray-500 mb-8">
        The page you are looking for could not be found. Please try again later.
      </p>
      <a href="/" className="bg-blueg text-white font-bold py-2 px-4 rounded">
        Go Back Home
      </a>
    </div>
  );
};

export default Error;
