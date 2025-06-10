import mongoose from "mongoose";

const classLevels = ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];

const profileSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    regNumber: {
      type: String,
      required: [true, "Student Registration number is required"],
      unique: true,
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State of Origin is required"],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    class: {
      type: String,
      required: [true, "Class is required"],
      enum: classLevels,
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: ["student", "admin"],
      default: "student",
      trim: true,
    },
  },
  { timestamps: true }
);

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);

export default Profile;
