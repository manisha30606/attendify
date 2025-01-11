import express from 'express';
import bcrypt from 'bcrypt';
import ensureAuthenticated from '../Middleware/Auth.js';
import { loginValidation, signupValidation, adminLoginValidation, adminSignupValidation } from '../Middleware/AuthValidation.js';
import { EmployeeModel, AdminModel } from '../Models/User.js';
import { empLogin, empSignup, adminLogin, adminSignup } from '../Controllers/AuthController.js';
import getEmpdata from '../Controllers/getEmpdata.js';
import attendanceHandler from '../Controllers/attendanceHandler.js';
import { updateStatus } from '../Controllers/updateStatus.js';
const router = express.Router();

// Employee Routes
router.post('/login/employee', loginValidation, empLogin);
router.post('/signup/employee', signupValidation, empSignup);

// Admin Routes
router.post('/login/admin', adminLoginValidation, adminLogin);
router.post('/signup/admin', adminSignupValidation, adminSignup);

// Protected Routes
router.get('/empdata', ensureAuthenticated, getEmpdata);

//Make Attendance
router.post('/attendance', ensureAuthenticated, attendanceHandler);

router.post('/updateStatus',ensureAuthenticated,updateStatus);

export default router;
