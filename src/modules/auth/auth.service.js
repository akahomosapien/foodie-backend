import User from "#modules/user/user.model.js";
import { sendOTPMail } from "#shared/services/email.service.js";
import generateToken from "#shared/services/genToken.service.js";
import CustomError from "#shared/utils/CustomError.util.js";
import generateOtp from "#shared/utils/otp.util.js";
import bcrypt from "bcryptjs";

export const signUpService = async ({
  fullName,
  email,
  password,
  mobile,
  role,
}) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new CustomError("User already exists", 409);

  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  //create user
  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
    mobile,
    role,
  });

  //generate token
  const token = await generateToken({ id: user._id, expiry: "7d" });
  user.password = undefined;

  return { user, token };
};

export const signInService = async ({ email, password }) => {
  //find user
  const user = await User.findOne({ email });
  if (!user) throw new CustomError("User not found", 404);

  //check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new CustomError("Incorrect Password", 400);
  }

  //generate token
  const token = await generateToken({ id: user._id, expiry: "7d" });

  return { status: true, token };
};

export const sendOtpService = async ({ email }) => {
  //search user
  const user = await User.findOne({ email });
  if (!user) throw new CustomError("User not found", 404);

  //Generate otp
  const { otp, otpExpiry } = generateOtp();
  const hashedOtp = await bcrypt.hash(otp, 10);

  user.otp = hashedOtp;
  user.otpExpiresAt = otpExpiry;
  user.isOtpVerified = false;

  await user.save();

  await sendOTPMail({ email, otp });

  return true;
};
