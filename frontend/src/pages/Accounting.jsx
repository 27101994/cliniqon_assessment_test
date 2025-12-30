import React, { useState } from 'react';
import axios from 'axios';

const Accounting = () => {
    const [formData, setFormData] = useState({
        type: 'earning',
        amount: '',
        date: '',
        source: '' // used for earning source or description
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            await axios.post('http://localhost:8000/api/add_transaction.php', formData);
            setMessage('Transaction added successfully!');
            setFormData({ type: 'earning', amount: '', date: '', source: '' });
        } catch (error) {
            setMessage('Error adding transaction.');
            console.error(error);
        }
    };

    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800">Accounting & Finance</h2>

            <div className="bg-white p-8 rounded-3xl shadow-soft">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Add Transaction</h3>
                {message && <p className="text-green-500 mb-4 bg-green-50 p-3 rounded-lg">{message}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
                        <select name="type" value={formData.type} onChange={handleChange} className="w-full p-3 border rounded-xl">
                            <option value="earning">Earning</option>
                            <option value="withdrawal">Withdrawal</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                        <input type="number" name="amount" value={formData.amount} onChange={handleChange} required className="w-full p-3 border rounded-xl" placeholder="0.00" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full p-3 border rounded-xl" />
                    </div>

                    {formData.type === 'earning' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Source / Description</label>
                            <input name="source" value={formData.source} onChange={handleChange} className="w-full p-3 border rounded-xl" placeholder="e.g. Client Payment" />
                        </div>
                    )}

                    <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                        Submit Transaction
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Accounting;
