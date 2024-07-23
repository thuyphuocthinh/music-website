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
exports.listen = exports.favourite = exports.like = exports.detail = exports.list = void 0;
const songs_model_1 = __importDefault(require("../../models/songs.model"));
const topics_model_1 = __importDefault(require("../../models/topics.model"));
const singers_model_1 = __importDefault(require("../../models/singers.model"));
const favourite_songs_model_1 = __importDefault(require("../../models/favourite-songs.model"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = req.params.slugTopic;
        const topic = yield topics_model_1.default.findOne({
            slug: slug,
            deleted: false,
            status: "active",
        });
        const songs = yield songs_model_1.default.find({
            topicId: topic.id,
            deleted: false,
            status: "active",
        }).select("avatar title singerId like slug");
        songs.forEach((item) => __awaiter(void 0, void 0, void 0, function* () { }));
        for (const song of songs) {
            const singer = yield singers_model_1.default.findOne({
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
    }
    catch (error) {
        console.log(error);
    }
});
exports.list = list;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = req.params.slugSong;
        const song = yield songs_model_1.default.findOne({
            slug: slug,
            deleted: false,
            status: "active",
        });
        const singer = yield singers_model_1.default.findOne({ _id: song.singerId }).select("fullName");
        const topic = yield topics_model_1.default.findOne({ _id: song.topicId }).select("title");
        const favouriteSong = yield favourite_songs_model_1.default.findOne({
            songId: song.id,
        });
        song["isFavourite"] = favouriteSong ? true : false;
        res.render("clients/pages/songs/detail", {
            pageTitle: "Chi tiet bai hat",
            song,
            singer,
            topic,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const typeLike = req.params.typeLike;
        const id = req.params.idSong;
        let song = yield songs_model_1.default.findOne({
            _id: id,
            status: "active",
            deleted: false,
        });
        const newLike = typeLike === "yes" ? song.like + 1 : song.like - 1;
        yield songs_model_1.default.updateOne({
            _id: id,
        }, {
            like: newLike,
        });
        res.json({
            status: 200,
            message: "Cập nhật thành công",
            data: newLike,
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            status: 400,
            message: "Cập nhật không thành công",
        });
    }
});
exports.like = like;
const favourite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const typeFavourite = req.params.typeFavourite;
        const id = req.params.idSong;
        const isFavourite = typeFavourite === "yes" ? true : false;
        switch (isFavourite) {
            case true:
                const exist = yield favourite_songs_model_1.default.findOne({
                    songId: id,
                    deleted: false,
                });
                if (!exist) {
                    const record = new favourite_songs_model_1.default({
                        userId: "",
                        songId: id,
                    });
                    yield record.save();
                }
                break;
            case false:
                yield favourite_songs_model_1.default.deleteOne({ songId: id });
                break;
            default:
                break;
        }
        res.json({
            status: 200,
            message: "Cập nhật thành công",
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            status: 400,
            message: "Cập nhật không thành công",
        });
    }
});
exports.favourite = favourite;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.idSong;
        const song = yield songs_model_1.default.findOne({
            _id: id,
            status: "active",
            deleted: false,
        });
        const newListen = song.listen + 1;
        yield songs_model_1.default.updateOne({
            _id: id,
        }, {
            listen: newListen,
        });
        res.json({
            status: 200,
            message: "Cập nhật thành công",
            data: newListen,
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            status: 400,
            message: "Cập nhật không thành công",
        });
    }
});
exports.listen = listen;
