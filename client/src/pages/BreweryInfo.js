import React, { useEffect } from 'react';
import BreweryInfoPageCard from '../components/BreweryInfoPageCard';
import Review from '../components/Review';
import ReviewForm from '../components/ReviewForm';
import { useAppContext } from '../context/appContext';
import { useParams } from 'react-router-dom';

const BreweryInfo = () => {
  const { getBreweriesInfo, getBreweriesReviews } = useAppContext();
  const { breweryId } = useParams();

  useEffect(() => {
    getBreweriesInfo(breweryId);
    getBreweriesReviews(breweryId);
  }, [breweryId]);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className='text-4xl font-bold text-center my-4'>Brewery Information</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BreweryInfoPageCard />
        <div>
          <Review />
          <ReviewForm />
        </div>
      </div>
    </div>
  );
};

export default BreweryInfo;
