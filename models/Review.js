import mongoose from "mongoose";
const ReviewSchema = new mongoose.Schema({
  reviewerName: {
    type: String,
    required: [true, "Please provide reviewer name"],
  },
  reviewerId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide reviewer id"],
  },
  rating: {
    type: Number,
    required: [true, "Please provide rating"],
    default: 1,
  },
  description: {
    type: String,
    required: [true, "Please provide description"],
    minlength: 6,
  },
});

export default mongoose.model("Review", ReviewSchema);
