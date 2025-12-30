import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectsTable from '../components/Dashboard/ProjectsTable';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        client: '',
        role: '',
        start_date: '',
        status: 'Ongoing',
        price: ''
    });
    const [message, setMessage] = useState('');

    const fetchProjects = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/projects.php?limit=10');
            setProjects(res.data.data);
        } catch (error) {
            console.error("Error fetching projects", error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            await axios.post('http://localhost:8000/api/add_project.php', formData);
            setMessage('Project added successfully!');
            fetchProjects(); // Refresh list
            setFormData({
                name: '',
                client: '',
                role: '',
                start_date: '',
                status: 'Ongoing',
                price: ''
            });
        } catch (error) {
            setMessage('Error adding project.');
            console.error(error);
        }
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800">Projects Management</h2>

            {/* Add Project Form */}
            <div className="bg-white p-8 rounded-3xl shadow-soft border border-gray-100/50">
                <h3 className="text-lg font-bold text-[#1E1E2D] mb-6">Add New Project</h3>
                {message && <p className="text-green-500 mb-4 font-medium text-sm bg-green-50 p-3 rounded-xl">{message}</p>}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input name="name" placeholder="Project Name" value={formData.name} onChange={handleChange} required className="p-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:border-[#FF8A8A] transition-all placeholder:text-gray-300" />
                    <input name="client" placeholder="Client Name" value={formData.client} onChange={handleChange} required className="p-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:border-[#FF8A8A] transition-all placeholder:text-gray-300" />
                    <input name="role" placeholder="Role (e.g. Lead)" value={formData.role} onChange={handleChange} required className="p-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:border-[#FF8A8A] transition-all placeholder:text-gray-300" />
                    <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} required className="p-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:border-[#FF8A8A] transition-all text-gray-500" />
                    <select name="status" value={formData.status} onChange={handleChange} className="p-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:border-[#FF8A8A] transition-all text-gray-500 appearance-none">
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                    </select>
                    <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required className="p-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:border-[#FF8A8A] transition-all placeholder:text-gray-300" />

                    <button type="submit" className="md:col-span-2 bg-[#FF8A8A] text-white py-4 rounded-2xl font-bold hover:bg-[#ff7676] transition-all shadow-md shadow-coral-500/20 active:scale-[0.98] mt-2">
                        Add Project
                    </button>
                </form>
            </div>

            {/* List */}
            <div className="bg-white p-8 rounded-3xl shadow-soft border border-gray-100/50">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-bold text-[#1E1E2D]">Recent Projects</h3>
                </div>
                <ProjectsTable projects={projects} noWrapper={true} pagination={{}} onPageChange={() => { }} />
            </div>
        </div>
    );
};

export default Projects;
