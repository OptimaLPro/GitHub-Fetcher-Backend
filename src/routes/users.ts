import { Router } from "express";
import { getFavorites } from "../controllers/usersController";

const router = Router();

router.get("/favorites", getFavorites);

export default router;
