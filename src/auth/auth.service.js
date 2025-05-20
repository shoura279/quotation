import { User } from "../DB/Models/user.model.js";
import { hashPassword } from "../Utils/Hash/index.js";
import { generateToken } from "../Utils/Token/index.js";

export const register = async (req, res, next) => {
  const { name, email, password, companyName, phone } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) throw new Error("user already exist!");
  const hashedPassword = hashPassword(password);
  const createdUser = await User.create({
    name,
    email,
    password: hashedPassword,
    companyName,
    phone,
  });
  createdUser.password = undefined; // delete password from response
  return res.status(201).json({
    success: true,
    message: "user created successfully",
    data: createdUser,
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("user not found!");
  const isPasswordCorrect = await comparePassword(password, user.password);
  if (!isPasswordCorrect) throw new Error("invalid password!");
  const token = generateToken({ userId: user._id });
  return res.status(200).json({
    success: true,
    message: "user logged in successfully",
    data: {
      token,
    },
  });
};
