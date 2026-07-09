// professionalsRoutes.js
const express = require("express");

// Create a router instance

const router = express.Router();

// Import the Professional model

const Professional = require("../model/Professional");


// GET ALL PROFESSIONALS

router.get("/", async (req, res) => {
    try {
        const category = req.query.category;

        let professionals;

        if (category) {
            professionals = await Professional.find({
                category: category
            });
        } else {
            professionals = await Professional.find();
        }

        res.status(200).json(professionals);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});



// GET PROFESSIONAL BY ID

router.get("/:id", async (req, res) => {
    try {
        const professional = await Professional.findById(req.params.id);

        if (!professional) {
            return res.status(404).json({
                error: "Professional not found"
            });
        }

        res.status(200).json(professional);
    } catch (error) {
        res.status(400).json({
            error: "Invalid ID"
        });
    }
});



// Create a new professional 

router.post("/", async (req, res) => {
    try {
        const professional = new Professional(req.body);

        const savedProfessional = await professional.save();

        res.status(201).json(savedProfessional);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});



// Update a professional by ID

router.put("/:id", async (req, res) => {
    try {
        const updatedProfessional = await Professional.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        // Check if the professional was found and updated

        if (!updatedProfessional) {
            return res.status(404).json({
                error: "Professional not found"
            });
        }

        // Respond with the updated professional
        
        res.status(200).json(updatedProfessional);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});



// Delete a professional by ID

router.delete("/:id", async (req, res) => {
    try {
        const deletedProfessional = await Professional.findByIdAndDelete(
            req.params.id
        );

        // Check if the professional was found and deleted

        if (!deletedProfessional) {
            return res.status(404).json({
                error: "Professional not found"
            });
        }

        // Respond with a success message
        
        res.status(200).json({
            message: "Professional deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// Export the router

module.exports = router;