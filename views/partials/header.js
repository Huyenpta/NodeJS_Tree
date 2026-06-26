function getHeader(title = "Tree Shop") {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    </head>
    <body class="bg-light">
        <nav class="navbar navbar-expand-lg navbar-dark bg-success shadow-sm mb-4">
            <div class="container">
                <a class="navbar-brand fw-bold" href="/">Tree Shop</a>
                <div class="collapse navbar-collapse">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item"><a class="nav-link" href="/">TreeShop</a></li>
                        <li class="nav-item"><a class="nav-link" href="/about">About me</a></li>
                    </ul>
                </div>
                <span class="navbar-text text-white d-none d-md-inline">Practice - Essentials of NodeJS</span>
            </div>
        </nav>
        <div class="container">
    `;
}

module.exports = getHeader;