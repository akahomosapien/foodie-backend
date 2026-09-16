import User from "#modules/user/user.model.js";
import generateToken from "#shared/services/genToken.service.js";
import CustomError from "#shared/utils/CustomError.util.js";
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
