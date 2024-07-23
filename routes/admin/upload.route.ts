import { Router } from "express";
import * as controller from "../../controllers/admin/upload.controller";
import multer from "multer";
import * as uploadCloud from "../../middlewares/admin/upload.middleware";

const router: Router = Router();
const upload = multer();

router.post(
  "/",
  upload.single("file"),
  uploadCloud.uploadSingle,
  controller.index
);

export const uploadRoutes: Router = router;
