// src/pages/EditUserPage.tsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditUserPage = () => {
    const { id } = useParams(); // Get the user ID from the URL
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        nomorTelepon: '',
        departemen: '',
    });
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Fetch the current user's data when the component mounts
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5001/api/users/${id}`
                );
                setFormData(response.data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                toast.error('Failed to load user data.');
                navigate('/users'); // Redirect if user not found
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [id, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.put(`http://localhost:5001/api/users/${id}`, formData);
            toast.success('User updated successfully!');
            navigate('/users');
        } catch (error) {
            console.error('Failed to update user:', error);
            toast.error('Failed to update user.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">
                Edit User: {formData.nama}
            </h1>
            <form onSubmit={handleSubmit} className="max-w-lg">
                {/* The form structure is identical to AddUserPage */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Nama</span>
                    </label>
                    <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
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
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <span className="loading loading-spinner"></span>
                    ) : (
                        'Update User'
                    )}
                </button>
            </form>
        </div>
    );
};

export default EditUserPage;
