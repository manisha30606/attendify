import Joi from 'joi';

// Signup Validation
// const signupValidation = (req, res, next) => {
//     const schema = Joi.object({
//         empName: Joi.string().min(3).max(100).required(),
//         empEmail: Joi.string().email().required(),
//         empPhone: Joi.string().pattern(/^[0-9]+$/, 'numbers').length(10).required(),
//         empPassword: Joi.string().min(4).max(10).required(),
//         empId: Joi.string().min(4).max(8).required(),
//     });

//     const { error } = schema.validate(req.body);
//     if (error) {
//         return res.status(400).json({
//             message: "Bad request",
//             error: error.details[0].message 
//         });
//     }
//     next();
// };

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        empName: Joi.string()
            .min(3)
            .max(100)
            .required()
            .messages({
                "string.empty": "Employee name is required.",
                "string.min": "Employee name must be at least 3 characters long.",
                "string.max": "Employee name must not exceed 100 characters."
            }),
            empGender: Joi.string()
            .min(4)
            .max(10)
            .required()
            .messages({
                "string.empty": "Employee gender is required.",
                "string.min": "Employee gender must be at least 3 characters long.",
                "string.max": "Employee gender must not exceed 100 characters."
            }),
        empEmail: Joi.string()
            .email()
            .required()
            .messages({
                "string.empty": "Email is required.",
                "string.email": "Please provide a valid email address."
            }),
        empPhone: Joi.string()
            .pattern(/^[0-9]{10}$/, 'numbers')
            .required()
            .messages({
                "string.empty": "Phone number is required.",
                "string.pattern.base": "Phone number must be a valid 10-digit number."
            }),
        empPassword: Joi.string()
            .min(6)
            .max(15)
            .required()
            .messages({
                "string.empty": "Password is required.",
                "string.min": "Password must be at least 6 characters long.",
                "string.max": "Password must not exceed 15 characters."
            }),
        empId: Joi.string()
            .min(4)
            .max(8)
            .required()
            .messages({
                "string.empty": "Employee ID is required.",
                "string.min": "Employee ID must be at least 4 characters long.",
                "string.max": "Employee ID must not exceed 8 characters."
            }),
        empPhoto: Joi.string()
            .required()
            .messages({
                "string.empty": "Photo is required."
            }),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            message: "Validation failed.",
            errors: error.details.map(err => err.message) // Return an array of validation errors
        });
    }
    next();
};


// Login Validation
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        empName: Joi.string().min(3).max(100).required(),
        empId: Joi.string().min(4).max(8).required(),
        empPassword: Joi.string().min(4).max(10).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Bad request",
            error: error.details[0].message  
        });
    }
    next();
};

// Admin Signup Validation
const adminSignupValidation = (req, res, next) => {
    const schema = Joi.object({
        admName: Joi.string().min(3).max(100).required(),
        admGender: Joi.string().min(4).max(10).required(),
        admId: Joi.string().min(3).max(50).required(), // Validating the admId field
        admEmail: Joi.string().email().required(),
        admPassword: Joi.string().min(6).max(12).required(),
        cameraStatus: Joi.boolean().default(false), // Corrected validation for boolean type
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Bad request",
            error: error.details[0].message,
        });
    }
    next();
};

// Admin Login Validation
 const adminLoginValidation = (req, res, next) => {
    const schema = Joi.object({
        admEmail: Joi.string().email().required(),
        admPassword: Joi.string().min(6).max(12).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Bad request",
            error: error.details[0].message,
        });
    }
    next();
};

// Exporting both validations
export { signupValidation, loginValidation, adminLoginValidation ,adminSignupValidation};