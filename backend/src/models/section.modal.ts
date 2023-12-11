import mongoose from 'mongoose';
import SectionInterface from '../interface/section.interface';

const sectionSchema = new mongoose.Schema<SectionInterface>(
    {
        title: String,
        lectures: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Lecture'
            }
        ]
    }
    , {
        timestamps: true
    })

const Section = mongoose.model<SectionInterface>('Section', sectionSchema);

export default Section;