import { Router } from "express";
import * as controller from "../../controllers/admin/songs.controller";
import multer from "multer";
import * as uploadCloud from "../../middlewares/admin/upload.middleware";

const upload = multer();
const router: Router = Router();

router.get("/", controller.index);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  uploadCloud.uploadFields,
  controller.createPost
);
router.get("/edit/:id", controller.edit);
router.get(
  "/edit/:id",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  uploadCloud.uploadFields,
  controller.editPatch
);

export const songsRoutes: Router = router;
