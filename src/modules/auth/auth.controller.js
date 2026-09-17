import asyncHandler from "#middlewares/async.middleware.js";
import successResponse from "#shared/utils/apiResponse.util.js";
import CustomError from "#shared/utils/CustomError.util.js";
import setAuthCookie from "#shared/utils/setCookie.util.js";
import {
  sendOtpService,
  signInService,
  signUpService,
} from "./auth.service.js";

export const signUp = asyncHandler(async (req, res) => {
  const { fullName, email, password, mobile, role } = req.body;

  if (!fullName || !email || !mobile || !role) {
    throw new CustomError("All mandatory fields are required");
  }
  if (password && password.length < 6) {
    throw new CustomError("Password must be atleast 6 characters");
  }
  if (mobile.length < 10) {
    throw new CustomError("Mobile No must be atleast 10 digits");
  }

  const data = await signUpService({ fullName, email, password, mobile, role });
  //parse in cookies
  setAuthCookie(res, data.token);

  successResponse(res, "You are registered successfully", data.user, 201);
});

export const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError("All mandatory fields are required");
  }

  const data = await signInService({ email, password });

  //parse in cookies
  setAuthCookie(res, data.token);

  successResponse(res, "Logged in successfully", data.status, 200);
});

export const signout = asyncHandler(async (req, res) => {
  res.clearCookie("token");

  successResponse(res, "Logged out successfully", true, 200);
});

export const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) throw new CustomError("Email is required", 422);
  const data = await sendOtpService({ email });

  successResponse(res, "OTP sent to email successfully", data, 200);
});
