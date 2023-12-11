import mongoose from 'mongoose';
import LectureInteface from '../interface/lectures.interface';

const lectureSchema = new mongoose.Schema<LectureInteface>(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        lectureUrl: {
            type: String
        }
    }
    , {
        timestamps: true
    })

const Lecture = mongoose.model<LectureInteface>('Lecture', lectureSchema);

export default Lecture;