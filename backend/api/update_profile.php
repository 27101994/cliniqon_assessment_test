<?php
// backend/api/update_profile.php
require_once __DIR__ . '/../db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

// Check if we received JSON (old way) or Form Data (new way)
// If Content-Type is multipart/form-data, $_POST will be populated automatically
$data = $_POST;
if (empty($data)) {
    // Fallback if someone sends raw JSON
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
}

// For this demo, we assume the logged-in user is 'admin'
$username = 'admin';

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid Request']);
    exit;
}

$fullName = $data['full_name'] ?? null;
$role = $data['role'] ?? null;
$avatarUrl = $data['avatar_url'] ?? null; // Keep existing if no new file

if (!$fullName || !$role) {
    http_response_code(400);
    echo json_encode(['error' => 'Full Name and Role are required']);
    exit;
}

// Handle File Upload
if (isset($_FILES['avatar_file']) && $_FILES['avatar_file']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = __DIR__ . '/../uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $fileTmpPath = $_FILES['avatar_file']['tmp_name'];
    $fileName = $_FILES['avatar_file']['name'];
    
    // Validate types (Allow JPG, PNG, GIF)
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mimeType = $finfo->file($fileTmpPath);

    if (in_array($mimeType, $allowedTypes)) {
        // Create unique filename
        $extension = pathinfo($fileName, PATHINFO_EXTENSION);
        $newFileName = 'avatar_' . md5($username) . '_' . time() . '.' . $extension;
        $destPath = $uploadDir . $newFileName;

        if (move_uploaded_file($fileTmpPath, $destPath)) {
            // Construct public URL
            $avatarUrl = 'http://localhost:8000/uploads/' . $newFileName;
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to move uploaded file']);
            exit;
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid file type. Only JPG, PNG, GIF allowed']);
        exit;
    }
}

$db = new Database();

try {
    // Update by username to be robust
    $sql = "UPDATE users SET full_name = ?, role = ?, avatar_url = ? WHERE username = ?";
    $params = [$fullName, $role, $avatarUrl, $username];

    $db->query($sql, $params);

    echo json_encode([
        'status' => 'success', 
        'message' => 'Profile updated successfully',
        'avatar_url' => $avatarUrl
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
