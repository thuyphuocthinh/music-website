import express from "express";
import { Express, Request, Response } from "express";
import * as dotenv from "dotenv";

// dotenv
dotenv.config();

const app: Express = express();

app.get("/topics", (req: Request, res: Response) => {
  res.send("Hi");
});

const port: number | string = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
