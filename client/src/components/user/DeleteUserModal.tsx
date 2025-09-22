// src/components/user/DeleteUserModal.tsx
// This file defines the DeleteUserModal component, a modal dialog for confirming user deletion.
// It interacts with the UserContext to perform the actual deletion.

import React from 'react';
import { useUser } from '../../context/UserContext'; // Imports the useUser hook from UserContext for accessing user-related functions.

import type { User } from '../../types/user'; // Imports the User type definition.

/**
 * @interface DeleteUserModalProps
 * @description Defines the props for the DeleteUserModal component.
 * @property {User | null} userToDelete - The user object to be deleted, or null if no user is selected for deletion.
 * @property {(user: User | null) => void} setUserToDelete - A function to set the user to be deleted (used to open/close the modal).
 */
interface DeleteUserModalProps {
    userToDelete: User | null;
    setUserToDelete: (user: User | null) => void;
}

/**
 * @function DeleteUserModal
 * @description A functional React component that renders a confirmation modal for deleting a user.
 * It takes `userToDelete` and `setUserToDelete` as props to manage its visibility and the user to be acted upon.
 * @param {DeleteUserModalProps} props - The properties passed to the component.
 */
const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
    userToDelete,
    setUserToDelete,
}) => {
    // Destructures the `deleteUser` function from the UserContext.
    const { deleteUser } = useUser();

    /**
     * @async
     * @function handleDelete
     * @description Handles the user deletion process.
     * It calls the `deleteUser` function from the context and closes the modal upon success.
     * Error handling is managed within the UserContext.
     */
    const handleDelete = async () => {
        if (!userToDelete) return; // If no user is selected for deletion, do nothing.
        try {
            await deleteUser(userToDelete.id); // Calls the deleteUser function with the ID of the user to delete.
            setUserToDelete(null); // Closes the modal by setting userToDelete to null.
        } catch (err) {
            // Error handling is primarily done in UserContext, this catch block prevents modal from closing on error.
            console.error('Error during user deletion:', err);
        }
    };

    // If no user is selected for deletion, the modal does not render.
    if (!userToDelete) return null;

    return (
        // Overlay for the modal, covering the entire screen with a semi-transparent black background.
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            {/* Modal content container with styling for background, padding, rounded corners, shadow, and responsiveness. */}
            <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-sm md:max-w-md mx-4 max-h-[90vh] overflow-y-auto">
                {/* Modal title. */}
                <h3 className="font-bold text-lg text-wb-primary">
                    Confirm Deletion
                </h3>
                {/* Confirmation message, displaying the name of the user to be deleted. */}
                <p className="py-4 text-gray-700">
                    Are you sure you want to delete user "{userToDelete.nama}"?
                </p>
                {/* Action buttons for canceling or confirming the deletion. */}
                <div className="flex justify-end space-x-4 mt-4">
                    {/* Cancel button: closes the modal without deleting. */}
                    <button
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                        onClick={() => setUserToDelete(null)}
                    >
                        Cancel
                    </button>
                    {/* Delete button: triggers the handleDelete function. */}
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteUserModal; // Exports the DeleteUserModal component.
