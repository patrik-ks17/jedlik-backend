import { Schema, model } from "mongoose";
// https://mongoosejs.com/docs/typescript.html
// https://mongoosejs.com/docs/validation.html

// ref: "onside" -> 1 oldali modell neve, nem kell átírni!

const nsideSchema = new Schema(
    {
        _id: Number,
        kategoria: {
            ref: "oneside",
            type: Number,
            required: [true,"Hiányos adatok"]
        },
        leiras: {
            type: String,
        },
        hirdetesDatuma: {
            type: Date,
            default: new Date(),
        },
        tehermentes: {
            type: Boolean,
            required: [true,"Hiányos adatok"]
        },
        ar: {
            type: Number,
            required: [true,"Hiányos adatok"]
        },
        kepUrl: {
            type: String,
        },
    },
    { versionKey: false },
);

const nsideModel = model("nside", nsideSchema, "ingatlanok");

export default nsideModel;
