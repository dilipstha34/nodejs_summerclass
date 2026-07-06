// models/Professional.js

const mongoose = require("mongoose");

// Professional Schema

const professionalSchema = new mongoose.Schema(
    {

        // Define the fields for the Professional model

        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [3, "Name must be at least 3 characters"]
        },
        category: {
            type: String,
            required: true,
            enum: ["Developer", "Designer", "Manager"]
        }
    },
    
    // Add timestamps to the schema
    
    {
        timestamps: true
    }

);

// Export the model
module.exports = mongoose.model("Professional", professionalSchema);