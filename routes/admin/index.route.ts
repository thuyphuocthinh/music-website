import { Express } from "express";
import { dashboardRoutes } from "./dashboard.route";
import { systemConfig } from "../../config/config";
import { topicsRoutes } from "./topic.route";
import { songsRoutes } from "./songs.route";
import { uploadRoutes } from "./upload.route";

const adminRoutes = (app: Express) => {
  app.use(`${systemConfig.prefixAdmin}/dashboard`, dashboardRoutes);
  app.use(`${systemConfig.prefixAdmin}/topics`, topicsRoutes);
  app.use(`${systemConfig.prefixAdmin}/songs`, songsRoutes);
  app.use(`${systemConfig.prefixAdmin}/upload`, uploadRoutes);
};

export default adminRoutes;
