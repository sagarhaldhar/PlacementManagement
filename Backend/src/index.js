const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: '../.env' });
const DBconnect = require("./utils/dbConnect");

const PORT = process.env.PORT || 8100;
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
process.on('SIGINT', () => {
    console.log('Shutting down gracefully...');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });

