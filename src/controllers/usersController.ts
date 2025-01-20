import { Request, Response } from "express";
import { ensureUserID } from "../services/usersService";

export const getFavorites = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const userID = ensureUserID(req, res);
    req.userID = userID;
    next();
  } catch (error) {
    console.error("Error ensuring user ID:", error);
    res.status(500).send("Internal server error.");
  }
};
