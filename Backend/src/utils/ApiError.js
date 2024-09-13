class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode; // HTTP status code
        this.message = message;       // Error message
        this.isOperational = true;    // Flag to distinguish operational errors
        Error.captureStackTrace(this, this.constructor); // Capture stack trace
    }
}

module.exports = ApiError;
