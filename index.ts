import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import * as database from "./config/database";
import clientRoutes from "./routes/clients/index.route";
const app: Express = express();

// dotenv
dotenv.config();

// database
database.connect();

// static file
app.use(express.static("public"));

// pug
app.set("views", "./views");
app.set("view engine", "pug");

// routes
clientRoutes(app);

const port: number | string = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
