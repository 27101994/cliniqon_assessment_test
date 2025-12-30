<?php
// backend/index.php
require_once 'db.php';

header('Content-Type: application/json');

$requestUri = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

// Simple Router
$routes = [
    '/api/dashboard' => 'api/dashboard.php', // Summary cards, charts
    '/api/projects' => 'api/projects.php',   // Projects table
    '/api/login' => 'api/login.php',         // Auth
    '/api/seed' => 'seed.php'                // Seeding utility
];

// Handle basic routing (mocking a real router)
// For local PHP server, route might be exactly the path
// Adjust for potential query params
$path = parse_url($requestUri, PHP_URL_PATH);

// Helper to include API files
function serve($file) {
    global $db; // accessible inside
    require_once __DIR__ . '/' . $file;
}

$db = new Database();

if ($path === '/' || $path === '/api') {
    echo json_encode(['status' => 'API Running']);
    exit;
}

// Route mapping
// NOTE: For local `php -S`, requests like `/api/dashboard` usually need a rewrite or direct mapping.
// We will implement individual files in `api/` folder and let them be called directly or via this router.
// For now, let's just make the `api` folder the source of truth.
// If the user runs `php -S localhost:8000 -t backend`, then `/api/dashboard.php` works.
// We'll update README to suggest running server in root or using specific rewrite logic.

echo json_encode(['error' => 'Route not found', 'path' => $path]);
?>
