import { Router } from "express";
const router: Router = Router();
import * as controller from "../../controllers/admin/topics.controller";

router.get("/", controller.index);

export const topicsRoutes: Router = router;
