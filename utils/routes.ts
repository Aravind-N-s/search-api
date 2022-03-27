import { Router} from "express"
const router = Router();
import search from "../api/controller/index";

router.get("/api/search", search);

export default router;
