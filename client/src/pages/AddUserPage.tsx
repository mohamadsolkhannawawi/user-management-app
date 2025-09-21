// src/pages/AddUserPage.tsx

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUserPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        nomorTelepon: '',
        departemen: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            await axios.post('http://localhost:5001/api/users', formData);
            navigate('/users');
        } catch (err: any) {
            console.error(err);
            setError(
                err.response?.data?.message ||
                    'Failed to add user. Please check your input.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputStyle =
        'w-full p-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-wb-secondary';
    const labelStyle = 'block text-gray-700 text-xs font-medium mb-1';

    return (
        <div className="flex justify-center bg-gray-50 py-4">
            <div className="p-6 bg-wb-base rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-4 text-wb-primary text-center">
                    Add New User
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className={labelStyle}>Nama</label>
                        <input
                            type="text"
                            name="nama"
                            value={formData.nama}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className={inputStyle}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className={labelStyle}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john.doe@example.com"
                            className={inputStyle}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className={labelStyle}>Nomor Telepon</label>
                        <input
                            type="text"
                            name="nomorTelepon"
                            value={formData.nomorTelepon}
                            onChange={handleChange}
                            placeholder="081234567890"
                            className={inputStyle}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className={labelStyle}>Departemen</label>
                        <input
                            type="text"
                            name="departemen"
                            value={formData.departemen}
                            onChange={handleChange}
                            placeholder="Technology"
                            className={inputStyle}
                            required
                        />
                    </div>

                    {error && (
                        <div
                            className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-lg relative mb-3 text-sm"
                            role="alert"
                        >
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-wb-primary text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-wb-secondary transition-colors disabled:bg-gray-400 flex items-center justify-center"
                        disabled={isSubmitting}
                    >
                        {isSubmitting && (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        )}
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddUserPage;
