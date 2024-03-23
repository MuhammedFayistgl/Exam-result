import { StudentSchema } from "../schema/StudentSchema.js";

export const userExist = async (id) => {
    const studentExist = await StudentSchema.findOne({ _id: id });
    if (studentExist) {
        return studentExist;
    } else {
        return false;
    }
};
