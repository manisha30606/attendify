import {EmployeeModel , AdminModel} from '../Models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';


dotenv.config();


// Signup Controller
// export const empSignup = async (req, res) => {
//     try {
//         const { empName, empEmail, empPhone, empId, empPassword, empPhoto } = req.body;

//         // Validate input fields
//         if (!empName || !empEmail || !empPhone || !empId || !empPassword || !empPhoto) {
//             return res.status(400).json({ message: "All fields are required, including the photo", success: false });
//         }

//         // Check if user already exists
//         const user = await EmployeeModel.findOne({ empId });
//         if (user) {
//             return res.status(409).json({
//                 message: 'User already exists, please login.',
//                 success: false
//             });
//         }

//         // Hash password and create new user
//         const hashedPassword = await bcrypt.hash(empPassword, 10);
//         const newUser = new EmployeeModel({
//             empName,
//             empEmail,
//             empPhone,
//             empId,
//             empPassword: hashedPassword,
//             empPhoto // Save Base64 encoded photo
//         });

//         await newUser.save();

//         // Return success response
//         res.status(201).json({
//             message: 'Signup successful!',
//             success: true
//         });
//     } catch (err) {
//         console.error('Signup Error:', err);
//         res.status(500).json({
//             message: 'Internal server error',
//             success: false
//         });
//     }
// };

export const empSignup = async (req, res) => {
    try {
        const { empName, empEmail, empPhone, empId, empPassword, empPhoto ,empGender} = req.body;

        // Validate input
        if (!empName || !empEmail || !empPhone || !empId || !empPassword || !empPhoto || !empGender) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        // Check for existing user
        const user = await EmployeeModel.findOne({ empEmail });
        if (user) {
            return res.status(409).json({ message: "User already exists, please login.", success: false });
        }

        // Handle Base64 photo
        const buffer = Buffer.from(empPhoto.split(',')[1], 'base64');
        const photoPath = path.join(process.cwd(), 'uploads', `${Date.now()}_photo.png`);
        fs.writeFileSync(photoPath, buffer);

        // Hash password
        const hashedPassword = await bcrypt.hash(empPassword, 10);

        // Save to DB
        const newUser = new EmployeeModel({
            empName,
            empEmail,
            empPhone,
            empId,
            empPassword: hashedPassword,
            empPhoto: photoPath, 
            empGender,
        });

        await newUser.save();

        res.status(201).json({ message: "Signup successful!", success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", success: false });
    }


};


// Login Controller
export const empLogin = async (req, res) => {
    try {
        const { empId, empPassword } = req.body;
        const errorMsg = 'Auth failed: empId or password is incorrect';

        if (!empId || !empPassword) {
            return res.status(400).json({ message: "Both empId and password are required", success: false });
        }

        const user = await EmployeeModel.findOne({ empId });

        if (!user) {
            return res.status(401).json({ message: errorMsg, success: false });
        }

        const isPassEqual = await bcrypt.compare(empPassword, user.empPassword);

        if (!isPassEqual) {
            return res.status(401).json({ message: errorMsg, success: false });
        }

        const jwtToken = jwt.sign(
            { empId: user.empId, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            empName: user.empName,
            empId: user.empId
        });
    } catch (err) {
        console.error('Login Error: ', err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


export const adminSignup = async (req, res) => {
    try {
        const { admName, admEmail,admId, admPassword ,admGender} = req.body;
       

        // Additional input validation
        if (!admName || !admEmail || !admId || !admPassword || !admGender) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false,
            });
        }

        // Check if email or ID already exists
        const existingAdmin = await AdminModel.findOne({
            $or: [{ admId }, { admEmail }],
        });

        if (existingAdmin) {
            const conflictField = existingAdmin.admId === admId ? 'admId' : 'admEmail';
            return res.status(409).json({
                message: `Duplicate entry detected: ${conflictField} already exists.`,
                success: false,
            });
        }
        

        // Hash password and create admin
        const hashedPassword = await bcrypt.hash(admPassword, 10);
        const newAdmin = new AdminModel({
            admName,
            admEmail,
            admId,
            admPassword: hashedPassword,
            admGender,
        });

        await newAdmin.save();

        return res.status(201).json({
            message: 'Signup successful!',
            success: true,
        });
    } catch (err) {
        console.error('Signup Error:', err);

        // Handle MongoDB unique key error
        if (err.code === 11000) {
            const key = Object.keys(err.keyPattern)[0];
            return res.status(409).json({
                message: `Duplicate entry for ${key}.`,
                success: false,
            });
        }

        return res.status(500).json({
            message: 'Internal server error.',
            success: false,
        });
    }
};

export const adminLogin = async (req, res) => {
    const { admEmail, admPassword } = req.body;

    try {
        const admin = await AdminModel.findOne({ admEmail });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const isMatch = await bcrypt.compare(admPassword, admin.admPassword);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: admin._id, admEmail: admin.admEmail },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// // Example Protected Route Middleware
// export const verifyToken = (req, res, next) => {
//     const token = req.headers.authorization?.split(" ")[1]; // Bearer token
//     if (!token) {
//         return res.status(403).json({ message: "Access denied", success: false });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded; // Add decoded data to request
//         next(); // Proceed to next middleware or route handler
//     } catch (err) {
//         return res.status(401).json({ message: "Invalid or expired token", success: false });
//     }
// };