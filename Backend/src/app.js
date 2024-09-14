const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const studentRoute = require("./routes/student.route");

const app = express();

// Enable security-related HTTP headers
app.use(helmet());

// Enable CORS with specific options (customize as needed)
app.use(cors({
    origin: 'http://example.com', // Replace with your client-side URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Log HTTP requests
app.use(morgan('combined'));

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set trust proxy if your app is behind a proxy (e.g., Nginx, Heroku)
app.set('trust proxy', true);

// Middleware for cookies
app.use(cookieParser());

// Define routes
app.use("/v1/student", studentRoute);
module.exports = app;