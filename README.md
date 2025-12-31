# Cliniqon Dashboard Project

A modern, responsive dashboard application built with React, PHP, and MySQL. This project was developed as a machine test to demonstrate full-stack capabilities, UI/UX consistency, and efficient data handling.

## 🚀 Tech Stack

- **Frontend**: React.js, Tailwind CSS, Recharts (for data visualization), React Icons.
- **Backend**: Native PHP (REST API), PDO for secure database interactions.
- **Database**: MySQL.
- **Tools**: Vite, Axios, Postman (testing).

## 🛠️ Setup Instructions

### 1. Database Setup
1. Create a database named `cliniqon_machine_test`.
2. Import the `schema.sql` file provided in the root directory:
   ```bash
   mysql -u root -p cliniqon_machine_test < schema.sql
   ```
3. Update the backend/.env file with your database credentials. Please refer to the example.env file or rename example.env to .env inside the backend folder.

### 2. Backend Server
Navigate to the root directory and start the PHP built-in server:
```bash
php -S localhost:8000 -t backend
```

### 3. Frontend Development
Navigate to the `frontend` directory, install dependencies, and start the development server:
```bash
cd frontend
npm install
npm run dev
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/login.php` | Authenticate user and return token. |
| GET | `/api/dashboard.php`| Fetch summary cards and chart data. |
| GET | `/api/projects.php` | List projects with pagination. |
| POST | `/api/add_project.php`| Create a new project record. |
| POST | `/api/add_transaction.php`| Record new earnings or withdrawals. |
| GET | `/api/get_profile.php`| Fetch currently logged-in user details. |
| POST | `/api/update_profile.php`| Update user profile (name, role, avatar). |

## ✨ Key Features

- **Dynamic Dashboard**: Real-time aggregation of earnings, withdrawals, and project counts.
- **Responsive Layout**: Designed for mobile, tablet, and desktop using a 12-column grid system.
- **Modern Visualization**: Donut charts with background tracks and month-wise grouped bar charts.
- **Management System**: Fully functional project creation and listing with status tracking.
- **Themed UI**: Consistent Salmon/Coral (#FF8A8A) branding matching provided design images.

## 📁 Project Structure

```text
├── backend/
│   ├── api/          # PHP REST API endpoints
│   ├── .env          # Database configuration
│   └── db.php        # Database connection class (PDO)
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Main page views
│   │   └── App.jsx     # App routing and layout
└── schema.sql        # Database schema and seed data
```
