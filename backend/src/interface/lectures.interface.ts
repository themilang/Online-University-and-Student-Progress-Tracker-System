import { Document } from "mongoose";

interface LectureInteface extends Document {
    title: string;
    content: string;
    duration: number;
    lectureUrl: string;
}

export default LectureInteface;