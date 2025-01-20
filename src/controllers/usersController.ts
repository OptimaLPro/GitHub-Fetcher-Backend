import { Request, Response } from "express";
import { ensureUserID } from "../services/usersService";
import User from "../modules/userModule";

export const getFavorites = async (
  req: Request & { userID?: string },
  res: Response
) => {
  try {
    const userID = ensureUserID(req, res);
    req.userID = userID;
    let user = await User.findOne({ userId: userID });

    if (!user) {
      user = await User.create({ userId: userID, favorites: [] });
      res.status(200).send(user.favorites);
    } else {
      res.status(200).send(user.favorites);
    }
  } catch (error) {
    console.error("Error ensuring user ID:", error);
    res.status(500).send("Internal server error.");
  }
};

export const addFavorite = async (
  req: Request & { userID?: string },
  res: Response
) => {
  try {
    const userID = ensureUserID(req, res);
    req.userID = userID;
    let user = await User.findOne({ userId: userID });
    if (!user) {
      user = await User.create({ userId: userID, favorites: [req.body] });
      res.status(200).send(user.favorites);
    } else {
      user.favorites.push(req.body);
      await user.save();
      res.status(200).send(user.favorites);
    }
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).send("Internal server error.");
  }
};

export const removeFavorite = async (
  req: Request & { userID?: string },
  res: Response
) => {
  try {
    const userID = ensureUserID(req, res);
    req.userID = userID;
    const { id } = req.body;

    const user = await User.findOne({ userId: userID });
    if (!user) {
      res.status(404).send("User not found.");
    } else {
      user.favorites = user.favorites.filter(
        (favorite: any) => favorite.id !== id
      );
      await user.save();
      res.status(200).send(user.favorites);
    }
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).send("Internal server error.");
  }
};
