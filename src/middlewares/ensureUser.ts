import { Request, Response, NextFunction } from "express";
import { ensureUserID } from "../services/usersService";

export const ensureUserMiddleware = (
  req: Request & { userID?: string },
  res: Response,
  next: NextFunction
) => {
  try {
    const userID = ensureUserID(req, res);
    req.userID = userID;
    next();
  } catch (error) {
    console.error("Error in ensureUserMiddleware:", error);
    res.status(401).send("Unauthorized");
  }
};
