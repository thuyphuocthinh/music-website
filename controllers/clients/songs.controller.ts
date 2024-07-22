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

export const detail = async (req: Request, res: Response) => {
  try {
    const slug: string = req.params.slugSong;
    const song = await Songs.findOne({
      slug: slug,
      deleted: false,
      status: "active",
    });
    const singer = await Singers.findOne({ _id: song.singerId }).select(
      "fullName"
    );
    const topic = await Topics.findOne({ _id: song.topicId }).select("title");
    res.render("clients/pages/songs/detail", {
      pageTitle: "Chi tiet bai hat",
      song,
      singer,
      topic,
    });
  } catch (error) {
    console.log(error);
  }
};

export const like = async (req: Request, res: Response) => {
  try {
    const typeLike: string = req.params.typeLike;
    const id: string = req.params.idSong;
    let song = await Songs.findOne({
      _id: id,
      status: "active",
      deleted: false,
    });

    const newLike: number = typeLike === "yes" ? song.like + 1 : song.like - 1;

    await Songs.updateOne(
      {
        _id: id,
      },
      {
        like: newLike,
      }
    );

    res.json({
      status: 200,
      message: "Cập nhật thành công",
      data: newLike,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 400,
      message: "Cập nhật không thành công",
    });
  }
};
