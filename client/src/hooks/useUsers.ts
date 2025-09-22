// src/hooks/useUsers.ts
// This file defines the `useUsers` custom React hook, which encapsulates the logic for filtering, sorting,
// and paginating user data. It leverages the `UserContext` for accessing the global user state.

import { useState, useMemo } from 'react'; // Imports React hooks for state management and memoization.
import { useUser } from '../context/UserContext'; // Imports the custom hook to access user context.
import type { User } from '../types/user'; // Imports the User type definition.

/**
 * @function useUsers
 * @description A custom React hook for managing user data, including searching, sorting, and pagination.
 * It consumes the `UserContext` to get the raw list of users.
 * @param {number} usersPerPage - The number of users to display per page. Defaults to 10.
 * @returns {object} An object containing state and functions for user list management.
 */
export const useUsers = (usersPerPage: number = 10) => {
    // Access the global list of users from the UserContext.
    const { users } = useUser();

    // State for the search term entered by the user.
    const [searchTerm, setSearchTerm] = useState('');
    // State for the column currently being sorted ('id' or 'nama').
    const [sortColumn, setSortColumn] = useState<'id' | 'nama'>('id');
    // State for the sort order ('asc' for ascending, 'desc' for descending).
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    // State for filtering users by their active status.
    const [statusFilter, setStatusFilter] = useState<
        'all' | 'active' | 'inactive'
    >('all');
    // State for the current active page in pagination.
    const [currentPage, setCurrentPage] = useState(1);

    /**
     * @function handleSort
     * @description Toggles the sort order for a given column or sets it to ascending if a new column is selected.
     * @param {'id' | 'nama'} column - The column to sort by.
     */
    const handleSort = (column: 'id' | 'nama') => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    /**
     * @constant filteredAndSortedUsers
     * @description Memoized array of users after applying search, status filter, and sorting.
     * This re-calculates only when `users`, `searchTerm`, `statusFilter`, `sortOrder`, or `sortColumn` changes.
     */
    const filteredAndSortedUsers = useMemo(() => {
        return users
            .filter((user) => {
                // Filter by search term (case-insensitive).
                const matchesSearch = user.nama
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

                // Filter by status (all, active, inactive).
                const matchesStatus = (() => {
                    if (statusFilter === 'all') return true;
                    if (statusFilter === 'active') return user.statusAktif;
                    if (statusFilter === 'inactive') return !user.statusAktif;
                    return true; // Should not be reached if statusFilter is one of the defined types.
                })();

                return matchesSearch && matchesStatus;
            })
            .sort((a, b) => {
                const isAsc = sortOrder === 'asc';
                // Sort by name (case-insensitive).
                if (sortColumn === 'nama') {
                    const nameA = a.nama.toLowerCase();
                    const nameB = b.nama.toLowerCase();
                    if (nameA < nameB) return isAsc ? -1 : 1;
                    if (nameA > nameB) return isAsc ? 1 : -1;
                    return 0;
                } else {
                    // Sort by ID (numerical).
                    return isAsc ? a.id - b.id : b.id - a.id;
                }
            });
    }, [users, searchTerm, statusFilter, sortOrder, sortColumn]);

    // Calculate the total number of pages required for pagination.
    const totalPages = Math.ceil(filteredAndSortedUsers.length / usersPerPage);

    /**
     * @constant currentUsers
     * @description Memoized array of users for the current page.
     * This re-calculates only when `filteredAndSortedUsers`, `currentPage`, or `usersPerPage` changes.
     */
    const currentUsers = useMemo(() => {
        const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;
        return filteredAndSortedUsers.slice(indexOfFirstUser, indexOfLastUser);
    }, [filteredAndSortedUsers, currentPage, usersPerPage]);

    /**
     * @function handlePageChange
     * @description Updates the current page number.
     * @param {number} pageNumber - The new page number to navigate to.
     */
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // Returns all necessary state and functions for managing the user list.
    return {
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
        totalFilteredUsers: filteredAndSortedUsers.length,
    };
};