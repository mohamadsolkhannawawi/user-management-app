// src/components/user/UserTable.tsx

import React from 'react';
import {
    Pencil,
    Trash2,
    User as UserIcon,
    Mail,
    Hash,
    Settings,
    UserRoundCheck,
    ArrowDownAZ,
    ArrowDownZA,
    ArrowDown01,
    ArrowDown10,
} from 'lucide-react';



interface UserTableProps {
    users: User[];
    sortColumn: 'id' | 'nama';
    sortOrder: 'asc' | 'desc';
    handleSort: (column: 'id' | 'nama') => void;
    handleOpenEditModal: (user: User) => void;
    setUserToDelete: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({
    users,
    sortColumn,
    sortOrder,
    handleSort,
    handleOpenEditModal,
    setUserToDelete,
}) => {
    return (
        <div className="overflow-x-auto rounded-lg shadow">
            {users.length === 0 ? (
                <div className="text-center p-8 bg-white dark:bg-gray-700 rounded-lg">
                    <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">No users yet.</p>
                    <p className="text-gray-500 dark:text-gray-400">Click "Add New User" to get started.</p>
                </div>
            ) : (
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
                                    <UserIcon size={16} />
                                    <span className="md:hidden">Name & Email</span>
                                    <span className="hidden md:inline">Name</span>
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
                        {users.map((user, index) => (
                            <tr
                                key={user.id}
                                className={`${
                                    index % 2 === 0 ? 'bg-white' : 'bg-wb-base'
                                } text-xs md:text-sm`}
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
                                        {user.statusAktif ? 'Active' : 'Inactive'}
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
                                            {user.statusAktif ? 'Active' : 'Inactive'}
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
            )}
        </div>
    );
};

export default UserTable;