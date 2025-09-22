// src/context/UserContext.tsx
// This file defines the UserContext and UserProvider for global state management related to users.
// It centralizes user data fetching, creation, updating, and deletion, along with managing loading and error states.

import React, {
    createContext, // Used to create a Context object.
    useState, // React Hook for adding state to functional components.
    useEffect, // React Hook for side effects in functional components.
    useContext, // React Hook for consuming context.
    ReactNode, // Type for React children.
} from 'react';
import * as userService from '../api/userService'; // Imports all functions from the userService API.
import toast from 'react-hot-toast'; // Imports the toast notification library.
import axios from 'axios'; // Imports Axios for HTTP request error handling.
import type { User, UserFormData } from '../types/user'; // Imports TypeScript types for User and UserFormData.

/**
 * @interface UserContextType
 * @description Defines the shape of the UserContext's value.
 * @property {User[]} users - An array of user objects.
 * @property {boolean} loading - Indicates if data is currently being fetched.
 * @property {string | null} error - Stores any error message, or null if no error.
 * @property {() => Promise<void>} fetchUsers - Function to fetch all users.
 * @property {(userData: UserFormData) => Promise<void>} addUser - Function to add a new user.
 * @property {(id: number, userData: UserFormData) => Promise<void>} updateUser - Function to update an existing user.
 * @property {(id: number) => Promise<void>} deleteUser - Function to delete a user.
 */
interface UserContextType {
    users: User[];
    loading: boolean;
    error: string | null;
    fetchUsers: () => Promise<void>;
    addUser: (userData: UserFormData) => Promise<void>;
    updateUser: (id: number, userData: UserFormData) => Promise<void>;
    deleteUser: (id: number) => Promise<void>;
}

// Creates the UserContext with an initial undefined value.
const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * @interface UserProviderProps
 * @description Defines the props for the UserProvider component.
 * @property {ReactNode} children - The child components that will consume the context.
 */
interface UserProviderProps {
    children: ReactNode;
}

/**
 * @function UserProvider
 * @description A functional React component that provides user-related state and functions to its children.
 * It manages the `users` array, `loading` status, and `error` messages.
 * @param {UserProviderProps} { children } - The children components to be wrapped by the provider.
 */
export const UserProvider = ({ children }: UserProviderProps) => {
    // State for storing the list of users.
    const [users, setUsers] = useState<User[]>([]);
    // State for indicating if an asynchronous operation is in progress.
    const [loading, setLoading] = useState<boolean>(true);
    // State for storing any error messages.
    const [error, setError] = useState<string | null>(null);

    /**
     * @async
     * @function fetchUsers
     * @description Fetches all users from the API and updates the `users` state.
     * Manages `loading` and `error` states during the fetch operation.
     */
    const fetchUsers = async () => {
        setLoading(true); // Set loading to true before fetching.
        setError(null); // Clear any previous errors.
        try {
            const data = await userService.getUsers(); // Call the API to get users.
            setUsers(data); // Update the users state with fetched data.
        } catch (err) {
            console.error('Failed to fetch users:', err);
            setError('Failed to fetch users. Please try again later.'); // Set a user-friendly error message.
            toast.error('Failed to fetch users.'); // Display a toast notification for the error.
        } finally {
            setLoading(false); // Set loading to false after fetching, regardless of success or failure.
        }
    };

    /**
     * @async
     * @function addUser
     * @description Adds a new user to the database via the API and updates the `users` state.
     * Handles success and error notifications.
     * @param {UserFormData} userData - The data for the new user.
     */
    const addUser = async (userData: UserFormData) => {
        setError(null); // Clear any previous errors.
        try {
            const newUser = await userService.addUser(userData); // Call the API to add a user.
            setUsers((prevUsers) => [...prevUsers, newUser]); // Add the new user to the existing list.
            toast.success('User added successfully!'); // Display a success toast.
        } catch (err: unknown) {
            console.error(err);
            let errorMessage = 'Failed to add user. Please check your input.';
            // Check if the error is an Axios error and extract a more specific message.
            if (axios.isAxiosError(err) && err.response) {
                if (
                    err.response.data.message &&
                    err.response.data.message
                        .toLowerCase()
                        .includes('email already in use')
                ) {
                    errorMessage =
                        'Email already in use, please use another email.';
                } else {
                    errorMessage = err.response?.data?.message || errorMessage;
                }
            }
            setError(errorMessage); // Set error for the form.
            toast.error(errorMessage); // Display an error toast.
            throw err; // Re-throw the error to allow components to handle it if necessary.
        }
    };

    /**
     * @async
     * @function updateUser
     * @description Updates an existing user's information via the API and updates the `users` state.
     * Handles success and error notifications.
     * @param {number} id - The ID of the user to update.
     * @param {UserFormData} userData - The updated data for the user.
     */
    const updateUser = async (id: number, userData: UserFormData) => {
        setError(null); // Clear any previous errors.
        try {
            const updatedUser = await userService.updateUser(id, userData); // Call the API to update a user.
            setUsers((prevUsers) =>
                prevUsers.map(
                    (user) => (user.id === updatedUser.id ? updatedUser : user) // Replace the old user with the updated one.
                )
            );
            toast.success(`User "${updatedUser.nama}" updated successfully!`); // Display a success toast.
        } catch (err: unknown) {
            console.error(err);
            let errorMessage =
                'Failed to update user. Please check your input.';
            // Check if the error is an Axios error and extract a more specific message.
            if (axios.isAxiosError(err) && err.response) {
                if (err.response.data.message === 'Email already in use') {
                    errorMessage =
                        'Email already in use, please use another email.';
                } else {
                    errorMessage = err.response?.data?.message || errorMessage;
                }
            }
            setError(errorMessage); // Set error for the form.
            toast.error(errorMessage); // Display an error toast.
            throw err; // Re-throw the error to allow components to handle it if necessary.
        }
    };

    /**
     * @async
     * @function deleteUser
     * @description Deletes a user from the database via the API and updates the `users` state.
     * Handles success and error notifications.
     * @param {number} id - The ID of the user to delete.
     */
    const deleteUser = async (id: number) => {
        try {
            await userService.deleteUser(id); // Call the API to delete a user.
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id)); // Remove the deleted user from the state.
            toast.success('User deleted successfully!'); // Display a success toast.
        } catch (err) {
            console.error('Failed to delete user:', err);
            setError('Failed to delete user.'); // Set a user-friendly error message.
            toast.error('Failed to delete user.'); // Display an error toast.
            throw err; // Re-throw the error to allow components to handle it if necessary.
        }
    };

    // useEffect hook to fetch users when the component mounts.
    useEffect(() => {
        fetchUsers();
    }, []); // Empty dependency array ensures this runs only once on mount.

    return (
        // Provides the context value to all child components.
        <UserContext.Provider
            value={{
                users,
                loading,
                error,
                fetchUsers,
                addUser,
                updateUser,
                deleteUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

/**
 * @function useUser
 * @description A custom hook to consume the UserContext.
 * It provides a convenient way for functional components to access user-related state and functions.
 * @returns {UserContextType} The context value containing users, loading state, error, and CRUD functions.
 * @throws {Error} If used outside of a UserProvider.
 */
export const useUser = () => {
    const context = useContext(UserContext);
    // Ensures the hook is used within a UserProvider.
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
