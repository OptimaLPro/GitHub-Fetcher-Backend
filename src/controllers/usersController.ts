import { Request, Response } from "express";
import User from "../modules/userModule";

export const getFavorites = async (
  req: Request & { userID?: string },
  res: Response
) => {
  try {
    let user = await User.findOne({ userId: req.userID });

    if (!user) {
      user = await User.create({ userId: req.userID, favorites: [] });
    }
    res.status(200).send(user.favorites);
  } catch (error) {
    console.error("Error retrieving favorites:", error);
    res.status(500).send("Internal server error.");
  }
};

export const addFavorite = async (
  req: Request & { userID?: string },
  res: Response
) => {
  try {
    let user = await User.findOne({ userId: req.userID });
    if (!user) {
      user = await User.create({ userId: req.userID, favorites: [req.body] });
    } else {
      user.favorites.push(req.body);
      await user.save();
    }
    res.status(200).send(user.favorites);
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
    const { id } = req.body;
    const user = await User.findOne({ userId: req.userID });
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
