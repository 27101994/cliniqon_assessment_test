<?php
// backend/api/projects.php
require_once __DIR__ . '/../db.php';

$db = new Database();

$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 5;
$offset = ($page - 1) * $limit;

$statusFilter = isset($_GET['status']) ? $_GET['status'] : null;

$sql = "SELECT * FROM projects";
$params = [];

if ($statusFilter) {
    $sql .= " WHERE status = ?";
    $params[] = $statusFilter;
}

$countSql = str_replace("SELECT *", "SELECT COUNT(*) as count", $sql);
$total = (int) $db->query($countSql, $params)->fetch()['count'];

$sql .= " ORDER BY start_date DESC LIMIT $limit OFFSET $offset";
$projects = $db->query($sql, $params)->fetchAll();

// Ensure number types
foreach ($projects as &$p) {
    if (isset($p['price'])) $p['price'] = (float) $p['price'];
    if (isset($p['id'])) $p['id'] = (int) $p['id'];
}

echo json_encode([
    'data' => $projects,
    'pagination' => [
        'current_page' => $page,
        'total_pages' => ceil($total / $limit),
        'total_records' => $total
    ]
]);
?>
