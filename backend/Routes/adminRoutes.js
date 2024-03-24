import { Router } from "express";
import { StudentSchema } from "../schema/StudentSchema.js";
import { userExist } from "../util/AdminHandler.js";

const AdminRoute = Router();

AdminRoute.post("/create-user", async (req, res) => {
    const { id, Name, Class, Madrasa } = req.body;

    const Data = { Name: Name, Class: Class, Madrasa: Madrasa };

    console.log(req.body);

    const studentExist = await StudentSchema.findOne({ _id: id });

    if (studentExist) {
        return res.send("Student already added");
    } else {
        const newStudent = await new StudentSchema(Data).save();
        return res.send({ message: "Student added Successfully", newStudent });
    }
});
AdminRoute.post("/get-all-students", async (req, res) => {
    const allStudents = await StudentSchema.find();
    return res.send(allStudents);
});

AdminRoute.post("/delete-user", async (req, res) => {
    const { _id } = req.body;
    const StudentExist = userExist(_id);
    if (StudentExist) {
        const deleted = await StudentSchema.deleteOne({ _id: _id });
        if (deleted) {
            return res.send("Student deleted successfully");
        }
    }
    return res.send("Student not fond");
});

AdminRoute.post("/edit-user", async (req, res) => {
    const { _id, Name, Class, isPass, Madrasa } = req.body;
    // console.log(req.body);
    let Student = await StudentSchema.findOne({ _id: _id });
    if (Student) {
        Student?.Name !== Name && (Student.Name = Name);
        Student?.Class !== Class && (Student.Class = Class);
        Student?.isPass !== isPass && (Student.isPass = isPass);
        Student?.Madrasa !== Madrasa && (Student.Madrasa = Madrasa);

        Student = await Student.save();
        return res.send({ message: "Student updated successfully", Student });
    }

});

export default AdminRoute;
