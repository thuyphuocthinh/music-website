import { Router } from "express";
const router: Router = Router();
import * as controller from "../../controllers/clients/songs.controller";

router.get("/:slugTopic", controller.list);
router.get("/detail/:slugSong", controller.detail);
router.patch("/like/:typeLike/:idSong", controller.like);
router.patch("/favourite/:typeFavourite/:idSong", controller.favourite);
router.patch("/listen/:idSong", controller.listen);

export const songsRoutes: Router = router;
