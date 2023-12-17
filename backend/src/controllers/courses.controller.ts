import { Request, Response } from "express"
import { ObjectId } from "mongoose";
import Course from "../models/courses.model";
import Section from "../models/section.modal";
import Lecture from "../models/lectures.model";
import cloudinary from "../config/cloudinary.config";
import fs from 'fs';
import User from "../models/users.model";
// import sendNotification from "../firebase/sendNotification";

export const createCourses = async (req: any, res: Response) => {
    const { title, description, price, duration, sections, categories, content } = req.body;

    const instructorId = req.user._id;
    try {
        const course = new Course({
            title,
            description,
            instructorId,
            price,
            duration,
            sections: [],
            categories,
            content
        })

        await course.save();

        if (sections.length > 0) {
            for (let sectionData of sections) {

                const section = new Section({
                    title: sectionData.title,
                    lectures: []
                })

                await section.save();

                for (let lectureData of sectionData.lectures) {
                    const lecture = new Lecture({
                        title: lectureData.title,
                        content: lectureData.content,
                        duration: lectureData.duration,
                    })

                    section.lectures.push(lecture._id);
                    await lecture.save();

                }
                let results = [];
                for (let file of req.files) {
                    let result;
                    if (file.mimetype === 'image/jpeg'
                        || file.mimetype === 'image/png'
                        || file.mimetype === 'image/jpg') {
                        result = await cloudinary.v2.uploader.upload(file.path);

                    } else {
                        result = await cloudinary.v2.uploader.upload(file.path, {
                            resource_type: 'video',
                            folder: 'videos'
                        });
                    }
                    results.push(result);
                }
                let resultIndex = 0;
                for (let lectureId of section.lectures) {
                    const lecture: any = await Lecture.findById(lectureId);
                    lecture.lectureUrl = results[resultIndex].secure_url;
                    await lecture.save();
                    resultIndex++;
                }

                await section.save();

                course.sections.push(section._id);
            }

            await course.save();

            for (let file of req.files) {
                if (fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path);
                }
            }
        }

        const users = await User.find({ roles: 'student' });
        users.forEach((user) => {
            if (user.fcm) {
                console.log(user)
                // sendNotification(user.fcm, `There is a new course available ${course.title}. Please check you app to add to cart.`)
            }
        })

        return res.status(201).json({
            status: true,
            message: 'Course created successfully',
            data: course
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'An error occured while creating this course',
            error
        })
    }
}

export const editCourses = async (req: any, res: Response) => {
    try {
        const data = req.body;
        const id = req.params.id;

        const course = await Course.findById(id);

        if (!course) {
            res.send('Not found course');
        } else {
            const updatedCourse = await Course.findOneAndUpdate({ _id: id }, {
                $set: data
            }, {
                new: true
            })

            res.status(200).json({
                status: true,
                message: 'Course updated successfully',
                data: updatedCourse
            })
        }
    } catch (error) {

    }
}

export const getCourses = async (req: any, res: Response) => {
    try {
        const courses = await Course.find({}).populate("instructorId");

        return res.status(200).json({
            status: true,
            message: 'Courses fetched',
            data: courses
        })
    } catch (error) {

    }
}


export const getCourseById = async (req: any, res: Response) => {
    try {
        const id = req.params.id;
        const course = await Course.findById(id);
        if (!course) {
            res.send('Not found course');
        } else {

            res.status(200).json({
                status: true,
                message: 'Course fetched successfully',
                data: course
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteCourse = async (req: any, res: Response) => {
    try {
        const id = req.params.id;
        //use cloudinary destroy method
        const course = await Course.findById(id);
        if (!course) {
            res.send('Not found course');
        } else {
            const sections = await Section.find({ _id: { $in: course.sections } })
            Promise.all(sections.map(async (section) => {
                await Lecture.deleteMany({ _id: { $in: section.lectures } })

            }))

            await Section.deleteMany({ _id: { $in: course.sections } });

            await Course.findOneAndDelete({ _id: id })

            res.status(200).json({
                status: true,
                message: 'Course deleted successfully'
            })
        }
    } catch (error) {
        console.log(error)
    }
}