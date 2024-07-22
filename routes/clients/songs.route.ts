import { Router } from "express";
const router: Router = Router();
import * as controller from "../../controllers/clients/songs.controller";

router.get("/:slugTopic", controller.list);
router.get("/detail/:slugSong", controller.detail);
router.get("/like/:typeLike/:idSong", controller.like);

export const songsRoutes: Router = router;
