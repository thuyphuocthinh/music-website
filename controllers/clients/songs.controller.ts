import { Request, Response } from "express";
import Songs from "../../models/songs.model";
import Topics from "../../models/topics.model";
import Singers from "../../models/singers.model";

export const list = async (req: Request, res: Response) => {
  try {
    const slug: string = req.params.slugTopic;
    const topic = await Topics.findOne({
      slug: slug,
      deleted: false,
      status: "active",
    });

    const songs = await Songs.find({
      topicId: topic.id,
      deleted: false,
      status: "active",
    }).select("avatar title singerId like slug");

    songs.forEach(async (item) => {});

    for (const song of songs) {
      const singer = await Singers.findOne({
        _id: song.singerId,
        deleted: false,
        status: "active",
      });
      song["infoSinger"] = singer;
    }

    res.render("clients/pages/songs/list", {
      pageTitle: "Danh sach bai hat",
      songs,
    });
  } catch (error) {
    console.log(error);
  }
};
