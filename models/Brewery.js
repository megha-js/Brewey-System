import mongoose from "mongoose";
const BrewerySchema = new mongoose.Schema({
  breweryId: {
    type: String,
    required: [true, "Please provide breweryId"],
  },
  reviews:[
    {
        type: mongoose.Types.ObjectId,
        ref: "Review"
    }
  ]
});

export default mongoose.model("Brewery", BrewerySchema);
