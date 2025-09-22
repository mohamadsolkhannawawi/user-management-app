// src/pages/UserListPage.tsx

import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useUsers } from '../hooks/useUsers';
import UserListToolbar from '../components/user/UserListToolbar';
import UserTable from '../components/user/UserTable';
import EditUserModal from '../components/user/EditUserModal';
import DeleteUserModal from '../components/user/DeleteUserModal';
import Pagination from '../components/user/Pagination';
import type { User } from '../types/user';



const UserListPage = () => {
    const { users, loading, error } = useUser();
    const {
        searchTerm,
        setSearchTerm,
        sortColumn,
        sortOrder,
        handleSort,
        statusFilter,
        setStatusFilter,
        currentPage,
        handlePageChange,
        currentUsers,
        totalPages,
        totalFilteredUsers,
    } = useUsers(10); // 10 users per page

    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);

    const handleOpenEditModal = (user: User) => {
        setUserToEdit(user);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-wb-primary"></div>
            </div>
        );
    }

    // Only show full-page error if loading failed AND we have no users to display
    if (error && users.length === 0) {
        return (
            <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative"
                role="alert"
            >
                {error}
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 bg-wb-base rounded-lg shadow-md min-h-screen">
            <UserListToolbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />

            <UserTable
                users={currentUsers}
                sortColumn={sortColumn}
                sortOrder={sortOrder}
                handleSort={handleSort}
                handleOpenEditModal={handleOpenEditModal}
                setUserToDelete={setUserToDelete}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={totalFilteredUsers}
                itemsPerPage={10}
            />

            <DeleteUserModal
                userToDelete={userToDelete}
                setUserToDelete={setUserToDelete}
            />

            <EditUserModal
                userToEdit={userToEdit}
                setUserToEdit={setUserToEdit}
            />
        </div>
    );
};

export default UserListPage;