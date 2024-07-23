import express, { Express } from "express";
import * as dotenv from "dotenv";
import * as database from "./config/database";
import bodyParser from "body-parser";
import clientRoutes from "./routes/clients/index.route";
import adminRoutes from "./routes/admin/index.route";
import { systemConfig } from "./config/config";
import methodOverride from "method-override";
import path from "path";
const app: Express = express();

// dotenv
dotenv.config();

// database
database.connect();

// static file
app.use(express.static("public"));

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// method-override
app.use(methodOverride("_method"));

// pug
app.set("views", "./views");
app.set("view engine", "pug");

// tinymce
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

// app local
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// routes
clientRoutes(app);
adminRoutes(app);

const port: number | string = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
