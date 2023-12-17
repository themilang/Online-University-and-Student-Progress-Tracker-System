import cloudinary from "../config/cloudinary.config";
import Lecture from "../models/lectures.model";

export const createLecture = async (req: any, res: any) => {
    try {
        const { title, content, duration } = req.body;
        let result;
        if (req.file.mimetype === 'image/jpeg'
            || req.file.mimetype === 'image/png'
            || req.file.mimetype === 'image/jpg') {
            result = await cloudinary.v2.uploader.upload(req.file.path);

        } else {
            result = await cloudinary.v2.uploader.upload(req.file.path, {
                resource_type: 'video',
                folder: 'videos'
            });
        }

        let lecture = { title, content, duration, lectureUrl: result.secure_url };

        const lec = new Lecture(lecture);

        await lec.save();

        return res.status(201).json({
            status: true,
            message: 'Lecture created successfully',
            data: lec
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'Error occured',
        })
    }
}

export const getLecture = async (req: any, res: any) => {
    try {
        const lectures = await Lecture.find({});

        res.status(200).json({
            status: true,
            message: 'Lecture fetched successfully',
            data: lectures
        })
    } catch (error) {

    }
}

export const getLectureById = async (req: any, res: any) => {
    try {
        const lecture = await Lecture.findById(req.params.id);

        return res.status(200).json({
            status: true,
            message: 'Lecture fetched successfully',
            data: lecture
        })
    } catch (error) {

    }
}

export const editLecture = async (req: any, res: any) => {
    try {
        const id = req.params.id;

        const { isVideoEdited, title, content, duration } = req.body;
        const lecture = await Lecture.findById(id);

        if (!lecture) {
            return res.status(404).json({
                status: false,
                message: 'Lecture not found'
            })
        }
        
        else {
            if (isVideoEdited) {
                let result;
                if (req.file) {
                    //cloudinary destroy method here
                    if (req.file.mimetype === 'image/jpeg'
                        || req.file.mimetype === 'image/png'
                        || req.file.mimetype === 'image/jpg') {
                        result = await cloudinary.v2.uploader.upload(req.file.path);

                    } else {
                        result = await cloudinary.v2.uploader.upload(req.file.path, {
                            resource_type: 'video',
                            folder: 'videos'
                        });
                    }
                    lecture.lectureUrl = result.secure_url;
                }
                lecture.title = title;
                lecture.content = content;
                lecture.duration = duration;

                const updatedLecture = await lecture.save();


                return res.status(200).json({
                    status: true,
                    message: 'Lecture edited successfully',
                    data: updatedLecture
                })

            } else {
                lecture.title = title;
                lecture.content = content;
                lecture.duration = duration;

                const updatedLecture = await lecture.save();


                return res.status(200).json({
                    status: true,
                    message: 'Lecture edited successfully',
                    data: updatedLecture
                })
            }
        }

    } catch (error) {
        console.log(error)
    }
}

export const deleteLecture = async (req: any, res: any) => {
    try {
        const id = req.params.id;

        const lecture = await Lecture.findById(id);

        if (!lecture) {
            return res.status(404).json({
                status: false,
                message: 'Lecture not found'
            })
        } else {
            const deletedLec = await Lecture.findOneAndDelete({
                _id: id
            })

            if (deletedLec) {
                return res.status(200).json({
                    status: true,
                    message: 'Lecture deleted successfully'
                })
            }
        }

    } catch (error) {
        console.log(error)
    }
}