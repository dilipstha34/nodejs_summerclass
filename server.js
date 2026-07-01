require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// MongoDB connection

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB", err);
});

// Routes

const professionalRoutes = require("./routes/professionalsRoutes");
app.use("/api/professionals", professionalRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});