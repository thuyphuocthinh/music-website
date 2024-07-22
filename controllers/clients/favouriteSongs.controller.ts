import { Request, Response } from "express";
import FavouriteSongs from "../../models/favourite-songs.model";
import Songs from "../../models/songs.model";
import Singers from "../../models/singers.model";

export const index = async (req: Request, res: Response) => {
  try {
    const favouriteSongs = await FavouriteSongs.find({
      //   userId: "",
      deleted: false,
    });

    for (const item of favouriteSongs) {
      const song = await Songs.findOne({
        _id: item.songId,
        deleted: false,
        status: "active",
      });
      const singer = await Singers.findOne({ _id: song.singerId }).select(
        "fullName "
      );
      song["infoSinger"] = singer;
      item["infoSong"] = song;
    }

    res.render("clients/pages/favourite-songs/index", {
      pageTitle: "Bài hát yêu thích",
      favouriteSongs,
    });
  } catch (error) {
    console.log(error);
  }
};
