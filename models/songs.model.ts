import mongoose from "mongoose";

const sognsSchema = new mongoose.Schema(
  {
    title: String,
    avatar: String,
    status: String,
    singerId: String,
    topicId: String,
    like: Number,
    lyrics: String,
    audio: String,
    description: String,
    slug: {
      type: String,
      slug: "title",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true }
);

const Songs = mongoose.model("Songs", sognsSchema, "songs");
export default Songs;
