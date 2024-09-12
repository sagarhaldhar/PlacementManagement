const app = require("./app");
const dotenv = require("dotenv");
const DBconnect = require("./utils/dbConnect");

// Load environment variables from a .env file
dotenv.config({ path: '../.env' });

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    DBconnect();
    console.log(`Server is running on port ${PORT}`);
});

// Error handling for unhandled promise rejections
process.on("unhandledRejection", (err) => { 
    console.error(`Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
});

// Error handling for uncaught exceptions
process.on("uncaughtException", (err) => {
    console.error(`Uncaught Exception: ${err.message}`);
    server.close(() => process.exit(1));
});

// Handle SIGTERM signal (usually sent by process managers)
process.on("SIGTERM", () => {
    console.log("SIGTERM received");
    server.close(() => console.log("HTTP Server closed gracefully"));
});

// Handle SIGINT signal (sent when you manually interrupt the process)
process.on("SIGINT", () => {
    console.log("SIGINT received");
    server.close(() => console.log("HTTP Server closed gracefully"));
});

