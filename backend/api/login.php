<?php
// backend/api/login.php
require_once __DIR__ . '/../db.php';

$data = json_decode(file_get_contents("php://input"));

if (!$data) {
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$username = $data->username;
$password = $data->password;

$db = new Database();
// In a real app, use password_verify with hashed password
// For assessment demo, we check exact match or verify hash if we seeded it
$user = $db->query("SELECT * FROM users WHERE username = ?", [$username])->fetch();

if ($user && password_verify($password, $user['password'])) {
    // Generate a simple token (mock)
    $token = bin2hex(random_bytes(16));
    echo json_encode(['token' => $token, 'user' => ['username' => $user['username'], 'role' => $user['role']]]);
} else {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid credentials']);
}
?>
