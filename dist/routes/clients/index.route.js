"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topics_route_1 = require("./topics.route");
const songs_route_1 = require("./songs.route");
const favourite_songs_route_1 = require("./favourite-songs.route");
const search_route_1 = require("./search.route");
const clientRoutes = (app) => {
    app.use("/topics", topics_route_1.topicRoutes);
    app.use("/songs", songs_route_1.songsRoutes);
    app.use("/favourite-songs", favourite_songs_route_1.favouriteSongsRoutes);
    app.use("/search", search_route_1.searchRoutes);
};
exports.default = clientRoutes;
