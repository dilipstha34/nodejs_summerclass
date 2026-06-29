const express = require("express");
const app = express();

app.use(express.json());

const professionals = require("./data/professionals");



// GET ALL PROFESSIONALS

app.get("/api/professionals", (req, res) => {

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

app.get("/api/professionals/:id", (req, res) => {

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

app.post("/api/professionals", (req, res) => {

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

app.put("/api/professionals/:id", (req, res) => {

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

app.delete("/api/professionals/:id", (req, res) => {

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


const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});