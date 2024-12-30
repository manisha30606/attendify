import mongoose from 'mongoose';
const { Schema } = mongoose;

// Employee Schema
const EmployeeSchema = new Schema({
    empName: { type: String, required: true, trim: true },
    empEmail: { 
        type: String, 
        required: [true, "Email is required"], 
        unique: true, 
        trim: true, 
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^\S+@\S+\.\S+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    empId: { type: String, required: true, trim: true },
    empPhone: { 
        type: String, 
        required: true, 
        trim: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    empPassword: { type: String, required: true },
    empPhoto: { type: String, required: true },
    // cameraStatus: { type: Boolean, default: false }
});

// Apply toJSON transformation to EmployeeSchema
EmployeeSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.empPassword;
        return ret;
    }
});

// Admin Schema
const AdminSchema = new Schema({
    admName: { type: String, required: true, trim: true },
    admDepartment: { type: String, required: true, trim: true },
    admId: { type: String, required: true, trim: true },
    admEmail: { 
        type: String, 
        required: [true, "Email is required"], 
        unique: true, 
        trim: true, 
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^\S+@\S+\.\S+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    admPassword: { type: String, required: true }
});

// Apply toJSON transformation to AdminSchema
AdminSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.admPassword;
        return ret;
    }
});

// Create Models
export const EmployeeModel = mongoose.model('Employee', EmployeeSchema);
export const AdminModel = mongoose.model('Admin', AdminSchema);
