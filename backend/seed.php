<?php
// backend/seed.php
require_once 'db.php';

$db = new Database();

// Read Schema
$schema = file_get_contents(__DIR__ . '/schema.sql');
$statements = array_filter(array_map('trim', explode(';', $schema)));

foreach ($statements as $stmt) {
    if (!empty($stmt)) {
        $db->pdo->exec($stmt);
    }
}

echo "Schema created.<br>";

// Clear existing data
$db->pdo->exec("DELETE FROM projects");
$db->pdo->exec("DELETE FROM earnings");
$db->pdo->exec("DELETE FROM withdrawals");
$db->pdo->exec("DELETE FROM schedules");
$db->pdo->exec("DELETE FROM users");

// Insert User
$password = password_hash('password', PASSWORD_DEFAULT);
$db->query("INSERT INTO users (username, password, full_name, role) VALUES (?, ?, ?, ?)", 
    ['admin', $password, 'Emma Taylor', 'UX/UI Designer']);

// Insert Projects
// Target: 15 Total, 3 Ongoing.
// We'll insert 15 records clearly.
// 1. Dance Studio (Completed)
$db->query("INSERT INTO projects (name, client, role, start_date, status, price) VALUES (?, ?, ?, ?, ?, ?)", 
    ['Dance studio - Webpage', 'Sriram Sarvade', 'CEO', '2020-03-05', 'Completed', 2000.00]);

// 2. Real Estate (Ongoing)
$db->query("INSERT INTO projects (name, client, role, start_date, status, price) VALUES (?, ?, ?, ?, ?, ?)", 
    ['Real Estate Homepage', 'Geeta Ingle', 'Manager', '2020-12-25', 'Ongoing', 4500.00]);

// 3. Ongoing
$db->query("INSERT INTO projects (name, client, role, start_date, status, price) VALUES (?, ?, ?, ?, ?, ?)", 
    ['Mobile App Redesign', 'John Doe', 'Product Owner', '2021-01-10', 'Ongoing', 1500.00]);

// 4. Ongoing
$db->query("INSERT INTO projects (name, client, role, start_date, status, price) VALUES (?, ?, ?, ?, ?, ?)", 
    ['Dashboard UI Kit', 'Jane Smith', 'Designer', '2021-02-15', 'Ongoing', 3000.00]);

// Remaining 11 projects (Completed)
for ($i=5; $i<=15; $i++) {
    $db->query("INSERT INTO projects (name, client, role, start_date, status, price) VALUES (?, ?, ?, ?, ?, ?)", 
        ["Project Archive $i", "Client $i", 'Lead', date('Y-m-d', strtotime("-$i months")), 'Completed', 1000]);
}

// Insert Earnings (Target: $22k)
// We have 11 months for chart (Jan-Nov approx).
// 22000 / 11 = 2000 avg.
$months = ['2023-01', '2023-02', '2023-03', '2023-04', '2023-05', '2023-06', '2023-07', '2023-08', '2023-09', '2023-10', '2023-11'];
$amounts = [2000, 2500, 1500, 3000, 2000, 2000, 2500, 1500, 1000, 2000, 2000]; // Sum = 22000 exactly
foreach ($months as $idx => $m) {
    $db->query("INSERT INTO earnings (amount, date, source) VALUES (?, ?, ?)", 
        [$amounts[$idx], "$m-15", 'Client Payment']);
}

// Insert Withdrawals (Target: $10k)
$db->query("INSERT INTO withdrawals (amount, date) VALUES (?, ?)", [6000.00, '2023-03-01']);
$db->query("INSERT INTO withdrawals (amount, date) VALUES (?, ?)", [4000.00, '2023-03-15']);

// Insert Schedule
$db->query("INSERT INTO schedules (title, description, time, date, type) VALUES (?, ?, ?, ?, ?)", 
    ['Client Meeting', 'Review project requirements', '08:00', date('Y-m-d'), 'meeting']);

$db->query("INSERT INTO schedules (title, description, time, date, type) VALUES (?, ?, ?, ?, ?)", 
    ['Check List', 'Verify pending tasks', '10:00', date('Y-m-d'), 'task']);

$db->query("INSERT INTO schedules (title, description, time, date, type) VALUES (?, ?, ?, ?, ?)", 
    ['Course', 'React Advanced Patterns', '12:00', date('Y-m-d'), 'course']);

echo "Database Seeded successfully (Target: 22k Earn, 10k Withdraw, 15 Proj, 3 Ongoing).";
?>
