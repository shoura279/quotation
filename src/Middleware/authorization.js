import { User } from "../DB/Models/user.model.js";
import { verifyToken } from "../Utils/Token/index.js";

export const isAuthorized = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(new Error("Authorization header is missing", { cause: 401 }));
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    return next(new Error("Token is missing", { cause: 401 }));
  }
  const payload = verifyToken(token);
  if (!payload) {
    return next(new Error("Invalid token", { cause: 401 }));
  }
  const user = await User.findById(payload.userId);
  if (!user) {
    return next(new Error("User not found", { cause: 401 }));
  }
  req.user = user;
  return next();
};

export const isAuthenticated =
  (role = []) =>
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      return next(new Error("User not found", { cause: 401 }));
    }
    if (role.length && !role.includes(user.role)) {
      return next(new Error("Unauthorized", { cause: 403 }));
    }
    return next();
  };
