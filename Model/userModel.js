import mongoose, { model } from "mongoose";
const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please add the userName"],
  },
  userEmail: {
    type: String,
    required: [true, "Please add the userEmail"],
  },
  password: {
    type: String,
    required: [true, "Please add the password"],
  },
  reportingTo: {
    type: String,
    // required: [true, "Please add your reportee"],
  },
  contactNumber: {
    type: Number,
    required: [true, "Please add your Contact number"],
  },
});
const UserModal = model("User", userSchema);

export default UserModal;
