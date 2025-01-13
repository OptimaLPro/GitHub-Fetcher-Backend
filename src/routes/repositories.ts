import { Router } from "express";
import { getTopRepositories } from "../controllers/repositoriesController";

const router = Router();

router.get("/", getTopRepositories);

export default router;
