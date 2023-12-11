import mongoose, { Document } from "mongoose";

interface CourseInterface extends Document {
    title: string;
    description: string;
    instructorId: mongoose.Schema.Types.ObjectId;
    price: number;
    duration: number;
    enrolledStudents: mongoose.Schema.Types.ObjectId[];
    sections: mongoose.Schema.Types.ObjectId[];
    categories: string[];
    content: string[];
}

export default CourseInterface;