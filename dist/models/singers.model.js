"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const singersSchema = new mongoose_1.default.Schema({
    fullName: String,
    avatar: String,
    status: String,
    slug: {
        type: String,
        slug: "fullName",
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
}, { timestamps: true });
const Singers = mongoose_1.default.model("Singers", singersSchema, "singers");
exports.default = Singers;
