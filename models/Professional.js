const mongoose = require("mongoose");
const ProfessionalSchema = new mongoose.Schema({
     name:{ 
        type: String, 
        required: true 
    },
    category: {
        type: String,
        required: true
    }
    },
    {
        timestamps: true
    
});

module.exports = mongoose.model("Professional", ProfessionalSchema);