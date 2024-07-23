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
exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const songs_model_1 = __importDefault(require("../../models/songs.model"));
const topics_model_1 = __importDefault(require("../../models/topics.model"));
const singers_model_1 = __importDefault(require("../../models/singers.model"));
const config_1 = require("../../config/config");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songs = yield songs_model_1.default.find({ deleted: false });
        for (let i = 0; i < songs.length; i++) {
            const item = songs[i];
            item["index"] = i + 1;
        }
        res.render("admin/pages/songs/index", {
            pageTitle: "Quản lí bài hát",
            songs,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topics = yield topics_model_1.default.find({
            deleted: false,
            status: "active",
        }).select("title");
        const singers = yield singers_model_1.default.find({
            deleted: false,
            status: "active",
        }).select("fullName");
        res.render("admin/pages/songs/create", {
            pageTitle: "Thêm mới bài hát",
            topics,
            singers,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const song = new songs_model_1.default(dataSong);
        yield song.save();
        res.redirect(`${config_1.systemConfig.prefixAdmin}/songs`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id.toString();
        const song = yield songs_model_1.default.findOne({ _id: id, deleted: false });
        const topics = yield topics_model_1.default.find({
            deleted: false,
            status: "active",
        }).select("title");
        const singers = yield singers_model_1.default.find({
            deleted: false,
            status: "active",
        }).select("fullName");
        res.render("admin/pages/songs/edit", {
            pageTitle: "Chỉnh sửa bài hát",
            song,
            topics,
            singers,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id.toString();
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
        yield songs_model_1.default.updateOne({
            _id: id,
        }, dataSong);
        res.redirect(`${config_1.systemConfig.prefixAdmin}/songs`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.editPatch = editPatch;
