<?php
// backend/api/add_transaction.php
require_once __DIR__ . '/../db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['type'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON or missing type']);
    exit;
}

$type = $data['type']; // 'earning' or 'withdrawal'
$amount = $data['amount'] ?? 0;
$date = $data['date'] ?? date('Y-m-d');

$db = new Database();

try {
    if ($type === 'earning') {
        $source = $data['source'] ?? 'Unknown Source';
        $sql = "INSERT INTO earnings (amount, date, source) VALUES (?, ?, ?)";
        $db->query($sql, [$amount, $date, $source]);
    } elseif ($type === 'withdrawal') {
        $sql = "INSERT INTO withdrawals (amount, date) VALUES (?, ?)";
        $db->query($sql, [$amount, $date]);
    } else {
        throw new Exception("Invalid transaction type: $type");
    }

    echo json_encode(['status' => 'success', 'message' => ucfirst($type) . ' added successfully']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
