// src/pages/AddUserPage.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { validateEmail, validatePhoneNumber } from '../utils/validation';
import { useUser } from '../context/UserContext';
// Import new icons
import { Info, Mail, Phone, Building, UserCheck, Quote } from 'lucide-react'; // Added Mail, Phone, Building, UserCheck

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
        <div className="flex justify-center items-start bg-gray-50 py-8 px-4">
            <div className="flex flex-col md:flex-row gap-8 max-w-5xl w-full">
                {/* Information Panel */}
                <div className="hidden md:block md:w-1/2 p-6 bg-wb-light rounded-lg shadow-md border border-gray-200">
                    <div className="flex items-center text-wb-primary mb-4">
                        <Info size={24} className="mr-2" />
                        <h2 className="text-xl font-semibold">
                            Tips for a Great Profile
                        </h2>
                    </div>
                    <div className="text-gray-700 mb-6 space-y-3">
                        {' '}
                        {/* Changed from ul to div, and space-y */}
                        <p className="flex items-center">
                            <Mail size={16} className="mr-2 text-blue-500" />{' '}
                            Use an active and professional email address.
                        </p>
                        <p className="flex items-center">
                            <Phone size={16} className="mr-2 text-green-500" />{' '}
                            Ensure the phone number is valid and reachable.
                        </p>
                        <p className="flex items-center">
                            <Building
                                size={16}
                                className="mr-2 text-purple-500"
                            />{' '}
                            Select the correct department for accurate
                            categorization.
                        </p>
                        <p className="flex items-center">
                            <UserCheck
                                size={16}
                                className="mr-2 text-teal-500"
                            />{' '}
                            Keep user status updated (active/inactive).
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-inner border border-gray-100">
                        <Quote
                            size={20}
                            className="inline mr-2 text-gray-500"
                        />
                        <p className="italic text-gray-800">
                            "Organized teams start with clear user data."
                        </p>
                    </div>
                </div>

                {/* Add User Form */}
                <div className="p-6 bg-gray-50 rounded-lg shadow-md w-full md:w-1/2">
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
        </div>
    );
};

export default AddUserPage;
