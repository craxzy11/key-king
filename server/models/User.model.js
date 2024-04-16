import mongoose from "mongoose"
import { isUserUnique, isValidEmailFormat } from "../utills/validator.js";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
    required: [true, "UserName is required!"],
    minLength: [6, "Username should contain atleast 6 characters."],
    maxLength: [50, "Username length should not exceed 50 characters."],
    validate: {
      validator: (value) => isUserUnique(value, "userName"),
      message: props => `${props.value} is already taken. Please choose a different username!`
    }
  },
  firstName: {
    type: String,
    required: [true, "First name is required!"],
    minLength: [2, "First Name should have atleast 2 characters."],
    maxLength: [20, "First name max length should not be greater than 20."]
  },
  lastName: {
    type: String,
    required: [true, "Last name is required!"],
    minLength: [2, "Last Name should have atleast 2 characters."],
    maxLength: [20, "Last name max length should not be greater than 20."]
  },
  emailId: {
    type: String,
    required: true,
    validate: [
      {
        validator: value => isUserUnique(value, "emailId"),
        message: props => `${props.value} is already being used in different account.`,
      },
      {
        validator: isValidEmailFormat,
        message: "Please enter correct email id.",
      },
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  profilePicLink: {
    type: String,
    default: "",
  }
}, {
  timestamps: true,
  indexes: [
    { 
      key: { _id: 1 }, 
      unique: true, 
      background: true 
    }
  ]
});

const User = mongoose.model("User", UserSchema);

export default User;