// src/pages/UserListPage.tsx

import { useState, useEffect } from 'react';
import axios from 'axios';

// Defines the shape of a User object
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

const UserListPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState(''); // State for the search input

    useEffect(() => {
        // Fetches user data from the API when the component mounts
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

    // Filter users based on the search term before rendering
    const filteredUsers = users.filter((user) =>
        user.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div role="alert" className="alert alert-error">
                {error}
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">User List</h1>
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search by name..."
                    className="input input-bordered w-full max-w-xs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Departemen</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map over the FILTERED user list */}
                        {filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <th>{user.id}</th>
                                <td>{user.nama}</td>
                                <td>{user.email}</td>
                                <td>{user.departemen}</td>
                                <td>
                                    <span
                                        className={`badge ${user.statusAktif ? 'badge-success' : 'badge-ghost'}`}
                                    >
                                        {user.statusAktif
                                            ? 'Aktif'
                                            : 'Non-Aktif'}
                                    </span>
                                </td>
                                <td className="space-x-2">
                                    <button className="btn btn-sm btn-info">
                                        Edit
                                    </button>
                                    <button className="btn btn-sm btn-error">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserListPage;
