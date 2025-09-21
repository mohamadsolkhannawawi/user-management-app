// src/pages/UserListPage.tsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
    Pencil,
    Trash2,
    User,
    Mail,
    Hash,
    Building,
    Settings,
} from 'lucide-react';

type User = {
    id: number;
    nama: string;
    email: string;
    nomorTelepon: string;
    departemen: string;
    statusAktif: boolean;
    createdAt: string;
    updatedAt: string;
};

// Define a type for the editable fields
type UserEditData = Omit<
    User,
    'id' | 'statusAktif' | 'createdAt' | 'updatedAt'
>;

const UserListPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);
    const [editFormData, setEditFormData] = useState<UserEditData | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    'http://localhost:5001/api/users'
                );
                setUsers(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch users. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const filteredUsers = users.filter((user) =>
        user.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // --- DELETE LOGIC ---
    const handleDelete = async () => {
        if (!userToDelete) return;
        try {
            await axios.delete(
                `http://localhost:5001/api/users/${userToDelete.id}`
            );
            setUsers(users.filter((user) => user.id !== userToDelete.id));
            toast.success(`User "${userToDelete.nama}" deleted successfully!`);
        } catch (err) {
            toast.error('Failed to delete user.');
            console.error(err);
        } finally {
            setUserToDelete(null);
        }
    };

    // --- EDIT LOGIC ---
    const handleOpenEditModal = (user: User) => {
        setUserToEdit(user);
        setEditFormData({
            nama: user.nama,
            email: user.email,
            nomorTelepon: user.nomorTelepon,
            departemen: user.departemen,
        });
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editFormData) return;
        setEditFormData({
            ...editFormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userToEdit || !editFormData) return;

        try {
            const response = await axios.put(
                `http://localhost:5001/api/users/${userToEdit.id}`,
                editFormData
            );
            const updatedUser = response.data;

            // Update the user in the list
            setUsers(
                users.map((user) =>
                    user.id === updatedUser.id ? updatedUser : user
                )
            );

            toast.success(`User "${updatedUser.nama}" updated successfully!`);
            setUserToEdit(null); // Close modal
            setEditFormData(null);
        } catch (err) {
            toast.error('Failed to update user.');
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-wb-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative"
                role="alert"
            >
                {error}
            </div>
        );
    }

    const inputStyle =
        'w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-wb-secondary';
    const labelStyle = 'block text-gray-700 text-sm font-bold mb-2';

    return (
        <div className="p-8 bg-wb-base rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h1 className="text-3xl font-bold text-wb-primary">
                    User List
                </h1>
                <input
                    type="text"
                    placeholder="Search by name..."
                    className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-wb-secondary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto rounded-lg shadow">
                <table className="w-full text-left text-xs md:text-base">
                    <thead className="bg-wb-accent text-wb-primary uppercase text-xs md:text-sm">
                        <tr>
                            <th className="p-3 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                    <Hash size={16} /> ID
                                </div>
                            </th>
                            <th className="p-3 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                    <User size={16} />
                                    <span className="md:hidden">
                                        Nama & Email
                                    </span>
                                    <span className="hidden md:inline">
                                        Nama
                                    </span>
                                </div>
                            </th>
                            <th className="p-3 whitespace-nowrap hidden md:table-cell">
                                <div className="flex items-center gap-2">
                                    <Mail size={16} /> Email
                                </div>
                            </th>
                            <th className="p-3 whitespace-nowrap hidden md:table-cell">
                                <div className="flex items-center justify-center gap-2">
                                    <Settings size={16} /> Status
                                </div>
                            </th>
                            <th className="p-3 text-center whitespace-nowrap">
                                <div className="flex items-center justify-center gap-2">
                                    <Settings size={16} /> Aksi
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {filteredUsers.map((user, index) => (
                            <tr
                                key={user.id}
                                className={`${index % 2 === 0 ? 'bg-white' : 'bg-wb-base'} text-xs md:text-sm`}
                            >
                                <td className="p-3 font-semibold md:align-middle">{user.id}</td>
                                <td className="p-3 align-top md:align-middle">
                                    <div className="font-semibold">{user.nama}</div>
                                    <div className="text-gray-500 md:hidden">{user.email}</div>
                                </td>
                                <td className="p-3 hidden md:table-cell align-middle">{user.email}</td>
                                <td className="p-3 hidden md:table-cell text-center align-middle">
                                    <span
                                        className={`px-3 py-1.5 text-center font-semibold rounded-md ${
                                            user.statusAktif
                                                ? 'bg-green-200 text-green-800'
                                                : 'bg-gray-200 text-gray-800'
                                        }`}
                                    >
                                        {user.statusAktif ? 'Aktif' : 'Non-Aktif'}
                                    </span>
                                </td>
                                <td className="p-3 align-middle">
                                    <div className="flex flex-col items-stretch gap-y-2">
                                        {/* On small screens, show status here */}
                                        <span
                                            className={`md:hidden px-3 py-1.5 text-center font-semibold rounded-md ${
                                                user.statusAktif
                                                    ? 'bg-green-200 text-green-800'
                                                    : 'bg-gray-200 text-gray-800'
                                            }`}
                                        >
                                            {user.statusAktif ? 'Aktif' : 'Non-Aktif'}
                                        </span>
                                        <div className="flex flex-col md:flex-row items-stretch md:items-center md:justify-center gap-2">
                                            <button 
                                                className="flex items-center justify-center gap-2 bg-wb-secondary text-white px-3 py-1.5 rounded-md hover:bg-wb-primary"
                                                onClick={() => handleOpenEditModal(user)}
                                            >
                                                <Pencil size={14} />
                                                <span>Edit</span>
                                            </button>
                                            <button
                                                className="flex items-center justify-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600"
                                                onClick={() => setUserToDelete(user)}
                                            >
                                                <Trash2 size={14} />
                                                <span>Delete</span>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Confirmation Modal */}
            {userToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full">
                        <h3 className="font-bold text-lg text-wb-primary">
                            Confirm Deletion
                        </h3>
                        <p className="py-4 text-gray-700">
                            Are you sure you want to delete user "
                            {userToDelete.nama}"?
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
            )}

            {/* Edit User Modal */}
            {userToEdit && editFormData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full">
                        <h3 className="font-bold text-2xl mb-6 text-wb-primary">
                            Edit User
                        </h3>
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                                <label className={labelStyle}>Nama</label>
                                <input
                                    type="text"
                                    name="nama"
                                    value={editFormData.nama}
                                    onChange={handleEditChange}
                                    className={inputStyle}
                                    required
                                />
                            </div>
                            <div className="mb-4">
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
                            <div className="mb-4">
                                <label className={labelStyle}>
                                    Nomor Telepon
                                </label>
                                <input
                                    type="text"
                                    name="nomorTelepon"
                                    value={editFormData.nomorTelepon}
                                    onChange={handleEditChange}
                                    className={inputStyle}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className={labelStyle}>Departemen</label>
                                <input
                                    type="text"
                                    name="departemen"
                                    value={editFormData.departemen}
                                    onChange={handleEditChange}
                                    className={inputStyle}
                                    required
                                />
                            </div>
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
            )}
        </div>
    );
};

export default UserListPage;
