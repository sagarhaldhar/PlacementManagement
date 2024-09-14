const Joi = require('joi');
const httpStatus = require('http-status'); // You can use the 'http-status' package or define your own status codes
const ApiError = require('../utils/ApiError');

const pick = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object[key]) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
};

const validate = (schema) => (req, res, next) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));

    const { error, value } = Joi.object(validSchema)
        .prefs({ errors: { label: 'key' }, abortEarly: false })
        .validate(object);

    if (error) {
        return error.details.forEach((err) => {
            next(new ApiError(err.message, httpStatus.BAD_REQUEST));
        })
    }
    
    // Assign validated values to the request object
    Object.assign(req, value);
    return next();
};

module.exports = validate;
