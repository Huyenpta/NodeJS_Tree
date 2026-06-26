require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Tree = require('./models/Tree');

const renderIndex = require('./views/index');
const renderAbout = require('./views/about');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const connectDB = require('./config/db.js');

connectDB();

app.get('/', async (req, res) => {
    try {
        const trees = await Tree.find({});
        const html = renderIndex(trees, null);
        res.send(html);
    } catch (err) {
        console.log("❌ ERROR ON HOME PAGE:", err);
        res.status(500).send("Detailed error: " + err.message);
    }
});

app.get('/about', (req, res) => {
    const html = renderAbout();
    res.send(html);
});

app.post('/add', async (req, res) => {
    const { treename, description, image } = req.body;

    const newTree = new Tree({
        treename,
        description,
        image: image || undefined
    });

    try {
        await newTree.save();
        res.redirect('/');
    } catch (err) {
        const trees = await Tree.find({});
        const errorMessages = [];

        if (err.errors) {
            Object.keys(err.errors).forEach(key => {
                errorMessages.push(err.errors[key].message);
            });
        } else {
            errorMessages.push("The system encountered an error while adding the data.");
        }

        const html = renderIndex(trees, errorMessages);
        res.send(html);
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running at: http://localhost:${PORT}`);
});