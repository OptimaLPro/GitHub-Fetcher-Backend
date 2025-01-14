import { Router } from "express";
import { getTopLang } from "../controllers/chartsController";

const router = Router();

router.get("/languages", getTopLang);

export default router;
