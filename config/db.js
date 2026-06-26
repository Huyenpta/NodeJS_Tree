const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('👉 Đã kết nối cơ sở dữ liệu MongoDB thành công!');
    } catch (err) {
        console.error('❌ Lỗi kết nối MongoDB:', err);
        process.exit(1); // Dừng ứng dụng ngay nếu kết nối lỗi
    }
};

module.exports = connectDB;