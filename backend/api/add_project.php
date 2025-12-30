<?php
// backend/api/add_project.php
require_once __DIR__ . '/../db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

// Basic Validation
$required = ['name', 'client', 'role', 'start_date', 'status', 'price'];
foreach ($required as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Field '$field' is required"]);
        exit;
    }
}

$db = new Database();

try {
    $sql = "INSERT INTO projects (name, client, role, start_date, status, price) VALUES (?, ?, ?, ?, ?, ?)";
    $db->query($sql, [
        $data['name'],
        $data['client'],
        $data['role'],
        $data['start_date'],
        $data['status'],
        $data['price']
    ]);

    echo json_encode(['status' => 'success', 'message' => 'Project added successfully']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
