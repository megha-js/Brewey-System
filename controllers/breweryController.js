import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import axios from "axios";
import Brewery from "../models/Brewery.js";
import Review from "../models/Review.js";
import User from "../models/User.js";
import mongoose from "mongoose";
/*Due to http-status-codes module we do not 
need to write try catch code everytime.*/

const getBreweries = async (req, res) => {
  const category = req.query.category;
  const value = req.query.value.toLowerCase().replace(/\s/g, "_");
  const breweryData = await axios.get(
    `https://api.openbrewerydb.org/v1/breweries?${category}=${value}`
  );
  const { data } = breweryData;
  res.status(StatusCodes.OK).json({ data });
};
const getBreweryInfo = async (req, res) => {
  const breweryId = req.params.breweryId;
  const breweryData = await axios.get(
    `https://api.openbrewerydb.org/v1/breweries/${breweryId}`
  );
  const { data } = breweryData;
  res.status(StatusCodes.OK).json({ data });
};
const getReviews = async (req, res,next) => {
  try{
  const breweryId = req.params.breweryId;
  const brewery = await Brewery.findOne({breweryId:breweryId}).populate('reviews');
  res.status(StatusCodes.OK).json({ brewery });
  }
  catch(error)
  {
    next(error)
  }
};
const postReview = async (req, res,next) => {
  try {
    const breweryId = req.params.breweryId;
    const { rating, description } = req.body;
    if (!rating || !description) {
      throw new BadRequestError("Please provide all values");
    }

    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) {
      throw new UnAuthenticatedError("User not found");
    }
    const brewery = await Brewery.findOne({ breweryId: breweryId });
    if (!brewery) {
      const review = new Review({
        reviewerId: userId,
        reviewerName: user.name,
        rating,
        description,
      });
      const savedReview = await review.save();
      const brewery = new Brewery({
        breweryId: breweryId,
        reviews: [savedReview._id],
      });
      await brewery.save();
      const newBrewery = await Brewery.findOne({ breweryId: breweryId }).populate('reviews');
      // res.status(StatusCodes.OK).json({ message:"Done" });
      res.status(StatusCodes.CREATED).json({ brewery:newBrewery });
    } else {
      const isExist = await Review.findOne({
        reviewerId: userId,
        _id: { $in: brewery.reviews },
      });
      if (isExist) {
        throw new BadRequestError("You have already reviewed this brewery");
      } else {
        const review = new Review({
          reviewerId: userId,
          reviewerName: user.name,
          rating,
          description,
        });
        const savedReview = await review.save();
        brewery.reviews.push(savedReview.id);
        await brewery.save();
        const newBrewery = await Brewery.findOne({ breweryId: breweryId }).populate('reviews');
        res.status(StatusCodes.OK).json({ brewery:newBrewery });
      }
    }
  } catch (error) {
    next(error);
  }
};
const editReview = async (req, res) => {};
const deleteReview = async (req, res) => {};

export {
  getBreweries,
  getBreweryInfo,
  getReviews,
  postReview,
  editReview,
  deleteReview,
};
