<?php
// backend/api/get_profile.php
require_once __DIR__ . '/../db.php';

header('Content-Type: application/json');

$db = new Database();

// For this demo, we assume the logged-in user is 'admin'
// In a real app, you'd use session/token validation
$username = 'admin';

try {
    $stmt = $db->query("SELECT username, full_name, role, avatar_url FROM users WHERE username = ?", [$username]);
    $user = $stmt->fetch();

    if ($user) {
        // Fallback for avatar if empty
        if (empty($user['avatar_url'])) {
            $user['avatar_url'] = 'https://i.pravatar.cc/150?u=emma';
        }
        echo json_encode($user);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'User not found']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error']);
}
?>
