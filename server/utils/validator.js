import User from "../models/User.model.js"
import validator from "validator"
const isUserUnique = async (value, field) => {
    const userCount = await User.countDocuments({ [field]: value });
    return userCount == 0;
}

const isValidEmailFormat = (email) => {
    return validator.isEmail(email);
}

export {
    isUserUnique,
    isValidEmailFormat
};