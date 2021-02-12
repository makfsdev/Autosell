const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "seller",
    },
    // cars: [{type: ObjectId, ref:"Cars"}],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
