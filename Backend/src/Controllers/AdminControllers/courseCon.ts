import Course from "../../Models/AdminModels/CourseModel";
import { Request, Response } from 'express';
import fs from 'fs';
// import { v2 as cloudinary } from 'cloudinary';
const cloudinary = require('cloudinary').v2;
// Create a new course
class CourseController {
    // static async createCourse(req: Request, res: Response) {
    //     try {
    //         const { Admin_id, title, description, image } = req.body;
    //         const file = req.files as Express.Multer.File[];
    //         const image = req.file.filename;
    //         const course = new Course({
    //             Admin_id,
    //             title,
    //             description,
    //             image,
    //         });
    //         const savedCourse = await course.save();
    //         res.status(201).json(savedCourse);
    //     } catch (error) {
    //         res.status(500).json({ error: 'Could not create the course.' });
    //     }
    // };

    static async createCourse(req: Request, res: Response) {
        try {
            const { Admin_id, title, description } = req.body;

            // Check if req.file is defined
            if (req.file) {
                const image = req.file.filename; // Get the uploaded image filename

                const course = new Course({
                    Admin_id,
                    title,
                    description,
                    image,
                });

                const savedCourse = await course.save();
                res.status(201).json(savedCourse);
            } else {
                res.status(400).json({ error: 'No file uploaded.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Could not create the course.' });
        }
    }



    // Get all courses
    static async getAllCourses(req: Request, res: Response) {
        try {
            const courses = await Course.find().populate('Admin_id'); // Use populate to include Admin details
            res.json(courses);
        } catch (error) {
            res.status(500).json({ error: 'Could not fetch courses.' });
        }
    };

    // Get a specific course by ID
    static async getCourseById(req: Request, res: Response) {
        try {
            const courseId = req.params.id;
            const course = await Course.findById(courseId).populate('Admin_id'); // Use populate to include Admin details
            if (!course) {
                return res.status(404).json({ error: 'Course not found.' });
            }
            res.json(course);
        } catch (error) {
            res.status(500).json({ error: 'Could not fetch the course.' });
        }
    };

    // Update a course by ID

    // static async updateCourse(req: Request, res: Response) {
    //     try {
    //         const courseId = req.params.id;
    //         const { image, title, description } = req.body; // Extract image, title, and description from the request body

    //         if (req.file) {
    //             const newImage = req.file.filename; // Get the uploaded image filename

    //             // Create an object with the updated values including the new image
    //             const updatedCourse = {
    //                 image: newImage,
    //                 title,
    //                 description,
    //             };

    //             const course = await Course.findByIdAndUpdate(courseId, updatedCourse, { new: true });

    //             if (!course) {
    //                 return res.status(404).json({ error: 'Course not found.' });
    //             }

    //             res.json(course);
    //         } else {
    //             // If no file is uploaded, just update title and description
    //             const updatedCourse = {
    //                 title,
    //                 description,
    //             };

    //             const course = await Course.findByIdAndUpdate(courseId, updatedCourse, { new: true });

    //             if (!course) {
    //                 return res.status(404).json({ error: 'Course not found.' });
    //             }

    //             res.json(course);
    //         }
    //     } catch (error) {
    //         res.status(500).json({ error: 'Could not update the course.' });
    //     }
    // };

    // static async updateCourse(req: Request, res: Response) {
    //     try {
    //         const courseId = req.params.id;
    //         const updatedCourse = req.body;
    //         const course = await Course.findByIdAndUpdate(courseId, updatedCourse, { new: true });
    //         if (!course) {
    //             return res.status(404).json({ error: 'Course not found.' });
    //         }
    //         res.json(course);
    //     } catch (error) {
    //         res.status(500).json({ error: 'Could not update the course.' });
    //     }
    // };


    //update course
    static async updateCourse(req: Request, res: Response) {
        try {
            let imagePath = '';
            if (req.file !== undefined) {
                const result = await cloudinary.uploader.upload(req.file.path);
                fs.unlinkSync(req.file.path);
                imagePath = result.secure_url;
            }
            const courseId = req.params.id;
            const updatedCourse = req.body;
            updatedCourse['image'] = imagePath;
            console.log('updatedCourse', updatedCourse);
            const course = await Course.findByIdAndUpdate(courseId, updatedCourse, { new: true });
            if (!course) {
                return res.status(404).json({ error: 'Course not found' })
            }
            res.json(course);
        } catch (error) {
            res.status(500).json({ error: "Couldn't update the course" })
        }
    }

    // Delete a course by ID
    static async deleteCourse(req: Request, res: Response) {
        try {
            const courseId = req.params.id;
            const deletedCourse = await Course.findByIdAndRemove(courseId);
            if (!deletedCourse) {
                return res.status(404).json({ error: 'Course not found.' });
            }
            res.json(deletedCourse);
        } catch (error) {
            res.status(500).json({ error: 'Could not delete the course.' });
        }
    };

    // static async getAdminCoursesById(req: Request, res: Response) {
    //     try {
    //         const adminId = req.params.adminId;
    //         const courses = await Course.find({ 'Admin_id._id': adminId });
    //         res.json(courses);
    //     } catch (error) {
    //         res.status(500).json({ error: 'Internal server error' });
    //     }
    // };
    // get courses by particular admin id
    static async getCoursesByAdminID(req: Request, res: Response) {
        try {
            const adminId = req.params.adminId; // Change this line
            const courses = await Course.find({ Admin_id: adminId });
            res.json(courses);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Search for courses based on a search query
    // static async searchCourses(req: Request, res: Response) {
    //     try {
    //         let query = {};
    //         if (req.query.searchQuery) {
    //             query['name'] = { $regex: req.query.searchQuery, $options: 'i' };
    //         } else {
    //             query["isActive"] = true;
    //         }
    //         const courses = await Course.find(query);
    //         res.json(courses);
    //     } catch (error) {
    //         console.log('Error in searching', error);
    //         res.status(500).send();
    //     }
    // }
    static async searchCourses(req: Request, res: Response) {
        try {
            const query = req.params.query;
            
            // Use a regular expression to perform a case-insensitive search
            const regex = new RegExp(query, 'i');
            
            const courses = await Course.find({
                $or: [
                    { title: { $regex: regex } },
                    { description: { $regex: regex } },
                ],
            }).populate('Admin_id');
            
            res.json(courses);
        } catch (error) {
            res.status(500).json({ error: 'Could not perform the search.' });
        }
    }
    



}
export default CourseController;
