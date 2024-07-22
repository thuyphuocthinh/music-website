import { Express } from "express";
import { topicRoutes } from "./topics.route";
import { songsRoutes } from "./songs.route";
import { favouriteSongsRoutes } from "./favourite-songs.route";

const clientRoutes = (app: Express): void => {
  app.use("/topics", topicRoutes);
  app.use("/songs", songsRoutes);
  app.use("/favourite-songs", favouriteSongsRoutes);
};

export default clientRoutes;
