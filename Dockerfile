# Sử dụng phiên bản Node.js chính thức
FROM node:20

# Tạo thư mục làm việc trong container
WORKDIR /usr/src/app

# Sao chép các file quản lý package vào trước
COPY package*.json ./

# Cài đặt các thư viện phụ thuộc
RUN npm install

# Sao chép toàn bộ mã nguồn còn lại vào container
COPY . .

# Mở cổng 3000
EXPOSE 3000

# Lệnh khởi chạy ứng dụng
CMD ["npm", "start"]