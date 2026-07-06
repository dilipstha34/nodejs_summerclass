// Load environment variables from .env file

require("dotenv").config();

// Import the required modules

const express = require("express");
const mongoose = require("mongoose");

// Create an Express application

const app = express();

// Middleware to parse JSON request bodies

app.use(express.json());


// MongoDB Connection with mongoose

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    // Handle connection errors
    .catch((err) => {
        console.error("MongoDB Connection Error:", err);
    });


// Import the professionals routes

const professionalRoutes = require("./routes/professionalsRoutes");


// Use the professionals routes

app.use("/api/professionals", professionalRoutes);


// Start the server

const PORT = process.env.PORT || 3000;


// Start the server and listen on the specified port

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});