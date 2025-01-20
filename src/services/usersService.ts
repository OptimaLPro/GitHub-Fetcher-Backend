import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const ensureUserID = (req: Request, res: Response): string => {
  let userID = req.cookies.userID;
  console.log("User ID from cookies:", userID);
  if (!userID) {
    console.log("No user ID found. Creating a new one.");
    userID = uuidv4();
    // Set the cookie with the user ID
    res.cookie("userID", userID, { httpOnly: true });
  }

  return userID;
};
