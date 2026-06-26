require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Tree = require('./models/Tree');

// Import trực tiếp các hàm render từ file .js của bạn
const renderIndex = require('./views/index');
const renderAbout = require('./views/about');

const app = express();

// Middleware xử lý dữ liệu từ form và các tệp tĩnh
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Kết nối cơ sở dữ liệu MongoDB
const connectDB = require('./config/db.js');

// Gọi hàm kết nối database
connectDB();

// --- ROUTERS ---

// 1. Trang chủ: Gọi hàm renderIndex() và truyền chuỗi HTML về trình duyệt
app.get('/', async (req, res) => {
    try {
        const trees = await Tree.find({});
        const html = renderIndex(trees, null);
        res.send(html); 
    } catch (err) {
        console.log("❌ LỖI Ở TRANG CHỦ:", err); // In lỗi chi tiết ra Terminal
        res.status(500).send("Lỗi chi tiết: " + err.message); // In lỗi thẳng ra trình duyệt
    }
});

// 2. Trang giới thiệu: Gọi hàm renderAbout()
app.get('/about', (req, res) => {
    const html = renderAbout();
    res.send(html);
});

// 3. Xử lý nghiệp vụ thêm cây và bắt lỗi validator dữ liệu đầu vào
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
            errorMessages.push("Hệ thống gặp lỗi khi thêm dữ liệu.");
        }

        // Nếu lỗi, render lại trang chủ kèm thông báo lỗi
        const html = renderIndex(trees, errorMessages);
        res.send(html);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại cổng: http://localhost:${PORT}`);
});