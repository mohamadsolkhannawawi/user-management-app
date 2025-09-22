// src/pages/AddUserPage.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { validateEmail, validatePhoneNumber } from '../utils/validation';
import { useUser } from '../context/UserContext';

const AddUserPage = () => {
    const navigate = useNavigate();
    const { addUser } = useUser(); // Use addUser from context
    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        nomorTelepon: '',
        departemen: '',
        statusAktif: true, // Default to active
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null); // Keep local error for form validation

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        // Client-side validation
        if (!validateEmail(formData.email)) {
            const errorMessage = 'Invalid email format.';
            setError(errorMessage);
            toast.error(errorMessage);
            setIsSubmitting(false);
            return;
        }

        if (!validatePhoneNumber(formData.nomorTelepon)) {
            const errorMessage =
                'Phone number is invalid. It must be 10-15 digits.';
            setError(errorMessage);
            toast.error(errorMessage);
            setIsSubmitting(false);
            return;
        }

        try {
            await addUser(formData); // Use addUser from context
            navigate('/users');
        } catch (err: any) {
            const message =
                err.response?.data?.message || 'An unexpected error occurred.';
            setError(message);
            // The toast is already handled by the context
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
                        <label className={labelStyle}>Name</label>
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
                        <label className={labelStyle}>Phone Number</label>
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
                        <label className={labelStyle}>Department</label>
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

                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            id="statusAktif"
                            name="statusAktif"
                            checked={formData.statusAktif}
                            onChange={handleChange}
                            className="h-4 w-4 text-wb-primary focus:ring-wb-secondary border-gray-300 rounded"
                        />
                        <label
                            htmlFor="statusAktif"
                            className="ml-2 block text-sm text-gray-900"
                        >
                            Active User
                        </label>
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
