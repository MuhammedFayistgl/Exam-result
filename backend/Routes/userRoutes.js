import { Router } from "express";
import { StudentSchema } from "../schema/StudentSchema.js";

const Route = Router();

Route.post("/search", async (req, res) => {
    const { Madrasa, Class,
        //  Year
         } = req.body;

    const Result = await StudentSchema.find(
        { $and: [{ Madrasa: Madrasa }, { Class: Class }] },
        { _id: 0, Madrasa: 0, createdAt: 0, updatedAt: 0, __v: 0 ,isPass:0 }
    );
    return res.send(Result);
});
Route.get("/getMadrasa", async (req, res) => {
    const Data = await StudentSchema.aggregate([
        {
            $group: {
                _id: "$Madrasa",
            },
        },
    ]).then((data) => {
        return [...data.map((d) => d?._id)];
    });
    return res.send(Data);
});
Route.get("/getClass", async (req, res) => {
    const Data = await StudentSchema.aggregate([
        {
            $group: {
                _id: "$Class",
            },
        },
    ]).then((data) => {
        return [...data.map((d) => d?._id)];
    });
    return res.send(Data);
});

export default Route;
