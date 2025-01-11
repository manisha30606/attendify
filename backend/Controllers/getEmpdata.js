
import { EmployeeModel } from '../Models/User.js';


const getEmpdata = async (req, res) => {
  try {
    const userId = req.user?._id; // Extract from token
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await EmployeeModel.findById(userId).select('-empPassword -empPhoto');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching employee data:", error);
    res.status(500).json({ message: "Server error" });
  }
};






export default getEmpdata;
