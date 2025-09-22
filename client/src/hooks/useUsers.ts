// src/hooks/useUsers.ts

import { useState, useMemo } from 'react';
import { useUser } from '../context/UserContext';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { User } from '../types/user';



export const useUsers = (usersPerPage: number = 10) => {
    const { users } = useUser();

    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState<'id' | 'nama'>('id');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [statusFilter, setStatusFilter] = useState<
        'all' | 'active' | 'inactive'
    >('all');
    const [currentPage, setCurrentPage] = useState(1);

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
                const matchesSearch = user.nama
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

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
                    return isAsc ? a.id - b.id : b.id - a.id;
                }
            });
    }, [users, searchTerm, statusFilter, sortOrder, sortColumn]);

    const totalPages = Math.ceil(filteredAndSortedUsers.length / usersPerPage);

    const currentUsers = useMemo(() => {
        const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;
        return filteredAndSortedUsers.slice(indexOfFirstUser, indexOfLastUser);
    }, [filteredAndSortedUsers, currentPage, usersPerPage]);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

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
