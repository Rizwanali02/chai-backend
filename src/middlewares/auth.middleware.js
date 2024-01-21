import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import  Jwt from "jsonwebtoken";


export const verifyJWT = asyncHandler(async (req, res, next) => {
   try {
    const token = req.cookie?.replace("Bearer ", "")

    if (!token) {
        throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = Jwt.verify(token, process.env.ACCECSS_TOKEN_SECRET)

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(401, "Invalid Access Token")
    }

    req.user = user;

    next();

   } catch (error) {
    throw new ApiError(401, "Invalid Access Token")
   } 

})