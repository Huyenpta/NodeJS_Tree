const getHeader = require('./partials/header');
const getFooter = require('./partials/footer');

function renderAbout() {
    const htmlContent = `
        <div class="card p-5 shadow-sm text-center bg-white">
            <h1 class="display-4 text-success fw-bold mb-3">About Me</h1>
            <p class="lead">Chào mừng bạn đến với trang giới thiệu của tôi!</p>
            <p>Đây là bài thi thực hành môn <strong>Practice - Essentials of NodeJS (SET01)</strong>.</p>
            <hr class="my-4">
            <p class="text-muted">Học viên: Trịnh Quang H...</p>
            <a href="/" class="btn btn-success px-4 py-2 mt-2"><i class="fas fa-arrow-left me-2"></i>Quay lại Cửa hàng</a>
        </div>
    `;
    return getHeader("About Me") + htmlContent + getFooter();
}

module.exports = renderAbout;