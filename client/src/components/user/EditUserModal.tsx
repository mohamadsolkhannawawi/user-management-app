// src/components/user/EditUserModal.tsx
// This file defines the EditUserModal component, a modal dialog for editing existing user details.
// It handles form input, client-side validation, and interacts with the UserContext to update user data.

import React from 'react';
import { useUser } from '../../context/UserContext'; // Imports the useUser hook from UserContext for accessing user-related functions.
import { validateEmail, validatePhoneNumber } from '../../utils/validation'; // Imports utility functions for email and phone number validation.
import toast from 'react-hot-toast'; // Imports the toast notification library.
import type { User, UserEditData } from '../../types/user'; // Imports TypeScript types for User and UserEditData.

/**
 * @interface EditUserModalProps
 * @description Defines the props for the EditUserModal component.
 * @property {User | null} userToEdit - The user object to be edited, or null if no user is selected for editing.
 * @property {(user: User | null) => void} setUserToEdit - A function to set the user to be edited (used to open/close the modal).
 */
interface EditUserModalProps {
    userToEdit: User | null;
    setUserToEdit: (user: User | null) => void;
}

/**
 * @function EditUserModal
 * @description A functional React component that renders a modal form for editing user details.
 * It manages form state, performs client-side validation, and dispatches update actions via UserContext.
 * @param {EditUserModalProps} props - The properties passed to the component.
 */
const EditUserModal: React.FC<EditUserModalProps> = ({
    userToEdit,
    setUserToEdit,
}) => {
    // Destructures the `updateUser` function from the UserContext.
    const { updateUser } = useUser();
    // State to hold the form data for editing a user.
    const [editFormData, setEditFormData] = React.useState<UserEditData | null>(
        null
    );
    // Local state to manage and display validation or API errors.
    const [error, setError] = React.useState<string | null>(null);

    // Effect hook to initialize form data when `userToEdit` changes (i.e., when the modal opens).
    React.useEffect(() => {
        if (userToEdit) {
            setError(null); // Clear any previous errors when a new user is selected for editing.
            setEditFormData({
                nama: userToEdit.nama,
                email: userToEdit.email,
                nomorTelepon: userToEdit.nomorTelepon,
                departemen: userToEdit.departemen,
                statusAktif: userToEdit.statusAktif,
            });
        }
    }, [userToEdit]); // Dependency array ensures this effect runs when `userToEdit` changes.

    /**
     * @function handleEditChange
     * @description Handles changes to form input fields, updating the `editFormData` state.
     * It supports both text inputs and checkboxes.
     * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e - The change event from the input element.
     */
    const handleEditChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        if (!editFormData) return; // Prevents updating if form data is not initialized.
        const { name, value, type } = e.target;

        // Handles checkbox input type specifically for boolean values.
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setEditFormData({ ...editFormData, [name]: checked });
        } else {
            // Handles text and other input types.
            setEditFormData({ ...editFormData, [name]: value });
        }
    };

    /**
     * @async
     * @function handleEditSubmit
     * @description Handles the form submission for updating a user.
     * It performs client-side validation and calls the `updateUser` function from the context.
     * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
     */
    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevents the default form submission behavior.
        if (!userToEdit || !editFormData) return; // Ensures user and form data are available.

        setError(null); // Clear any previous errors before attempting submission.

        // Client-side validation for email format.
        if (!validateEmail(editFormData.email)) {
            toast.error('Invalid email format.');
            return;
        }

        // Client-side validation for phone number format.
        if (!validatePhoneNumber(editFormData.nomorTelepon)) {
            toast.error('Phone number is invalid. It must be 10-15 digits.');
            return;
        }

        try {
            await updateUser(userToEdit.id, editFormData); // Calls the updateUser function with the user's ID and updated data.
            setUserToEdit(null); // Closes the modal on successful update.
            setEditFormData(null); // Clears form data.
            toast.success('User updated successfully!'); // Display success toast.
        } catch (err: any) {
            // Extracts error message from the API response or provides a generic message.
            const message =
                err.response?.data?.message || 'An unexpected error occurred.';
            setError(message); // Sets the error state to display the message.
            toast.error(message); // Display error toast.
        }
    };

    // Tailwind CSS classes for consistent input and label styling.
    const inputStyle =
        'w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-wb-secondary';
    const labelStyle = 'block text-gray-700 text-sm font-bold mb-2';

    // If no user is selected for editing or form data is not initialized, the modal does not render.
    if (!userToEdit || !editFormData) return null;

    return (
        // Modal overlay: fixed position, semi-transparent black background, centered content.
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            {/* Modal content container: white background, padding, rounded corners, shadow, responsive width, scrollable. */}
            <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-sm md:max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
                {/* Modal title. */}
                <h3 className="font-bold text-2xl mb-6 text-wb-primary">
                    Edit User
                </h3>
                {/* User edit form. */}
                <form onSubmit={handleEditSubmit}>
                    {/* Grid layout for form fields, responsive. */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {/* Name input field. */}
                        <div className="md:col-span-2">
                            <label className={labelStyle}>Name</label>
                            <input
                                type="text"
                                name="nama"
                                value={editFormData.nama}
                                onChange={handleEditChange}
                                className={inputStyle}
                                required
                            />
                        </div>
                        {/* Email input field. */}
                        <div>
                            <label className={labelStyle}>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={editFormData.email}
                                onChange={handleEditChange}
                                className={inputStyle}
                                required
                            />
                        </div>
                        {/* Phone Number input field. */}
                        <div>
                            <label className={labelStyle}>Phone Number</label>
                            <input
                                type="text"
                                name="nomorTelepon"
                                value={editFormData.nomorTelepon}
                                onChange={handleEditChange}
                                className={inputStyle}
                                required
                            />
                        </div>
                        {/* Department input field. */}
                        <div className="md:col-span-2">
                            <label className={labelStyle}>Department</label>
                            <input
                                type="text"
                                name="departemen"
                                value={editFormData.departemen}
                                onChange={handleEditChange}
                                className={inputStyle}
                                required
                            />
                        </div>
                        {/* Active User checkbox. */}
                        <div className="md:col-span-2 flex items-center">
                            <input
                                type="checkbox"
                                id="statusAktif"
                                name="statusAktif"
                                checked={editFormData.statusAktif}
                                onChange={handleEditChange}
                                className="h-4 w-4 text-wb-primary focus:ring-wb-secondary border-gray-300 rounded"
                            />
                            <label
                                htmlFor="statusAktif"
                                className="ml-2 block text-sm text-900"
                            >
                                Active User
                            </label>
                        </div>
                    </div>
                    {/* Error message display. */}
                    {error && (
                        <div
                            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4"
                            role="alert"
                        >
                            {error}
                        </div>
                    )}
                    {/* Action buttons: Cancel and Save Changes. */}
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                            onClick={() => setUserToEdit(null)}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-wb-primary text-white rounded-md hover:bg-wb-secondary"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserModal; // Exports the EditUserModal component.
