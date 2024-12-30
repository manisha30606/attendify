import express from 'express';
// Correct way to export if using default


import { loginValidation, signupValidation ,adminLoginValidation ,adminSignupValidation} from '../Middleware/AuthValidation.js';
import {EmployeeModel,AdminModel} from '../Models/User.js';
import bcrypt from 'bcrypt';
import { empLogin, empSignup, adminLogin , adminSignup } from '../Controllers/AuthController.js';

const router = express.Router();

router.post('/login/employee', loginValidation, empLogin);
router.post('/login/admin', adminLoginValidation, adminLogin);
router.post('/signup/employee', signupValidation, empSignup);
router.post('/signup/admin', adminSignupValidation, adminSignup);


export default router;