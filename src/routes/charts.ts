import { Router } from "express";
import {
  getTopLang,
  getStarsDistribution,
  getTrendingRepos,
} from "../controllers/chartsController";

const router = Router();

router.get("/languages", getTopLang);
router.get("/stars-distribution", getStarsDistribution);
router.get("/trending-repos", getTrendingRepos);

export default router;
