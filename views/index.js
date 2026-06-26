const getHeader = require('./partials/header');
const getFooter = require('./partials/footer');

function renderIndex(trees = [], editingTree = null, errors = null) {
    let errorHtml = '';
    if (errors && errors.length > 0) {
        errorHtml = `<div class="alert alert-danger"><ul class="mb-0">${errors.map(err => `<li>${err}</li>`).join('')}</ul></div>`;
    }

    let tableRows = '';
    if (trees && trees.length > 0) {
        tableRows = trees.map((tree, index) => `
            <tr>
                <td class="fw-bold text-muted">${index + 1}</td>
                <td class="fw-bold">${tree.treename}</td>
                <td>
                    <img src="${tree.image || 'https://dummyimage.com/70x70/e2e8e2/516e51.png&text=No+Img'}" alt="${tree.treename}" class="img-thumbnail" style="width: 70px; height: 70px; object-fit: cover;">
                </td>
                <td><p class="mb-0" style="font-size: 0.9rem; line-height: 1.4;">${tree.description}</p></td>
                <td class="text-center">
                    <a href="/edit/${tree._id}" class="text-primary me-3" title="Edit"><i class="fas fa-pen"></i></a>
                    <a href="/delete/${tree._id}" class="text-danger" title="Delete" onclick="return confirm('Are you sure you want to delete this tree?');"><i class="far fa-trash-alt"></i></a>
                </td>
            </tr>
        `).join('');
    } else {
        tableRows = `<tr><td colspan="5" class="text-center py-4 text-muted">No data available.</td></tr>`;
    }

    const actionUrl = editingTree ? `/edit/${editingTree._id}` : '/add';
    const nameVal = editingTree ? editingTree.treename : '';
    const descVal = editingTree ? editingTree.description : '';
    const btnSubmit = editingTree ? 'Update' : 'Add';
    const btnReset = editingTree
        ? `<a href="/" class="btn px-4 text-white fw-bold" style="background-color: #ba6d68; text-decoration: none;">Cancel</a>`
        : `<button type="reset" class="btn px-4 text-white fw-bold" style="background-color: #ba6d68;">Reset</button>`;

    const defaultImg = "https://dummyimage.com/400x400/e2e8e2/516e51.png&text=Preview+Image";
    const displayImg = (editingTree && editingTree.image) ? editingTree.image : defaultImg;

    const mainContent = `
    <div class="row mb-5">
        <div class="col-md-5 d-flex align-items-center justify-content-center">
            <img src="${displayImg}" alt="Preview" class="img-fluid rounded shadow-sm" style="max-height: 350px; width: 100%; object-fit: cover;">
        </div>

        <div class="col-md-7">
            <h2 class="text-success fst-italic mb-3" style="color: #799b79 !important;">Tree Shop</h2>
            ${errorHtml}
            <form action="${actionUrl}" method="POST" enctype="multipart/form-data">
                <div class="mb-3">
                    <label class="form-label text-muted small mb-1">Tree Name</label>
                    <input type="text" name="treename" class="form-control" placeholder="Enter tree name..." value="${nameVal}">
                </div>
                <div class="mb-3">
                    <label class="form-label text-muted small mb-1">Description</label>
                    <textarea name="description" class="form-control" rows="3" placeholder="Enter description...">${descVal}</textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label text-muted small mb-1">Image ${editingTree ? '(Leave blank to keep the current image)' : ''}</label>
                    <div class="input-group">
                        <input type="file" name="image" class="form-control" accept="image/*">
                    </div>
                </div>
                <div class="d-flex justify-content-end gap-2 mt-4">
                    <button type="submit" class="btn px-4 text-white fw-bold" style="background-color: #83a883;">${btnSubmit}</button>
                    ${btnReset}
                </div>
            </form>
        </div>
    </div>

    <div class="table-responsive">
        <table class="table align-middle">
            <thead style="background-color: #83a883; color: white;">
                <tr>
                    <th style="width: 5%">Id</th>
                    <th style="width: 20%">Name</th>
                    <th style="width: 15%">Image</th>
                    <th style="width: 50%">Description</th>
                    <th style="width: 10%" class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>
    </div>
    `;

    return getHeader("Tree Shop") + mainContent + getFooter();
}

module.exports = renderIndex;