// src/components/user/DeleteUserModal.tsx

import React from 'react';
import { useUser } from '../../context/UserContext';

import type { User } from '../../types/user';

// Define User type (should match backend)


interface DeleteUserModalProps {
    userToDelete: User | null;
    setUserToDelete: (user: User | null) => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
    userToDelete,
    setUserToDelete,
}) => {
    const { deleteUser } = useUser();

    const handleDelete = async () => {
        if (!userToDelete) return;
        try {
            await deleteUser(userToDelete.id);
            setUserToDelete(null); // Close modal on success
        } catch (err) {
            // Error handling is done in UserContext, just catch and prevent modal close
            console.error('Error during user deletion:', err);
        }
    };

    if (!userToDelete) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-sm md:max-w-md mx-4 max-h-[90vh] overflow-y-auto">
                <h3 className="font-bold text-lg text-wb-primary">
                    Confirm Deletion
                </h3>
                <p className="py-4 text-gray-700">
                    Are you sure you want to delete user "{userToDelete.nama}"?
                </p>
                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                        onClick={() => setUserToDelete(null)}
                    >
                        Cancel
                    </button>
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

export default DeleteUserModal;
