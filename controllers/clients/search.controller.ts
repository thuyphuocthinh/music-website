import { Request, Response } from "express";
import Songs from "../../models/songs.model";
import Singers from "../../models/singers.model";
import { convertToSlug } from "../../helpers/convertToSlug.helper";

export const result = async (req: Request, res: Response) => {
  try {
    const keyword: string = req.query.keyword.toString();
    let newSongs = [];

    if (keyword) {
      const keywordRegex = new RegExp(keyword, "i");
      const stringSlug: string = convertToSlug(keyword);
      const stringSlugRegex = new RegExp(stringSlug, "i");

      const songs = await Songs.find({
        $or: [
          {
            title: keywordRegex,
          },
          {
            slug: stringSlugRegex,
          },
        ],
        deleted: false,
        status: "active",
      });

      for (const item of songs) {
        const infoSinger = await Singers.findOne({
          _id: item.singerId,
        });
        item["infoSinger"] = infoSinger;
      }

      newSongs = songs;
    }

    res.render("clients/pages/search/result", {
      pageTitle: `Kết quả: ${keyword}`,
      keyword,
      songs: newSongs,
    });
  } catch (error) {
    console.log(error);
  }
};
