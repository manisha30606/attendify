import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    empId: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    password: {
        type: String,
        required: true,
    }
});

// Exclude the password when converting to JSON
UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password; 
        return ret;
    }
});

// Create User Model
const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
