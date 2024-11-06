import express from 'express';
import { loginValidation, signupValidation } from '../Middleware/AuthValidation.js';
import UserModel from '../Models/User.js';
import bcrypt from 'bcrypt';
import { login } from '../Controllers/AuthController.js';

const router = express.Router();

router.post('/login', loginValidation, login); // Login route
router.post('/signup', signupValidation, async (req, res) => {
    const { name, email, empId, phone, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            name,
            email,
            empId,
            phone,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

export default router;
