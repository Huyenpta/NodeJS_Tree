require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const Tree = require('./models/Tree');
const connectDB = require('./config/db.js');

const renderIndex = require('./views/index');
const renderAbout = require('./views/about');

const app = express();

const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

connectDB();

app.get('/', async (req, res) => {
    try {
        const trees = await Tree.find({});
        res.send(renderIndex(trees, null, null));
    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});

app.get('/about', (req, res) => res.send(renderAbout()));

app.post('/add', upload.single('image'), async (req, res) => {
    const { treename, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
    const newTree = new Tree({ treename, description, image: imageUrl });

    try {
        await newTree.save();
        res.redirect('/');
    } catch (err) {
        const trees = await Tree.find({});
        const errorMessages = err.errors
            ? Object.values(err.errors).map(e => e.message)
            : ["Error adding data"];
        res.send(renderIndex(trees, null, errorMessages));
    }
});

app.get('/delete/:id', async (req, res) => {
    try {
        await Tree.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Error deleting: " + err.message);
    }
});

app.get('/edit/:id', async (req, res) => {
    try {
        const trees = await Tree.find({});
        const editingTree = await Tree.findById(req.params.id);

        if (!editingTree) return res.redirect('/');

        res.send(renderIndex(trees, editingTree, null));
    } catch (err) {
        res.status(500).send("Error loading data: " + err.message);
    }
});

app.post('/edit/:id', upload.single('image'), async (req, res) => {
    try {
        const { treename, description } = req.body;
        const updateData = { treename, description };

        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }

        await Tree.findByIdAndUpdate(req.params.id, updateData, {
            runValidators: true
        });

        res.redirect('/');
    } catch (err) {
        const trees = await Tree.find({});
        const editingTree = await Tree.findById(req.params.id);

        const errorMessages = err.errors
            ? Object.values(err.errors).map(e => e.message)
            : ["Error updating data"];

        res.send(renderIndex(trees, editingTree, errorMessages));
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running at: http://localhost:${PORT}`);
});