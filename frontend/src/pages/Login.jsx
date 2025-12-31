import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('password');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // NOTE: Using .php extension directly for built-in PHP server compatibility
            const res = await axios.post('http://localhost:8000/api/login.php', { username, password });

            if (res.data && res.data.token) {
                localStorage.setItem('token', res.data.token);
                navigate('/');
            } else {
                setError(res.data.error || 'Server returned an error');
            }
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.error || err.response?.data || 'Connect to the backend failed';
            setError(typeof msg === 'string' ? msg : 'An error occurred during sign in');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F6FA]">
            <div className="bg-white p-10 rounded-3xl shadow-soft w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-primary mb-2">Welcome Back</h1>
                    <p className="text-gray-400">Enter your details to access the dashboard.</p>
                </div>

                {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-6 text-center">{error}</div>}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-coral-500/20 focus:border-coral-500 transition-all outline-none"
                            placeholder="admin"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-coral-500/20 focus:border-coral-500 transition-all outline-none"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#FF7E7E] to-[#FF5C5C] text-white font-bold py-4 rounded-xl shadow-lg shadow-coral-500/30 hover:shadow-xl hover:scale-[1.02] transition-all"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-center mt-8 text-sm text-gray-400">
                    Use <b>admin</b> / <b>password</b>
                </p>
            </div>
        </div>
    );
};

export default Login;
