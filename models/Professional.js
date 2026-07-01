const mongoose = require("mongoose");

const professionalSchema = new mongoose.Schema(
    {
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
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Professional", professionalSchema);