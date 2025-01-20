import { Router } from "express";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../controllers/usersController";

const router = Router();

router.get("/favorites", getFavorites);
router.post("/favorites", addFavorite);
router.delete("/favorites", removeFavorite);

export default router;
