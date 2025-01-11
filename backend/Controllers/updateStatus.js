import { AdminModel } from "../Models/User.js";


export const updateStatus = async (req, res) => {
    try {
      const { status, admId } = req.body;
  
      if (!admId) {
        return res.status(400).json({ message: "Admin ID is required" });
      }
  
      if (!status || (status !== "ON" && status !== "OFF")) {
        return res.status(400).json({ message: "Invalid status value" });
      }
  
      // Find and update admin by admId
      const admin = await AdminModel.findOneAndUpdate(
        { admId },
        { admStatus: status },
        { new: true } // Return the updated document
      );
  
      if (!admin) {
        return res.status(404).json({
          message: `Admin with ID ${admId} not found. Please check the ID and try again.`,
        });
      }
  
      res.status(200).json({
        message: "Status updated successfully",
        status: admin.admStatus,
      });
    } catch (error) {
      console.error("Error updating status:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  