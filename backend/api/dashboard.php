<?php
// backend/api/dashboard.php
require_once __DIR__ . '/../db.php';

$db = new Database();

// 1. Summary Cards
$totalEarnings = (float) ($db->query("SELECT SUM(amount) as total FROM earnings")->fetch()['total'] ?? 0);
$totalWithdrawal = (float) ($db->query("SELECT SUM(amount) as total FROM withdrawals")->fetch()['total'] ?? 0);
$totalProjects = (int) $db->query("SELECT COUNT(*) as count FROM projects")->fetch()['count'];
$ongoingProjects = (int) $db->query("SELECT COUNT(*) as count FROM projects WHERE status = 'Ongoing'")->fetch()['count'];

// 2. Accounting Chart (Monthly Earnings)
// MySQL DATE_FORMAT: %b for Abbreviated month name (Jan..Dec)
$monthlyEarnings = $db->query("SELECT DATE_FORMAT(date, '%b') as month, SUM(amount) as income FROM earnings GROUP BY month ORDER BY MIN(date) ASC")->fetchAll();

// Ensure income is float in the array
foreach ($monthlyEarnings as &$row) {
    $row['income'] = (float) $row['income'];
}

// 3. Balance Chart (Withdraw vs Balance)
// Balance = Total Earnings - Withdrawals
$balance = $totalEarnings - $totalWithdrawal;

// 4. Schedule (For today)
$today = date('Y-m-d'); 
// Ensure we fetch data for the 'current' seeded date or just all for demo
$schedule = $db->query("SELECT * FROM schedules ORDER BY time ASC")->fetchAll();

echo json_encode([
    'cards' => [
        'earning' => $totalEarnings,
        'withdraw' => $totalWithdrawal,
        'projects' => $totalProjects,
        'ongoing' => $ongoingProjects
    ],
    'charts' => [
        'accounting' => $monthlyEarnings,
        'balance' => [
            'withdraw' => $totalWithdrawal,
            'balance' => $balance
        ]
    ],
    'schedule' => $schedule
]);
?>
