import UserModel from '../Models/User.js'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 

const signup = async (req, res) => {
    try {
        const { name, email, phone, empId, password } = req.body;
        const user = await UserModel.findOne({ empId });

        if (user) {
            return res.status(409).json({
                message: 'User already exists, please login.',
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Using 10 rounds for bcrypt
        const newUser = new UserModel({
            name,
            email,
            phone,
            empId,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({
            message: "Signup successful",
            success: true
        });
    } catch (err) {
        console.error('Signup Error: ', err); // Log the error for debugging
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const login = async (req, res) => {
    try {
        const { empId, password } = req.body;
        const user = await UserModel.findOne({ empId });
        const errorMsg = 'Auth failed: empId or password is incorrect';

        if (!user) {
            return res.status(409).json({ message: errorMsg, success: false });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);

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
            name: user.name,
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
