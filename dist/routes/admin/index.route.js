"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_route_1 = require("./dashboard.route");
const config_1 = require("../../config/config");
const topic_route_1 = require("./topic.route");
const songs_route_1 = require("./songs.route");
const upload_route_1 = require("./upload.route");
const adminRoutes = (app) => {
    app.use(`${config_1.systemConfig.prefixAdmin}/dashboard`, dashboard_route_1.dashboardRoutes);
    app.use(`${config_1.systemConfig.prefixAdmin}/topics`, topic_route_1.topicsRoutes);
    app.use(`${config_1.systemConfig.prefixAdmin}/songs`, songs_route_1.songsRoutes);
    app.use(`${config_1.systemConfig.prefixAdmin}/upload`, upload_route_1.uploadRoutes);
};
exports.default = adminRoutes;
