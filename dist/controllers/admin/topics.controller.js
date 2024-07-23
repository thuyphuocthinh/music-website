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
const topics_model_1 = __importDefault(require("../../models/topics.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topics = yield topics_model_1.default.find({
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
    }
    catch (error) {
        console.log(error);
    }
});
exports.index = index;
