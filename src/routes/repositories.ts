import { Router } from "express";
import {
  getRepositories,
  getRepositoryByID,
} from "../controllers/repositoriesController";

const router = Router();

router.get("/", getRepositories);
router.get("/:id", getRepositoryByID);

export default router;
