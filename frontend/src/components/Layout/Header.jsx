import React from 'react';
import { RiSearchLine, RiNotification3Line } from 'react-icons/ri';

const Header = ({ title = "Dashboard" }) => {
    const [user, setUser] = React.useState({
        full_name: 'Loading...',
        role: 'Loading...',
        avatar_url: 'https://i.pravatar.cc/150'
    });

    React.useEffect(() => {
        const fetchUser = async () => {
            try {
                // We use axios directly here or fetch
                const res = await fetch('http://localhost:8000/api/get_profile.php');
                const data = await res.json();
                if (data && !data.error) {
                    setUser(data);
                }
            } catch (err) {
                console.warn(err);
            }
        };
        fetchUser();
    }, []);

    return (
        <header className="grid grid-cols-12 gap-8 py-4 bg-transparent w-full items-start">
            {/* LEFT 9 COLUMNS: Title Row + Greeting Row */}
            <div className="col-span-12 xl:col-span-9 flex flex-col gap-6">
                {/* Top Row: Title and Search */}
                <div className="flex items-center justify-between w-full">
                    <h1 className="text-2xl font-bold text-[#1E1E2D]">Dashboard</h1>

                    {/* Search Bar (Icon on right) */}
                    <div className="relative w-full max-w-sm">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full pl-6 pr-12 py-3 bg-white rounded-2xl text-sm shadow-soft focus:outline-none border border-transparent focus:border-coral-500/30 transition-all text-gray-600 placeholder-gray-300"
                        />
                        <RiSearchLine className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                    </div>
                </div>

                {/* Bottom Row: Greeting */}
                <div className="flex items-center gap-5 mt-2">
                    {/* Profile Picture */}
                    <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md flex-shrink-0 bg-gray-100">
                        <img src={user.avatar_url} alt={user.full_name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-medium text-gray-400">
                            Hello, <span className="text-[#FF8A8A] font-bold">{user.full_name}</span>
                        </h2>
                        <p className="text-sm text-gray-400 font-medium mt-1">Check your activities in this dashboard.</p>
                    </div>
                </div>
            </div>

            {/* RIGHT 3 COLUMNS: User Profile & Notification Card */}
            <div className="col-span-12 xl:col-span-3 pt-1">
                <div className="flex items-center gap-4 bg-white p-2 pr-4 rounded-2xl shadow-soft border border-gray-100/50 w-full justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm bg-gray-100">
                                <img src={user.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            {/* Status Indicator */}
                            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>

                        <div className="text-left hidden lg:block">
                            <p className="text-[15px] font-bold text-[#1E1E2D] leading-tight">{user.full_name}</p>
                            <p className="text-[11px] text-gray-400 font-medium">{user.role}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-[1px] h-8 bg-gray-100"></div>

                        {/* Notification Inside Card */}
                        <button className="relative p-2.5 bg-[#F8F9FE] rounded-full hover:bg-gray-100 transition-colors text-[#3D3D66]">
                            <RiNotification3Line className="text-xl" />
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF8A8A] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white rounded-full shadow-sm">2</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
