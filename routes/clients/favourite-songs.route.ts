import { Router } from "express";
const router: Router = Router();
import * as controller from "../../controllers/clients/favouriteSongs.controller";

router.get("/", controller.index);

export const favouriteSongsRoutes: Router = router;
