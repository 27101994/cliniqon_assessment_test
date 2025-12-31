import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  RiDashboardLine,
  RiUserLine,
  RiPieChartLine,
  RiWalletLine,
  RiMessage3Line,
  RiFolderLine,
  RiSettings4Line,
  RiInformationLine,
  RiLogoutBoxLine
} from 'react-icons/ri';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navItems = [
    { icon: RiDashboardLine, label: 'Dashboard', path: '/' },
    { icon: RiUserLine, label: 'Profile', path: '/profile' },
    { icon: RiPieChartLine, label: 'Analysis', path: '/analysis' },
    { icon: RiWalletLine, label: 'Accounting', path: '/accounting' },
    { icon: RiMessage3Line, label: 'Messages', path: '/messages', badge: true },
    { icon: RiFolderLine, label: 'Projects', path: '/projects' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#1E1E2D] text-gray-400 flex flex-col justify-between py-6 z-50 transition-all duration-300">
      {/* Logo */}
      <div className="px-8 mb-8">
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Design<span className="text-coral-500 font-light">Hire</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative
              ${isActive
                ? 'bg-gradient-to-r from-[#FF7E7E] to-[#FF5C5C] text-white shadow-lg shadow-coral-500/20'
                : 'hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <item.icon className="text-xl" />
            <span className="font-medium">{item.label}</span>
            {item.badge && (
              <span className="absolute right-4 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="px-4 space-y-2 mt-auto">
        <button className="flex items-center gap-4 px-4 py-3 w-full text-left rounded-xl hover:bg-white/5 hover:text-white transition-colors">
          <RiSettings4Line className="text-xl" />
          <span className="font-medium">Settings</span>
        </button>
        <button className="flex items-center gap-4 px-4 py-3 w-full text-left rounded-xl hover:bg-white/5 hover:text-white transition-colors">
          <RiInformationLine className="text-xl" />
          <span className="font-medium">Info</span>
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 px-4 py-3 w-full text-left rounded-xl hover:bg-red-500/10 text-red-400 hover:text-red-500 transition-all mt-4 border border-transparent hover:border-red-500/20"
        >
          <RiLogoutBoxLine className="text-xl" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
