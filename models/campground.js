const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

// https://res.cloudinary.com/douqbebwk/image/upload/w_300/v1600113904/YelpCamp/gxgle1ovzd2f3dgcpass.png

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
return this.url.replace("/upload", "/upload/w_200");
});
ImageSchema.virtual('cardImage').get(function() {
return this.url.replace('/upload', '/upload/ar_4:3,c_crop'); })

const opts = { toJSON: { virtuals: true }, timestamps: true };

const CampgroundSchema = new Schema(
  {
    title: String,
    images: [ImageSchema],
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    location: String,
    description: String,
    scope: String,
       scope_starty: String,
    scope_startq: String,
    scope_endy: String,
     scope_endq: String,
    equipment1: String,
      equipment1_starty: String,
     equipment1_startq: String,
     equipment1_endy: String,
      equipment1_endq: String,
     equipment2: String,
      equipment2_starty: String,
   equipment2_startq: String,
 equipment2_endy: String,
   equipment2_endq: String,
    safeguards: String,
    gender: String,
  
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  opts
);

CampgroundSchema.virtual("properties.popUpMarkup").get(function () {
  return `
    <strong><a href="/campgrounds/${this._id}">${this.title}</a><strong>
    <p>${this.description.substring(0, 20)}...</p>`;
});

CampgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Campground", CampgroundSchema);
