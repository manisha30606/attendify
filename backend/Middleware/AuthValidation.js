import Joi from 'joi';

// Signup Validation
const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().pattern(/^[0-9]+$/, 'numbers').length(10).required(),
        password: Joi.string().min(4).max(10).required(),
        empId: Joi.string().min(4).max(8).required(),
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

// Login Validation
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        empId: Joi.string().min(4).max(8).required(),
        password: Joi.string().min(4).max(10).required(),
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

// Exporting both validations
export { signupValidation, loginValidation };
