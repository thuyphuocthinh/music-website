import { Express } from "express";
import { topicRoutes } from "./topics.route";
import { songsRoutes } from "./songs.route";

const clientRoutes = (app: Express): void => {
  app.use("/topics", topicRoutes);
  app.use("/songs", songsRoutes);
};

export default clientRoutes;
