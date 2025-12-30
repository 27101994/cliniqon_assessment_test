import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RiWallet3Fill, RiSafe2Fill, RiCheckboxFill, RiEdit2Fill } from 'react-icons/ri';

import SummaryCard from '../components/Dashboard/SummaryCard';
import AccountingChart from '../components/Dashboard/AccountingChart';
import ProjectsTable from '../components/Dashboard/ProjectsTable';
import BalanceChart from '../components/Dashboard/BalanceChart';
import SchedulePanel from '../components/Dashboard/SchedulePanel';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [projects, setProjects] = useState([]);
    const [projectsPage, setProjectsPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            // Direct PHP file access for built-in server
            const dashboardRes = await axios.get('http://localhost:8000/api/dashboard.php');
            const projectsRes = await axios.get(`http://localhost:8000/api/projects.php?page=${projectsPage}&limit=4`);

            setData(dashboardRes.data);
            setProjects(projectsRes.data);
        } catch (error) {
            console.warn("Backend error", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [projectsPage]);

    if (loading) return <div className="flex h-screen items-center justify-center text-primary">Loading...</div>;

    // Safe access with optionals
    const cards = data?.cards || { earning: 0, withdraw: 0, projects: 0, ongoing: 0 };
    const charts = data?.charts || { accounting: [], balance: { withdraw: 0, balance: 0 } };
    const schedule = data?.schedule || [];

    return (
        <div className="grid grid-cols-12 gap-8">
            {/* LEFT COLUMN (75%) */}
            <div className="col-span-12 xl:col-span-9 space-y-8">

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <SummaryCard
                        icon={RiWallet3Fill}
                        title="Total Earning"
                        value={`$${(cards.earning / 1000).toFixed(0)}k`}
                        growth="+10.80%"
                    />
                    <SummaryCard
                        icon={RiSafe2Fill}
                        title="Withdraw"
                        value={`$${(cards.withdraw / 1000).toFixed(0)}k`}
                        growth="+05.80%"
                    />
                    <SummaryCard
                        icon={RiCheckboxFill}
                        title="Total Projects"
                        value={cards.projects}
                        growth="+10.80%"
                    />
                    <SummaryCard
                        icon={RiEdit2Fill}
                        title="Ongoing"
                        value={cards.ongoing}
                        growth="+10.80%"
                    />
                </div>

                {/* Charts Section */}
                <AccountingChart data={charts.accounting} />

                {/* Projects Table */}
                <ProjectsTable
                    projects={projects.data || []}
                    pagination={projects.pagination || {}}
                    onPageChange={setProjectsPage}
                />
            </div>

            {/* RIGHT COLUMN (25%) */}
            <div className="col-span-12 xl:col-span-3 space-y-8">
                <BalanceChart
                    withdraw={parseFloat(charts.balance.withdraw || 0)}
                    balance={parseFloat(charts.balance.balance || 0)}
                />
                <SchedulePanel schedule={schedule} />
            </div>
        </div>
    );
};

export default Dashboard;
