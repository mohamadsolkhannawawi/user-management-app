// src/components/user/Pagination.tsx
// This file defines the Pagination component, which provides controls for navigating through paginated data.

import React from 'react';

/**
 * @interface PaginationProps
 * @description Defines the props for the Pagination component.
 * @property {number} currentPage - The current active page number.
 * @property {number} totalPages - The total number of available pages.
 * @property {(pageNumber: number) => void} onPageChange - Callback function to be called when the page changes.
 * @property {number} totalItems - The total number of items across all pages.
 * @property {number} itemsPerPage - The number of items displayed per page.
 */
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
    totalItems: number;
    itemsPerPage: number;
}

/**
 * @function Pagination
 * @description A functional React component that renders pagination controls.
 * It displays the current page, total pages, and buttons to navigate to the previous or next page.
 * It also shows the range of items currently displayed.
 * @param {PaginationProps} props - The properties passed to the component.
 */
const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
    itemsPerPage,
}) => {
    // Calculate the index of the last item on the current page.
    const indexOfLastItem = currentPage * itemsPerPage;
    // Calculate the index of the first item on the current page.
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    return (
        // Main container for pagination controls, with responsive layout.
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 space-y-4 md:space-y-0">
            {/* Display showing the range of items currently visible and the total number of items. */}
            <div className="text-gray-600 text-sm">
                Showing {Math.min(indexOfFirstItem + 1, totalItems)} to{' '}
                {Math.min(indexOfLastItem, totalItems)} of {totalItems} users
            </div>
            {/* Container for pagination buttons. */}
            <div className="flex items-center space-x-2">
                {/* Previous page button. Disabled if on the first page. */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                {/* Current page and total pages display. */}
                <span className="px-4 py-2 text-sm font-medium text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                {/* Next page button. Disabled if on the last page. */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination; // Exports the Pagination component.
