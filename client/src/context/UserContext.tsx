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
import { mockUsers } from '../data/mockUsers'; // Import our mock data

/**
 * @interface UserContextType
 * @description Defines the shape of the UserContext's value.
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

const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * @interface UserProviderProps
 * @description Defines the props for the UserProvider component.
 */
interface UserProviderProps {
    children: ReactNode;
}

/**
 * @function UserProvider
 * @description A functional React component that provides user-related state and functions to its children.
 */
export const UserProvider = ({ children }: UserProviderProps) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Check if the app is running on a Vercel production deployment.
    const isVercelDeployment = import.meta.env.VITE_VERCEL_ENV === 'production';

    /**
     * @async
     * @function fetchUsers
     * @description Fetches all users from the API or loads mock data for Vercel deployment.
     */
    const fetchUsers = async () => {
        // If it's a Vercel deployment, load mock data and exit the function.
        if (isVercelDeployment) {
            setUsers(mockUsers);
            setLoading(false);
            return;
        }

        // This part below will only run during local development.
        setLoading(true);
        setError(null);
        try {
            const data = await userService.getUsers();
            setUsers(data);
        } catch (err) {
            console.error('Failed to fetch users:', err);
            setError('Failed to fetch users. Please try again later.');
            toast.error('Failed to fetch users.');
        } finally {
            setLoading(false);
        }
    };

    /**
     * @async
     * @function addUser
     * @description Adds a new user via the API or simulates it for Vercel deployment.
     */
    const addUser = async (userData: UserFormData) => {
        // Simulate adding a user for the Vercel demo.
        if (isVercelDeployment) {
            const newUser: User = {
                ...userData,
                id: Math.max(...users.map((u) => u.id), 0) + 1,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                statusAktif: true,
            };
            setUsers((prevUsers) => [...prevUsers, newUser]);
            toast.success('User added successfully! (Demo)');
            return;
        }

        // This part below will only run during local development.
        setError(null);
        try {
            const newUser = await userService.addUser(userData);
            setUsers((prevUsers) => [...prevUsers, newUser]);
            toast.success('User added successfully!');
        } catch (err: unknown) {
            console.error(err);
            let errorMessage = 'Failed to add user. Please check your input.';
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
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        }
    };

    /**
     * @async
     * @function updateUser
     * @description Updates a user via the API or simulates it for Vercel deployment.
     */
    const updateUser = async (id: number, userData: UserFormData) => {
        // Simulate updating a user for the Vercel demo.
        if (isVercelDeployment) {
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === id
                        ? {
                              ...user,
                              ...userData,
                              updatedAt: new Date().toISOString(),
                          }
                        : user
                )
            );
            toast.success(`User updated successfully! (Demo)`);
            return;
        }

        // This part below will only run during local development.
        setError(null);
        try {
            const updatedUser = await userService.updateUser(id, userData);
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === updatedUser.id ? updatedUser : user
                )
            );
            toast.success(`User "${updatedUser.nama}" updated successfully!`);
        } catch (err: unknown) {
            console.error(err);
            let errorMessage =
                'Failed to update user. Please check your input.';
            if (axios.isAxiosError(err) && err.response) {
                if (err.response.data.message === 'Email already in use') {
                    errorMessage =
                        'Email already in use, please use another email.';
                } else {
                    errorMessage = err.response?.data?.message || errorMessage;
                }
            }
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        }
    };

    /**
     * @async
     * @function deleteUser
     * @description Deletes a user via the API or simulates it for Vercel deployment.
     */
    const deleteUser = async (id: number) => {
        //  Simulate deleting a user for the Vercel demo.
        if (isVercelDeployment) {
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
            toast.success('User deleted successfully! (Demo)');
            return;
        }

        // This part below will only run during local development.
        try {
            await userService.deleteUser(id);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
            toast.success('User deleted successfully!');
        } catch (err) {
            console.error('Failed to delete user:', err);
            setError('Failed to delete user.');
            toast.error('Failed to delete user.');
            throw err;
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [isVercelDeployment]); // Added dependency to re-run if environment changes.

    return (
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
 */
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
