import mongoose from "mongoose";

const singersSchema = new mongoose.Schema(
  {
    fullName: String,
    avatar: String,
    status: String,
    slug: {
      type: String,
      slug: "fullName",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true }
);

const Singers = mongoose.model("Singers", singersSchema, "singers");
export default Singers;
