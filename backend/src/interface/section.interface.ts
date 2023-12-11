import mongoose, { Document } from "mongoose";

interface SectionInterface extends Document {
    title: string;
    lectures: mongoose.Schema.Types.ObjectId[];
}

export default SectionInterface;