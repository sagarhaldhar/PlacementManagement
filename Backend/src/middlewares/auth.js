const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.cookies.studentInfo; // Get token from cookie

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.studId = decoded; // Attach user info to request object
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = auth;
