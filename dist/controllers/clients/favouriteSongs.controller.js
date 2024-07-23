"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const favourite_songs_model_1 = __importDefault(require("../../models/favourite-songs.model"));
const songs_model_1 = __importDefault(require("../../models/songs.model"));
const singers_model_1 = __importDefault(require("../../models/singers.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const favouriteSongs = yield favourite_songs_model_1.default.find({
            deleted: false,
        });
        for (const item of favouriteSongs) {
            const song = yield songs_model_1.default.findOne({
                _id: item.songId,
                deleted: false,
                status: "active",
            });
            const singer = yield singers_model_1.default.findOne({ _id: song.singerId }).select("fullName ");
            song["infoSinger"] = singer;
            item["infoSong"] = song;
        }
        res.render("clients/pages/favourite-songs/index", {
            pageTitle: "Bài hát yêu thích",
            favouriteSongs,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.index = index;
