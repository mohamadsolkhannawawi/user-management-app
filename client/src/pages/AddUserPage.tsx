// src/pages/AddUserPage.tsx
// This file defines the AddUserPage component, which provides a form for adding new user records.
// It includes client-side validation, form submission logic, and integration with the UserContext.

import { useState } from 'react'; // React Hook for managing component-level state.
import { useNavigate } from 'react-router-dom'; // Hook for programmatic navigation.
import toast from 'react-hot-toast'; // Library for displaying toast notifications.
import { validateEmail, validatePhoneNumber } from '../utils/validation'; // Utility functions for input validation.
import { useUser } from '../context/UserContext'; // Custom hook to access user-related context functions.
import { Info, Mail, Phone, Building, UserCheck, Quote } from 'lucide-react'; // Icons for visual elements in the information panel.

/**
 * @function AddUserPage
 * @description A functional React component that renders a page for adding a new user.
 * It features an input form, client-side validation, and an informational sidebar.
 */
const AddUserPage = () => {
    const navigate = useNavigate(); // Hook to programmatically navigate to different routes.
    const { addUser } = useUser(); // Destructures the `addUser` function from the UserContext.

    // State to manage the form input values.
    const [formData, setFormData] = useState({
        nama: '', // User's name.
        email: '', // User's email address.
        nomorTelepon: '', // User's phone number.
        departemen: '', // User's department.
        statusAktif: true, // Default new users to active.
    });

    // State to manage the submission status of the form, preventing multiple submissions.
    const [isSubmitting, setIsSubmitting] = useState(false);
    // State to manage and display local form validation errors.
    const [error, setError] = useState<string | null>(null);

    /**
     * @function handleChange
     * @description Handles changes to form input fields, updating the `formData` state.
     * It correctly handles both text inputs and checkboxes.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the input element.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value, // Handles checkbox boolean values vs. text values.
        });
    };

    /**
     * @async
     * @function handleSubmit
     * @description Handles the form submission for adding a new user.
     * It performs client-side validation, calls the `addUser` function from context, and navigates on success.
     * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevents the default browser form submission.
        setIsSubmitting(true); // Set submitting state to true.
        setError(null); // Clear any previous errors.

        // Client-side validation for email format.
        if (!validateEmail(formData.email)) {
            const errorMessage = 'Invalid email format.';
            setError(errorMessage);
            toast.error(errorMessage);
            setIsSubmitting(false);
            return;
        }

        // Client-side validation for phone number format.
        if (!validatePhoneNumber(formData.nomorTelepon)) {
            const errorMessage =
                'Phone number is invalid. It must be 10-15 digits.';
            setError(errorMessage);
            toast.error(errorMessage);
            setIsSubmitting(false);
            return;
        }

        try {
            // Attempt to add the user via the context's addUser function.
            await addUser(formData);
            // Navigate to the user list page on successful addition.
            navigate('/users');
            // Display a success toast notification.
            toast.success('User added successfully!');
        } catch (err: any) {
            // Extract error message from API response or provide a generic one.
            const message =
                err.response?.data?.message || 'An unexpected error occurred.';
            setError(message); // Set error state to display the message.
            // Display an error toast notification.
            toast.error(message);
        } finally {
            setIsSubmitting(false); // Reset submitting state regardless of success or failure.
        }
    };

    // Tailwind CSS classes for consistent input and label styling.
    const inputStyle =
        'w-full p-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-wb-secondary';
    const labelStyle = 'block text-gray-700 text-xs font-medium mb-1';

    return (
        // Main container for the page, centering content and providing background styling.
        <div className="flex justify-center items-start bg-gray-50 py-8 px-4">
            {/* Responsive layout for information panel and form. */}
            <div className="flex flex-col md:flex-row gap-8 max-w-5xl w-full">
                {/* Information Panel - hidden on small screens. */}
                <div className="hidden md:block md:w-1/2 p-6 bg-wb-light rounded-lg shadow-md border border-gray-200">
                    <div className="flex items-center text-wb-primary mb-4">
                        <Info size={24} className="mr-2" /> {/* Info icon. */}
                        <h2 className="text-xl font-semibold">
                            Tips for a Great Profile
                        </h2>
                    </div>
                    <div className="text-gray-700 mb-6 space-y-3">
                        {/* Tip for email. */}
                        <p className="flex items-center">
                            <Mail size={16} className="mr-2 text-blue-500" />
                            Use an active and professional email address.
                        </p>
                        {/* Tip for phone number. */}
                        <p className="flex items-center">
                            <Phone size={16} className="mr-2 text-green-500" />
                            Ensure the phone number is valid and reachable.
                        </p>
                        {/* Tip for department. */}
                        <p className="flex items-center">
                            <Building
                                size={16}
                                className="mr-2 text-purple-500"
                            />
                            Select the correct department for accurate
                            categorization.
                        </p>
                        {/* Tip for user status. */}
                        <p className="flex items-center">
                            <UserCheck
                                size={16}
                                className="mr-2 text-teal-500"
                            />
                            Keep user status updated (active/inactive).
                        </p>
                    </div>
                    {/* Inspirational quote. */}
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

                {/* Add User Form Section. */}
                <div className="p-6 bg-gray-50 rounded-lg shadow-md w-full md:w-1/2">
                    <h1 className="text-2xl font-semibold mb-4 text-wb-primary text-center">
                        Add New User
                    </h1>
                    <form onSubmit={handleSubmit}>
                        {/* Name Input Field. */}
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

                        {/* Email Input Field. */}
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

                        {/* Phone Number Input Field. */}
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

                        {/* Department Input Field. */}
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

                        {/* Active User Checkbox. */}
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

                        {/* Error Message Display - conditionally rendered. */}
                        {error && (
                            <div
                                className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-lg relative mb-3 text-sm"
                                role="alert"
                            >
                                {error}
                            </div>
                        )}

                        {/* Submit Button with Loading Indicator. */}
                        <button
                            type="submit"
                            className="w-full bg-wb-primary text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-wb-secondary transition-colors disabled:bg-gray-400 flex items-center justify-center"
                            disabled={isSubmitting} // Button is disabled while submitting.
                        >
                            {isSubmitting && (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div> // Loading spinner.
                            )}
                            {isSubmitting ? 'Submitting...' : 'Submit'} {/* Button text changes based on submission status. */}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUserPage; // Exports the AddUserPage component.
