import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

//keep in mind the collection name will be "users" in mongoDB since, it automatically pluralizes the model name "User" to "users".
//you can customize by using this syntax: ("User", userSchema, "your_custom_collection_name")
const User = mongoose.model("User", userSchema);

export default User;
