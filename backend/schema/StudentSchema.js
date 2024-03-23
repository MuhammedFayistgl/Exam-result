import { model, Schema } from "mongoose";

const Student = new Schema(
    {
        Name: { type: String },
        Class: { type: Number },
        isPass: { type: Boolean, default: true },
        Madrasa: { type: String },
        SecretKey: { type: Number },
    },
    {
        timestamps: true,
    }
);

export const StudentSchema = model("students", Student);
