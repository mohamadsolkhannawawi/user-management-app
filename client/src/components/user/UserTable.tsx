// src/components/user/UserTable.tsx
// This file defines the UserTable component, responsible for displaying a list of users in a tabular format.
// It includes features for sorting, and actions like editing and deleting users.

import React from 'react';
import {
    Pencil, // Icon for editing.
    Trash2, // Icon for deleting.
    User as UserIcon, // Icon for user name.
    Mail, // Icon for email.
    Hash, // Icon for ID.
    Settings, // Icon for actions.
    UserRoundCheck, // Icon for user status.
    ArrowDownAZ, // Icon for ascending alphabetical sort.
    ArrowDownZA, // Icon for descending alphabetical sort.
    ArrowDown01, // Icon for ascending numerical sort.
    ArrowDown10, // Icon for descending numerical sort.
} from 'lucide-react';

import type { User } from '../../types/user'; // Imports the User type definition.

/**
 * @interface UserTableProps
 * @description Defines the props for the UserTable component.
 * @property {User[]} users - An array of user objects to be displayed in the table.
 * @property {'id' | 'nama'} sortColumn - The column currently being sorted.
 * @property {'asc' | 'desc'} sortOrder - The current sort order ('asc' for ascending, 'desc' for descending).
 * @property {(column: 'id' | 'nama') => void} handleSort - Callback function to handle column sorting.
 * @property {(user: User) => void} handleOpenEditModal - Callback function to open the edit modal for a specific user.
 * @property {(user: User) => void} setUserToDelete - Callback function to set the user to be deleted, opening the delete confirmation modal.
 */
interface UserTableProps {
    users: User[];
    sortColumn: 'id' | 'nama';
    sortOrder: 'asc' | 'desc';
    handleSort: (column: 'id' | 'nama') => void;
    handleOpenEditModal: (user: User) => void;
    setUserToDelete: (user: User) => void;
}

/**
 * @function UserTable
 * @description A functional React component that displays a sortable table of users.
 * It provides actions to edit and delete users, and handles responsive display of user details.
 * @param {UserTableProps} props - The properties passed to the component.
 */
