// src/pages/UserListPage.tsx

import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
    Pencil,
    Trash2,
    User,
    Mail,
    Hash,
    Settings,
    UserRoundCheck,
    Search as UserSearch,
    X,
    ArrowDownAZ,
    ArrowDownZA,
    ListFilter,
    ArrowDown01,
    ArrowDown10,
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

// Define a type for the editable fields, now including statusAktif
type UserEditData = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

const UserListPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);
    const [editFormData, setEditFormData] = useState<UserEditData | null>(null);

    // New states for sorting and filtering
    const [sortColumn, setSortColumn] = useState<'id' | 'nama'>('id');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [statusFilter, setStatusFilter] = useState<
        'all' | 'active' | 'inactive'
    >('all');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10); // Number of users per page

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

    const handleSort = (column: 'id' | 'nama') => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    const filteredAndSortedUsers = useMemo(() => {
        return users
            .filter((user) => {
                // Search term filter
                const matchesSearch = user.nama
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

                // Status filter
                const matchesStatus = (() => {
                    if (statusFilter === 'all') return true;
                    if (statusFilter === 'active') return user.statusAktif;
                    if (statusFilter === 'inactive') return !user.statusAktif;
                    return true;
                })();

                return matchesSearch && matchesStatus;
            })
            .sort((a, b) => {
                const isAsc = sortOrder === 'asc';
                if (sortColumn === 'nama') {
                    const nameA = a.nama.toLowerCase();
                    const nameB = b.nama.toLowerCase();
                    if (nameA < nameB) return isAsc ? -1 : 1;
                    if (nameA > nameB) return isAsc ? 1 : -1;
                    return 0;
                } else {
                    // sort by ID
                    return isAsc ? a.id - b.id : b.id - a.id;
                }
            });
    }, [users, searchTerm, statusFilter, sortOrder, sortColumn]);

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredAndSortedUsers.slice(
        indexOfFirstUser,
        indexOfLastUser
    );
    const totalPages = Math.ceil(filteredAndSortedUsers.length / usersPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

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
        // Include statusAktif in the form data
        setEditFormData({
            nama: user.nama,
            email: user.email,
            nomorTelepon: user.nomorTelepon,
            departemen: user.departemen,
            statusAktif: user.statusAktif,
        });
    };

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

        try {
            const response = await axios.put(
                `http://localhost:5001/api/users/${userToEdit.id}`,
                editFormData // This now includes statusAktif
            );
            const updatedUser = response.data;

            setUsers(
                users.map((user) =>
                    user.id === updatedUser.id ? updatedUser : user
                )
            );

            toast.success(`User "${updatedUser.nama}" updated successfully!`);
            setUserToEdit(null);
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
        <div className="p-4 md:p-8 bg-wb-base rounded-lg shadow-md min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h1 className="text-3xl font-bold text-wb-primary self-start">
                    User List
                </h1>
                <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
                    {/* Status Filter Dropdown */}
                    <div className="relative inline-block text-left w-full sm:w-auto">
                        <div>
                            <button
                                type="button"
                                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-3 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wb-secondary"
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                            >
                                <ListFilter size={18} className="mr-2" />
                                Filter
                            </button>
                        </div>
                        {isFilterOpen && (
                            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                <div
                                    className="py-1"
                                    role="menu"
                                    aria-orientation="vertical"
                                >
                                    <a
                                        href="#"
                                        className={`block px-4 py-2 text-sm ${statusFilter === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setStatusFilter('all');
                                            setIsFilterOpen(false);
                                        }}
                                    >
                                        All Statuses
                                    </a>
                                    <a
                                        href="#"
                                        className={`block px-4 py-2 text-sm ${statusFilter === 'active' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setStatusFilter('active');
                                            setIsFilterOpen(false);
                                        }}
                                    >
                                        Active
                                    </a>
                                    <a
                                        href="#"
                                        className={`block px-4 py-2 text-sm ${statusFilter === 'inactive' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setStatusFilter('inactive');
                                            setIsFilterOpen(false);
                                        }}
                                    >
                                        Inactive
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full sm:w-auto md:w-64">
                        <input
                            type="text"
                            placeholder="Search by name..."
                            className="w-full p-3 pr-12 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-wb-secondary"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-2">
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="text-gray-400 hover:text-gray-600"
                                    type="button"
                                >
                                    <X size={18} />
                                </button>
                            )}
                            <UserSearch
                                className="text-gray-400 pointer-events-none"
                                size={18}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg shadow">
                <table className="w-full text-left text-xs md:text-base">
                    <thead className="bg-wb-accent text-wb-primary uppercase text-xs md:text-sm">
                        <tr>
                            <th className="p-3 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                    <Hash size={16} />
                                    <span>ID</span>
                                    <button
                                        onClick={() => handleSort('id')}
                                        className="ml-2"
                                    >
                                        {sortColumn === 'id' ? (
                                            sortOrder === 'asc' ? (
                                                <ArrowDown01 size={16} />
                                            ) : (
                                                <ArrowDown10 size={16} />
                                            )
                                        ) : (
                                            <ArrowDown01
                                                size={16}
                                                className="text-gray-400"
                                            />
                                        )}
                                    </button>
                                </div>
                            </th>
                            <th className="p-3 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                    <User size={16} />
                                    <span className="md:hidden">
                                        Name & Email
                                    </span>
                                    <span className="hidden md:inline">
                                        Name
                                    </span>
                                    <button
                                        onClick={() => handleSort('nama')}
                                        className="ml-2"
                                    >
                                        {sortColumn === 'nama' ? (
                                            sortOrder === 'asc' ? (
                                                <ArrowDownAZ size={16} />
                                            ) : (
                                                <ArrowDownZA size={16} />
                                            )
                                        ) : (
                                            <ArrowDownAZ
                                                size={16}
                                                className="text-gray-400"
                                            />
                                        )}
                                    </button>
                                </div>
                            </th>
                            <th className="p-3 whitespace-nowrap hidden md:table-cell">
                                <div className="flex items-center gap-2">
                                    <Mail size={16} /> Email
                                </div>
                            </th>
                            {/* Status hanya muncul di md ke atas */}
                            <th className="p-3 whitespace-nowrap hidden md:table-cell">
                                <div className="flex items-center justify-center gap-2">
                                    <UserRoundCheck size={16} /> Status
                                </div>
                            </th>
                            <th className="p-3 text-center whitespace-nowrap">
                                <div className="flex items-center justify-center gap-2">
                                    <Settings size={16} /> Actions
                                </div>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="text-gray-700">
                        {currentUsers.map((user, index) => (
                            <tr
                                key={user.id}
                                className={`${index % 2 === 0 ? 'bg-white' : 'bg-wb-base'} text-xs md:text-sm`}
                            >
                                <td className="p-3 font-semibold md:align-middle">
                                    {user.id}
                                </td>

                                <td className="p-3 md:align-middle">
                                    <div className="flex flex-col justify-center md:block">
                                        <span className="font-semibold">
                                            {user.nama}
                                        </span>
                                        <span className="text-gray-500 md:hidden">
                                            {user.email}
                                        </span>
                                    </div>
                                </td>

                                <td className="p-3 hidden md:table-cell align-middle">
                                    {user.email}
                                </td>

                                {/* Status hanya md ke atas */}
                                <td className="p-3 hidden md:table-cell text-center align-middle">
                                    <span
                                        className={`px-2 py-1 text-center font-semibold rounded-md text-xs md:text-sm ${
                                            user.statusAktif
                                                ? 'bg-green-200 text-green-800'
                                                : 'bg-gray-200 text-gray-800'
                                        }`}
                                    >
                                        {user.statusAktif
                                            ? 'Active'
                                            : 'Inactive'}
                                    </span>
                                </td>

                                {/* Aksi + Status untuk mobile */}
                                <td className="p-3 align-middle">
                                    <div className="flex flex-col items-stretch gap-y-2">
                                        {/* Status tampil di mobile */}
                                        <span
                                            className={`md:hidden px-2 py-1 text-xs font-semibold rounded-md text-center ${
                                                user.statusAktif
                                                    ? 'bg-green-200 text-green-800'
                                                    : 'bg-gray-200 text-gray-800'
                                            }`}
                                        >
                                            {user.statusAktif
                                                ? 'Active'
                                                : 'Inactive'}
                                        </span>

                                        {/* Tombol aksi */}
                                        <div className="flex flex-col md:flex-row items-stretch md:items-center md:justify-center gap-2">
                                            <button
                                                className="flex items-center justify-center gap-2 bg-wb-secondary text-white px-3 py-1.5 rounded-md hover:bg-wb-primary"
                                                onClick={() =>
                                                    handleOpenEditModal(user)
                                                }
                                            >
                                                <Pencil size={14} />
                                                <span>Edit</span>
                                            </button>
                                            <button
                                                className="flex items-center justify-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600"
                                                onClick={() =>
                                                    setUserToDelete(user)
                                                }
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

            {/* Pagination Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-6 space-y-4 md:space-y-0">
                <div className="text-gray-600 text-sm">
                    Showing {indexOfFirstUser + 1} to{' '}
                    {Math.min(indexOfLastUser, filteredAndSortedUsers.length)}{' '}
                    of {filteredAndSortedUsers.length} users
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2 text-sm font-medium text-gray-700">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {userToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-sm md:max-w-md mx-4 max-h-[90vh] overflow-y-auto">
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
                                    <label className={labelStyle}>
                                        Phone Number
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
                                <div className="md:col-span-2">
                                    <label className={labelStyle}>
                                        Department
                                    </label>
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
