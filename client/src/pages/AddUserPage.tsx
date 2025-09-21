// src/pages/AddUserPage.tsx

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUserPage = () => {
    // Hook to programmatically navigate to other pages
    const navigate = useNavigate();

    // State for form inputs
    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        nomorTelepon: '',
        departemen: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Handles changes in form inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handles form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            await axios.post('http://localhost:5001/api/users', formData);
            // If successful, navigate to the user list page
            navigate('/users');
        } catch (err: any) {
            console.error(err);
            // Set a user-friendly error message
            setError(
                err.response?.data?.message ||
                    'Failed to add user. Please check your input.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Add New User</h1>
            <form onSubmit={handleSubmit} className="max-w-lg">
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Nama</span>
                    </label>
                    <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john.doe@example.com"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Nomor Telepon</span>
                    </label>
                    <input
                        type="text"
                        name="nomorTelepon"
                        value={formData.nomorTelepon}
                        onChange={handleChange}
                        placeholder="081234567890"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Departemen</span>
                    </label>
                    <input
                        type="text"
                        name="departemen"
                        value={formData.departemen}
                        onChange={handleChange}
                        placeholder="Technology"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Display error message if submission fails */}
                {error && (
                    <div role="alert" className="alert alert-error mb-4">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting && (
                        <span className="loading loading-spinner"></span>
                    )}
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddUserPage;
