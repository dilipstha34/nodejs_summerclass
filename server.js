const express = require("express");
const app = express();
const PORT = 3000;



const professionals = require("./data/professionals");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/professionalsDB").then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB", err);
});

app.use(express.json());

const professionalRoutes = require("./routes/professionalsRoutes");
app.use("/api/professionals", professionalRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});