const UserTable: React.FC<UserTableProps> = ({
    users,
    sortColumn,
    sortOrder,
    handleSort,
    handleOpenEditModal,
    setUserToDelete,
}) => {
    return (
        // Main container for the table, providing horizontal scrolling for smaller screens and shadow styling.
        <div className="overflow-x-auto rounded-lg shadow">
            {/* Conditional rendering: if no users, display a message; otherwise, display the table. */}
            {users.length === 0 ? (
                <div className="text-center p-8 bg-white dark:bg-gray-700 rounded-lg">
                    <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">No users yet.</p>
                    <p className="text-gray-500 dark:text-gray-400">Click "Add New User" to get started.</p>
                </div>
            ) : (
                <table className="w-full text-left text-xs md:text-base">
                    {/* Table Header */}
                    <thead className="bg-wb-accent text-wb-primary uppercase text-xs md:text-sm">
                        <tr>
                            {/* ID Column Header with Sort functionality */}
                            <th className="p-3 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                    <Hash size={16} />
                                    <span>ID</span>
                                    <button
                                        onClick={() => handleSort('id')} // Triggers sorting by ID.
                                        className="ml-2"
                                    >
                                        {/* Displays appropriate sort icon based on current sort state. */}
                                        {sortColumn === 'id' ? (
                                            sortOrder === 'asc' ? (
                                                <ArrowDown01 size={16} /> // Ascending numerical sort icon.
                                            ) : (
                                                <ArrowDown10 size={16} /> // Descending numerical sort icon.
                                            )
                                        ) : (
                                            <ArrowDown01
                                                size={16}
                                                className="text-gray-400" // Default sort icon (greyed out).
                                            />
                                        )}
                                    </button>
                                </div>
                            </th>
                            {/* Name Column Header with Sort functionality */}
                            <th className="p-3 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                    <UserIcon size={16} />
                                    <span className="md:hidden">Name & Email</span> {/* Combined for mobile. */}
                                    <span className="hidden md:inline">Name</span> {/* Separate for desktop. */}
                                    <button
                                        onClick={() => handleSort('nama')} // Triggers sorting by name.
                                        className="ml-2"
                                    >
                                        {/* Displays appropriate sort icon based on current sort state. */}
                                        {sortColumn === 'nama' ? (
                                            sortOrder === 'asc' ? (
                                                <ArrowDownAZ size={16} /> // Ascending alphabetical sort icon.
                                            ) : (
                                                <ArrowDownZA size={16} /> // Descending alphabetical sort icon.
                                            )
                                        ) : (
                                            <ArrowDownAZ
                                                size={16}
                                                className="text-gray-400" // Default sort icon (greyed out).
                                            />
                                        )}
                                    </button>
                                </div>
                            </th>
                            {/* Email Column Header - visible only on medium screens and up. */}
                            <th className="p-3 whitespace-nowrap hidden md:table-cell">
                                <div className="flex items-center gap-2">
                                    <Mail size={16} /> Email
                                </div>
                            </th>
                            {/* Status Column Header - visible only on medium screens and up. */}
                            <th className="p-3 whitespace-nowrap hidden md:table-cell">
                                <div className="flex items-center justify-center gap-2">
                                    <UserRoundCheck size={16} /> Status
                                </div>
                            </th>
                            {/* Actions Column Header. */}
                            <th className="p-3 text-center whitespace-nowrap">
                                <div className="flex items-center justify-center gap-2">
                                    <Settings size={16} /> Actions
                                </div>
                            </th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="text-gray-700">
                        {users.map((user, index) => (
                            <tr
                                key={user.id}
                                className={`${
                                    index % 2 === 0 ? 'bg-white' : 'bg-wb-base'
                                } text-xs md:text-sm`} // Alternating row background colors.
                            >
                                {/* User ID. */}
                                <td className="p-3 font-semibold md:align-middle">
                                    {user.id}
                                </td>

                                {/* User Name (and Email for mobile). */}
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

                                {/* User Email - hidden on mobile, visible on medium screens and up. */}
                                <td className="p-3 hidden md:table-cell align-middle">
                                    {user.email}
                                </td>

                                {/* User Status - hidden on mobile, visible on medium screens and up. */}
                                <td className="p-3 hidden md:table-cell text-center align-middle">
                                    <span
                                        className={`px-2 py-1 text-center font-semibold rounded-md text-xs md:text-sm ${
                                            user.statusAktif
                                                ? 'bg-green-200 text-green-800'
                                                : 'bg-gray-200 text-gray-800'
                                        }`} // Styling based on active status.
                                    >
                                        {user.statusAktif ? 'Active' : 'Inactive'}
                                    </span>
                                </td>

                                {/* Actions Column (and Status for mobile). */}
                                <td className="p-3 align-middle">
                                    <div className="flex flex-col items-stretch gap-y-2">
                                        {/* User Status - visible only on mobile. */}
                                        <span
                                            className={`md:hidden px-2 py-1 text-xs font-semibold rounded-md text-center ${
                                                user.statusAktif
                                                    ? 'bg-green-200 text-green-800'
                                                    : 'bg-gray-200 text-gray-800'
                                            }`}
                                        >
                                            {user.statusAktif ? 'Active' : 'Inactive'}
                                        </span>

                                        {/* Action Buttons: Edit and Delete. */}
                                        <div className="flex flex-col md:flex-row items-stretch md:items-center md:justify-center gap-2">
                                            {/* Edit Button. */}
                                            <button
                                                className="flex items-center justify-center gap-2 bg-wb-secondary text-white px-3 py-1.5 rounded-md hover:bg-wb-primary"
                                                onClick={() =>
                                                    handleOpenEditModal(user)
                                                }
                                            >
                                                <Pencil size={14} />
                                                <span>Edit</span>
                                            </button>
                                            {/* Delete Button. */}
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

export default UserTable; // Exports the UserTable component.