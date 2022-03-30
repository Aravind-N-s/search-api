import { Router } from "express";
const router = Router();
import search from "../api/controller/index";
import { validateQuery } from "../api/middleware/index";

router.get("/api/search", validateQuery, search);

export default router;
