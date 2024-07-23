import { Request, Response } from "express";
import Topics from "../../models/topics.model";

export const index = async (req: Request, res: Response) => {
  try {
    const topics = await Topics.find({
      deleted: false,
    });

    for (let i = 0; i < topics.length; i++) {
      const item = topics[i];
      item["index"] = i + 1;
    }

    res.render("admin/pages/topics/index", {
      pageTitle: "Quản lí chủ đề",
      topics,
    });
  } catch (error) {
    console.log(error);
  }
};
