import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        role: '',
        username: '',
        avatar_url: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/get_profile.php');
            setFormData(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching profile", error);
            setMessage("Failed to load profile.");
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const data = new FormData();
        data.append('full_name', formData.full_name);
        data.append('role', formData.role);
        // keep old url if needed, but backend handles priority
        if (formData.avatar_url) data.append('avatar_url', formData.avatar_url);
        if (selectedFile) {
            data.append('avatar_file', selectedFile);
        }

        try {
            const res = await axios.post('http://localhost:8000/api/update_profile.php', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.status === 'success') {
                setMessage('Profile updated successfully! Refresh to see changes in Header.');
                // Update local state with new URL if returned
                if (res.data.avatar_url) {
                    setFormData(prev => ({ ...prev, avatar_url: res.data.avatar_url }));
                }
            } else {
                setMessage('Error: ' + (res.data.error || 'Unknown error'));
            }
        } catch (error) {
            setMessage('Error updating profile.');
            console.error(error);
        }
    };

    if (loading) return <div>Loading Profile...</div>;

    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>

            <div className="bg-white p-8 rounded-3xl shadow-soft">
                {message && <p className={`mb-4 p-3 rounded-lg ${message.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>{message}</p>}

                <div className="flex flex-col items-center mb-8 gap-4">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-md relative group">
                        <img
                            src={previewUrl || formData.avatar_url || 'https://i.pravatar.cc/150'}
                            alt="Profile"
                            className="w-full h-full object-cover"
                            onError={(e) => e.target.src = 'https://i.pravatar.cc/150'}
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                            onClick={() => document.getElementById('fileInput').click()}>
                            <span className="text-white text-xs font-bold">Change</span>
                        </div>
                    </div>
                    <button type="button" onClick={() => document.getElementById('fileInput').click()} className="text-coral-500 font-bold text-sm hover:underline">
                        Upload New Photo
                    </button>
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username (Read-only)</label>
                        <input type="text" value={formData.username} disabled className="w-full p-3 border rounded-xl bg-gray-50 text-gray-500" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required className="w-full p-3 border rounded-xl" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role / Job Title</label>
                        <input type="text" name="role" value={formData.role} onChange={handleChange} required className="w-full p-3 border rounded-xl" />
                    </div>

                    <button type="submit" className="w-full bg-coral-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-coral-600 transition shadow-lg shadow-coral-200">
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
