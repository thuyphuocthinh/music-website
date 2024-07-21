import Topics from "../../models/topics.model";
import { Request, Response } from "express";

export const index = async (req: Request, res: Response) => {
  try {
    const topics = await Topics.find({ deleted: false });
    res.render("clients/pages/topics/index", {
      pageTitle: "Chu de bai hat",
      topics,
    });
  } catch (error) {
    console.log(error);
  }
};
