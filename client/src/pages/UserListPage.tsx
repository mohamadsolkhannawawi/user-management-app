// src/pages/UserListPage.tsx
// This file defines the UserListPage component, responsible for displaying a list of users
// and providing functionalities for searching, filtering, sorting, editing, and deleting users.

import { useState } from 'react'; // useState hook for managing component-level state.
import { useUser } from '../context/UserContext'; // Custom hook to access user-related data and actions from the UserContext.
import { useUsers } from '../hooks/useUsers'; // Custom hook encapsulating user list logic (search, filter, sort, pagination).
import UserListToolbar from '../components/user/UserListToolbar'; // Component for search input, filter dropdowns, etc.
import UserTable from '../components/user/UserTable'; // Component for displaying the user data in a table format.
import EditUserModal from '../components/user/EditUserModal'; // Modal component for editing user details.
import DeleteUserModal from '../components/user/DeleteUserModal'; // Modal component for confirming user deletion.
import Pagination from '../components/user/Pagination'; // Component for handling pagination of the user list.
import type { User } from '../types/user'; // TypeScript type definition for a User object.

const UserListPage = () => {
    // Destructure user data, loading state, and error from the UserContext.
    const { users, loading, error } = useUser();

    // Destructure various states and handlers from the useUsers custom hook.
    // This hook manages the logic for searching, sorting, filtering, and paginating the user list.
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
    } = useUsers(10); // Initializes the hook with 10 users per page.

    // State to hold the user object that is currently selected for deletion. Null if no user is selected.
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    // State to hold the user object that is currently selected for editing. Null if no user is selected.
    const [userToEdit, setUserToEdit] = useState<User | null>(null);

    // Handler function to set the user to be edited and open the EditUserModal.
    const handleOpenEditModal = (user: User) => {
        setUserToEdit(user);
    };

    // Displays a loading spinner while user data is being fetched.
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-wb-primary"></div>
            </div>
        );
    }

    // Displays a full-page error message if there's an error and no users could be loaded.
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
        // Main container for the user list page, applying padding, background, rounded corners, and shadow.
        <div className="p-4 md:p-8 bg-wb-base rounded-lg shadow-md min-h-screen">
            {/* Toolbar for searching and filtering the user list. */}
            <UserListToolbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />

            {/* Table displaying the current page of users. */}
            <UserTable
                users={currentUsers}
                sortColumn={sortColumn}
                sortOrder={sortOrder}
                handleSort={handleSort}
                handleOpenEditModal={handleOpenEditModal}
                setUserToDelete={setUserToDelete}
            />

            {/* Pagination controls for navigating through the user list. */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={totalFilteredUsers}
                itemsPerPage={10}
            />

            {/* Modal for confirming user deletion. Only visible when `userToDelete` is set. */}
            <DeleteUserModal
                userToDelete={userToDelete}
                setUserToDelete={setUserToDelete}
            />

            {/* Modal for editing user details. Only visible when `userToEdit` is set. */}
            <EditUserModal
                userToEdit={userToEdit}
                setUserToEdit={setUserToEdit}
            />
        </div>
    );
};

export default UserListPage;
