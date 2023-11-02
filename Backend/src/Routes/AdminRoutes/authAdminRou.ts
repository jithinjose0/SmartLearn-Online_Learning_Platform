
import express from 'express';
import { body } from 'express-validator';
import AdminController from '../../Controllers/AdminControllers/authAdminCon';
import authMiddleware from '../../Middleware/authMiddleware';
import CourseController from '../../Controllers/AdminControllers/courseCon';
import { upload } from '../../Multer/multer';
import { Request, Response } from 'express';
import Course from "../../Models/AdminModels/CourseModel";
const routerAdmin = express.Router();

routerAdmin.post(
  '/signup',
  [
    body('username', 'Username is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  AdminController.registerAdmin
);
routerAdmin.get('/',authMiddleware,AdminController.getAllAdmins);


routerAdmin.post(
    '/login',
    [
      body('username', 'Username is required').notEmpty(),
      body('password', 'Password is required').notEmpty(),
    ],
    AdminController.loginAdmin
  );

//--------------------------------Courses router----------------------------------------------------------------
routerAdmin.post('/courses', upload.single('image'), CourseController.createCourse);
// Get all courses
routerAdmin.get('/courses', CourseController.getAllCourses);

// Get a specific course by ID
routerAdmin.get('/courses/:id', CourseController.getCourseById);

// Update a course by ID
routerAdmin.put('/courses/:id', upload.single('image'),CourseController.updateCourse);

// Delete a course by ID
routerAdmin.delete('/courses/:id', CourseController.deleteCourse);

routerAdmin.get('/courses_by_admin/:adminId', CourseController.getCoursesByAdminID);

routerAdmin.get('/courses/search/:query', CourseController.searchCourses);
//--------------------------------end courses------------------------------------------------------------------------------
export default routerAdmin;
