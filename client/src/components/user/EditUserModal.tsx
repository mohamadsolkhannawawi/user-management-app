// src/components/user/EditUserModal.tsx

import React from 'react';
import { useUser } from '../../context/UserContext';
import { validateEmail, validatePhoneNumber } from '../../utils/validation';
import toast from 'react-hot-toast';
import type { User, UserEditData } from '../../types/user';

// Define User type (should match backend)


interface EditUserModalProps {
    userToEdit: User | null;
    setUserToEdit: (user: User | null) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
    userToEdit,
    setUserToEdit,
}) => {
    const { updateUser } = useUser();
    const [editFormData, setEditFormData] = React.useState<UserEditData | null>(
        null
    );
    const [error, setError] = React.useState<string | null>(null); // Local error state

    React.useEffect(() => {
        if (userToEdit) {
            setError(null); // Clear error when modal opens
            setEditFormData({
                nama: userToEdit.nama,
                email: userToEdit.email,
                nomorTelepon: userToEdit.nomorTelepon,
                departemen: userToEdit.departemen,
                statusAktif: userToEdit.statusAktif,
            });
        }
    }, [userToEdit]);

    const handleEditChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        if (!editFormData) return;
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setEditFormData({ ...editFormData, [name]: checked });
        } else {
            setEditFormData({ ...editFormData, [name]: value });
        }
    };

    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userToEdit || !editFormData) return;

        setError(null); // Clear previous errors

        // Client-side validation
        if (!validateEmail(editFormData.email)) {
            toast.error('Invalid email format.');
            return;
        }

        if (!validatePhoneNumber(editFormData.nomorTelepon)) {
            toast.error('Phone number is invalid. It must be 10-15 digits.');
            return;
        }

        try {
            await updateUser(userToEdit.id, editFormData);
            setUserToEdit(null); // Close modal on success
            setEditFormData(null);
        } catch (err: any) {
            const message = err.response?.data?.message || 'An unexpected error occurred.';
            setError(message);
            // The toast is already handled by the context
        }
    };

    const inputStyle =
        'w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-wb-secondary';
    const labelStyle = 'block text-gray-700 text-sm font-bold mb-2';

    if (!userToEdit || !editFormData) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-sm md:max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
                <h3 className="font-bold text-2xl mb-6 text-wb-primary">
                    Edit User
                </h3>
                <form onSubmit={handleEditSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                                className="ml-2 block text-sm text-gray-900"
                            >
                                Active User
                            </label>
                        </div>
                    </div>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
                            {error}
                        </div>
                    )}
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

export default EditUserModal;
