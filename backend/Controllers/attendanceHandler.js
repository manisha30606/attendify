import { EmployeeModel } from '../Models/User.js';
import { AdminModel } from '../Models/User.js';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import geolib from 'geolib';
import { fileURLToPath } from 'url';

// Define __dirname for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const attendanceHandler = async (req, res) => {
    try {
        const userId = req.user?._id; // Extract user ID from token
        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }

        // Fetch employee data
        const user = await EmployeeModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Validate admin status
        const admin = await AdminModel.findOne();
        if (!admin || admin.admStatus !== "ON") {
            return res.status(400).json({
                message: "Attendance system is currently inactive. Contact the administrator.",
            });
        }

        const backendImagePath = path.join(__dirname, "../uploads", path.basename(user.empPhoto));
        if (!fs.existsSync(backendImagePath)) {
            return res.status(400).json({ message: "Stored employee photo not found." });
        }

        const { frontendImage, latitude, longitude } = req.body;
        if (!frontendImage || !latitude || !longitude) {
            return res.status(400).json({ message: "Image and location data are required." });
        }

        try {
            // Validate and decode frontend base64 image
            const base64Image = frontendImage.split(";base64,").pop();
            const frontendBuffer = Buffer.from(base64Image, "base64");

            // Process backend image
            const backendBuffer = await sharp(backendImagePath)
                .resize(100, 100)
                .grayscale()
                .raw()
                .toBuffer();

            // Process frontend image
            const processedFrontendBuffer = await sharp(frontendBuffer)
                .resize(100, 100)
                .grayscale()
                .raw()
                .toBuffer();

            // Compare the processed buffers
            let diffSum = 0;
            for (let i = 0; i < backendBuffer.length; i++) {
                diffSum += Math.abs(backendBuffer[i] - processedFrontendBuffer[i]);
            }

            const meanDiff = diffSum / backendBuffer.length;
            const threshold = 60;

            if (meanDiff > threshold) {
                return res.status(400).json({ message: "Image verification failed. Photos do not match." });
            }
        } catch (error) {
            console.error("Error during image comparison:", error.message);
            return res.status(500).json({ message: "Invalid image format or processing error." });
        }

        // Validate location
        const officeLocation = { latitude: 25.5940947, longitude: 85.1375645 };
 // Example location
        const isWithinRange = geolib.isPointWithinRadius(
            { latitude, longitude },
            officeLocation,
            1000 // 1 km radius
        );

        if (!isWithinRange) {
            return res.status(400).json({ message: "Location is outside the permitted range." });
        }

        res.status(200).json({ message: "Attendance marked successfully." });
    } catch (error) {
        console.error("Error in attendance handler:", error.message);
        res.status(500).json({ message: "Server error." });
    }
};

export default attendanceHandler;
