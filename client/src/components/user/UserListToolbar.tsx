// src/components/user/UserListToolbar.tsx
// This file defines the UserListToolbar component, which provides search and filter functionalities for the user list.

import React from 'react';
import { Search as UserSearch, X, ListFilter } from 'lucide-react'; // Imports icons for search, clear, and filter.

/**
 * @interface UserListToolbarProps
 * @description Defines the props for the UserListToolbar component.
 * @property {string} searchTerm - The current search term entered by the user.
 * @property {(term: string) => void} setSearchTerm - Function to update the search term.
 * @property {'all' | 'active' | 'inactive'} statusFilter - The current filter for user status.
 * @property {(filter: 'all' | 'active' | 'inactive') => void} setStatusFilter - Function to update the status filter.
 */
interface UserListToolbarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    statusFilter: 'all' | 'active' | 'inactive';
    setStatusFilter: (filter: 'all' | 'active' | 'inactive') => void;
}

/**
 * @function UserListToolbar
 * @description A functional React component that provides a toolbar for the user list.
 * It includes a search input and a dropdown filter for user status.
 * @param {UserListToolbarProps} props - The properties passed to the component.
 */
const UserListToolbar: React.FC<UserListToolbarProps> = ({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
}) => {
    // State to control the visibility of the status filter dropdown.
    const [isFilterOpen, setIsFilterOpen] = React.useState(false);

    return (
        // Main container for the toolbar, with responsive layout for alignment and spacing.
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            {/* Page title for the User List. */}
            <h1 className="text-3xl font-bold text-wb-primary self-start">
                User List
            </h1>
            {/* Container for search and filter controls, with responsive layout. */}
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
                {/* Status Filter Dropdown Section. */}
                <div className="relative inline-block text-left w-full sm:w-auto">
                    <div>
                        {/* Button to toggle the filter dropdown visibility. */}
                        <button
                            type="button"
                            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-3 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wb-secondary"
                            onClick={() => setIsFilterOpen(!isFilterOpen)} // Toggles the dropdown.
                        >
                            <ListFilter size={18} className="mr-2" /> {/* Filter icon. */}
                            Filter
                        </button>
                    </div>
                    {/* Filter Dropdown Content - conditionally rendered based on `isFilterOpen` state. */}
                    {isFilterOpen && (
                        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                            <div
                                className="py-1"
                                role="menu"
                                aria-orientation="vertical"
                            >
                                {/* Option to filter by All Statuses. */}
                                <a
                                    href="#"
                                    className={`block px-4 py-2 text-sm ${
                                        statusFilter === 'all'
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700'
                                    }`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setStatusFilter('all'); // Sets filter to 'all'.
                                        setIsFilterOpen(false); // Closes dropdown.
                                    }}
                                >
                                    All Statuses
                                </a>
                                {/* Option to filter by Active users. */}
                                <a
                                    href="#"
                                    className={`block px-4 py-2 text-sm ${
                                        statusFilter === 'active'
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700'
                                    }`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setStatusFilter('active'); // Sets filter to 'active'.
                                        setIsFilterOpen(false); // Closes dropdown.
                                    }}
                                >
                                    Active
                                </a>
                                {/* Option to filter by Inactive users. */}
                                <a
                                    href="#"
                                    className={`block px-4 py-2 text-sm ${
                                        statusFilter === 'inactive'
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700'
                                    }`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setStatusFilter('inactive'); // Sets filter to 'inactive'.
                                        setIsFilterOpen(false); // Closes dropdown.
                                    }}
                                >
                                    Inactive
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                {/* Search Input Section. */}
                <div className="relative w-full sm:w-auto md:w-64">
                    {/* Input field for searching users by name. */}
                    <input
                        type="text"
                        placeholder="Search by name..."
                        className="w-full p-3 pr-12 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-wb-secondary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Updates the search term state.
                    />
                    {/* Container for search and clear icons. */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-2">
                        {/* Clear search button - conditionally rendered if searchTerm is not empty. */}
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="text-gray-400 hover:text-gray-600"
                                type="button"
                            >
                                <X size={18} /> {/* Clear icon. */}
                            </button>
                        )}
                        <UserSearch
                            className="text-gray-400 pointer-events-none" // Search icon, not interactive.
                            size={18}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserListToolbar; // Exports the UserListToolbar component.
