const express = require("express");

const router = express.Router();
const professionals = require("../models/Professional");

// GET ALL PROFESSIONALS

router.get("/", (req, res) => {

    const category = req.query.category;

    if (category) {

        const filtered = professionals.filter(
            p => p.category === category
        );

        return res.status(200).json(filtered);
    }

    res.status(200).json(professionals);
});


// GET PROFESSIONAL BY ID

router.get("/:id", (req, res) => {

    const targetId = parseInt(req.params.id);

    const result = professionals.find(
        p => p.id === targetId
    );

    if (!result) {
        return res.status(404).json({
            error: "Professional not found"
        });
    }

    res.status(200).json(result);
});


// CREATE PROFESSIONAL

router.post("/", (req, res) => {

    const { name, category } = req.body;

    if (!name || !category) {
        return res.status(400).json({
            error: "Missing required fields"
        });
    }

    const generatedProfile = {
        id: professionals.length + 1,
        name,
        category
    };

    professionals.push(generatedProfile);

    res.status(201).json(generatedProfile);
});

// UPDATE PROFESSIONAL

router.put("/:id", (req, res) => {

    const targetId = parseInt(req.params.id);

    const { name, category } = req.body;

    const professional = professionals.find(
        p => p.id === targetId
    );

    if (!professional) {
        return res.status(404).json({
            error: "Professional not found"
        });
    }

    if (name) {
        professional.name = name;
    }

    if (category) {
        professional.category = category;
    }

    res.status(200).json(professional);
});

// DELETE PROFESSIONAL

router.delete("/:id", (req, res) => {

    const targetId = parseInt(req.params.id);

    const index = professionals.findIndex(
        p => p.id === targetId
    );

    if (index === -1) {
        return res.status(404).json({
            error: "Professional not found"
        });
    }

    professionals.splice(index, 1);

    res.status(200).json({
        message: "Professional deleted successfully"
    });
});

module.exports = router;
