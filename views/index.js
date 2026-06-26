const getHeader = require('./partials/header');
const getFooter = require('./partials/footer');

function renderIndex(trees = [], errors = null) {
    // Xử lý chuỗi hiển thị lỗi validate nếu có
    let errorHtml = '';
    if (errors && errors.length > 0) {
        errorHtml = `
            <div class="alert alert-danger">
                <ul class="mb-0">
                    ${errors.map(err => `<li>${err}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Xử lý danh sách cây đổ ra bảng
    let tableRows = '';
    if (trees && trees.length > 0) {
        tableRows = trees.map((tree, index) => `
            <tr>
                <td class="fw-bold text-muted">${index + 1}</td>
                <td class="fw-bold text-success">${tree.treename}</td>
                <td>
                    <img src="${tree.image}" alt="${tree.treename}" class="img-thumbnail shadow-sm" style="width: 70px; height: 70px; object-fit: cover;">
                </td>
                <td><p class="mb-0 text-secondary" style="font-size: 0.9rem; line-height: 1.4;">${tree.description}</p></td>
            </tr>
        `).join('');
    } else {
        tableRows = `<tr><td colspan="4" class="text-center py-4 text-muted">Chưa có dữ liệu cây nào trong hệ thống.</td></tr>`;
    }

    const mainContent = `
    <div class="row">
        <div class="col-md-5 mb-4">
            <div class="card shadow-sm border-0 bg-white">
                <div class="card-header bg-success text-white fw-bold py-3">
                    <i class="fas fa-plus-circle me-2"></i>Thêm Cây Mới
                </div>
                <div class="card-body p-4">
                    ${errorHtml}
                    <form action="/add" method="POST">
                        <div class="mb-3">
                            <label class="form-label fw-semibold">Tree Name</label>
                            <input type="text" name="treename" class="form-control" placeholder="Nhập tên cây...">
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-semibold">Description</label>
                            <textarea name="description" class="form-control" rows="4" placeholder="Nhập mô tả chi tiết..."></textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-semibold">Image URL</label>
                            <input type="text" name="image" class="form-control" placeholder="URL ảnh...">
                        </div>
                        <div class="d-flex gap-2 pt-2">
                            <button type="submit" class="btn btn-success flex-grow-1 py-2 fw-bold">Add</button>
                            <button type="reset" class="btn btn-danger px-4 py-2 fw-bold">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-md-7">
            <div class="card shadow-sm border-0 bg-white">
                <div class="card-header bg-dark text-white fw-bold py-3">
                    <i class="fas fa-leaf me-2"></i>Danh Sách Cây Trong Cửa Hàng
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead class="table-light">
                                <tr>
                                    <th style="width: 8%">ID</th>
                                    <th style="width: 25%">Name</th>
                                    <th style="width: 20%">Image</th>
                                    <th style="width: 47%">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${tableRows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    return getHeader("Tree Shop") + mainContent + getFooter();
}

module.exports = renderIndex;