import { Request, Response } from "express";
import Songs from "../../models/songs.model";
import Topics from "../../models/topics.model";
import Singers from "../../models/singers.model";
import { systemConfig } from "../../config/config";

export const index = async (req: Request, res: Response) => {
  try {
    const songs = await Songs.find({ deleted: false });

    for (let i = 0; i < songs.length; i++) {
      const item = songs[i];
      item["index"] = i + 1;
    }

    res.render("admin/pages/songs/index", {
      pageTitle: "Quản lí bài hát",
      songs,
    });
  } catch (error) {
    console.log(error);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const topics = await Topics.find({
      deleted: false,
      status: "active",
    }).select("title");

    const singers = await Singers.find({
      deleted: false,
      status: "active",
    }).select("fullName");

    res.render("admin/pages/songs/create", {
      pageTitle: "Thêm mới bài hát",
      topics,
      singers,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    let avatar = "";
    let audio = "";

    if (req.body.avatar[0]) {
      avatar = req.body.avatar[0];
    }

    if (req.body.audio[0]) {
      audio = req.body.audio[0];
    }

    const dataSong = {
      title: req.body.title,
      topicId: req.body.topicId,
      singerId: req.body.singerId,
      description: req.body.description,
      status: req.body.status,
      avatar: avatar,
      audio: audio,
      lyrics: req.body.lyrics,
    };

    const song = new Songs(dataSong);
    await song.save();
    res.redirect(`${systemConfig.prefixAdmin}/songs`);
  } catch (error) {
    console.log(error);
  }
};

export const edit = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id.toString();
    const song = await Songs.findOne({ _id: id, deleted: false });

    const topics = await Topics.find({
      deleted: false,
      status: "active",
    }).select("title");

    const singers = await Singers.find({
      deleted: false,
      status: "active",
    }).select("fullName");

    res.render("admin/pages/songs/edit", {
      pageTitle: "Chỉnh sửa bài hát",
      song,
      topics,
      singers,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editPatch = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id.toString();

    const dataSong = {
      title: req.body.title,
      topicId: req.body.topicId,
      singerId: req.body.singerId,
      description: req.body.description,
      status: req.body.status,
      lyrics: req.body.lyrics,
    };

    if (req.body.avatar[0]) {
      dataSong["avatar"] = req.body.avatar[0];
    }

    if (req.body.audio[0]) {
      dataSong["audio"] = req.body.audio[0];
    }

    await Songs.updateOne(
      {
        _id: id,
      },
      dataSong
    );

    res.redirect(`${systemConfig.prefixAdmin}/songs`);
  } catch (error) {
    console.log(error);
  }
};
