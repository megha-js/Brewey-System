import express from "express";
const router = express.Router();
import {
    deleteReview,
    editReview,
    getBreweries,
    getBreweryInfo,
    getReviews,
    postReview,
} from "../controllers/breweryController.js";
import authenticateUser from "../middleware/auth.js";
router.route("/").get(getBreweries);

router.route("/:breweryId").get(authenticateUser,getBreweryInfo);
router.route("/:breweryId/reviews").get(authenticateUser,getReviews).post(authenticateUser,postReview);
router.route("/:breweryId/reviews/:reviewId").patch(authenticateUser,editReview).delete(authenticateUser,deleteReview);

export default router;
