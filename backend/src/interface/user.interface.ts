import mongoose, { Document } from "mongoose";

interface UserInterface extends Document {
    fullName: string;
    email: string;
    password: string;
    roles: string;
    resetPasswordToken: string;
    jwt: string;
    fcm: string;
    resetPasswordExpire: Date;
    enrolledCourse: mongoose.Schema.Types.ObjectId[];
}

export default UserInterface;