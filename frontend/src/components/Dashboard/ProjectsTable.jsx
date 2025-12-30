import React from 'react';
import { RiMoreFill } from 'react-icons/ri';

const ProjectsTable = ({ projects = [], pagination = {}, onPageChange, noWrapper = false }) => {
    const statusStyles = {
        Completed: 'bg-[#1E1E2D] text-white',
        Ongoing: 'bg-gray-100 text-gray-500',
        Delayed: 'bg-[#FF8A8A] text-white',
        Pending: 'bg-gray-100 text-gray-400'
    };

    const tableContent = (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="text-left text-[11px] text-gray-300 font-bold uppercase tracking-wider border-b border-gray-50">
                        <th className="pb-4 font-bold">Name of Project</th>
                        <th className="pb-4 font-bold">Project Lead</th>
                        <th className="pb-4 font-bold">Role</th>
                        <th className="pb-4 font-bold">Deadline</th>
                        <th className="pb-4 font-bold">Status</th>
                        <th className="pb-4 font-bold">Action</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {projects.map((project, idx) => (
                        <tr key={idx} className="group hover:bg-gray-50/50 transition-colors">
                            <td className="py-4 font-bold text-[#1E1E2D]">{project.name}</td>
                            <td className="py-4 text-gray-400 font-medium">{project.client}</td>
                            <td className="py-4 text-gray-400 font-medium">{project.role}</td>
                            <td className="py-4 text-gray-400 font-medium">{project.start_date || project.deadline}</td>
                            <td className="py-4">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold ${statusStyles[project.status] || 'bg-gray-100 text-gray-400'}`}>
                                    {project.status}
                                </span>
                            </td>
                            <td className="py-4 text-gray-300">
                                <button className="hover:text-[#1E1E2D] transition-colors"><RiMoreFill className="text-xl" /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    if (noWrapper) return tableContent;

    return (
        <div className="bg-white p-8 rounded-3xl shadow-soft border border-gray-100/50">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-[#1E1E2D]">Projects</h3>
                <button className="text-gray-400 hover:text-[#1E1E2D] font-bold text-[11px] uppercase tracking-wider transition-colors">See All</button>
            </div>
            {tableContent}

            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
                <div className="flex justify-end gap-2 mt-4">
                    {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(p => (
                        <button
                            key={p}
                            onClick={() => onPageChange(p)}
                            className={`w-8 h-8 rounded-full text-xs font-bold transition-all
                   ${pagination.current_page === p
                                    ? 'bg-primary text-white shadow-md'
                                    : 'text-gray-400 hover:bg-gray-100'
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectsTable;
