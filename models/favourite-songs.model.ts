import mongoose from "mongoose";

const favouriteSongsSchema = new mongoose.Schema(
  {
    userId: String,
    songId: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true }
);

const FavouriteSongs = mongoose.model(
  "FavouriteSongs",
  favouriteSongsSchema,
  "favourite-songs"
);
export default FavouriteSongs;
