// src/components/user/UserListToolbar.tsx

import React from 'react';
import { Search as UserSearch, X, ListFilter } from 'lucide-react';

interface UserListToolbarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    statusFilter: 'all' | 'active' | 'inactive';
    setStatusFilter: (filter: 'all' | 'active' | 'inactive') => void;
}

const UserListToolbar: React.FC<UserListToolbarProps> = ({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
}) => {
    const [isFilterOpen, setIsFilterOpen] = React.useState(false);

    return (
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
                                    className={`block px-4 py-2 text-sm ${
                                        statusFilter === 'all'
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700'
                                    }`}
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
                                    className={`block px-4 py-2 text-sm ${
                                        statusFilter === 'active'
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700'
                                    }`}
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
                                    className={`block px-4 py-2 text-sm ${
                                        statusFilter === 'inactive'
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700'
                                    }`}
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
    );
};

export default UserListToolbar;
