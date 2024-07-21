import { Router } from "express";
const router: Router = Router();
import * as controller from "../../controllers/clients/songs.controller";

router.get("/:slugTopic", controller.list);

export const songsRoutes: Router = router;
