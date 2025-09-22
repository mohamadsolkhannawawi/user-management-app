// src/context/UserContext.tsx

import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
} from 'react';
import * as userService from '../api/userService';
import toast from 'react-hot-toast';
import axios from 'axios';
import type { User, UserFormData } from '../types/user';

// Define User type (should match backend)


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

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
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

    const addUser = async (userData: UserFormData) => {
        setError(null);
        try {
            const newUser = await userService.addUser(userData);
            setUsers((prevUsers) => [...prevUsers, newUser]);
            toast.success('User added successfully!');
        } catch (err: unknown) {
            console.error(err);
            let errorMessage = 'Failed to add user. Please check your input.';
            if (axios.isAxiosError(err) && err.response) {
                if (err.response.data.message === 'Email already in use') {
                    errorMessage =
                        'Email already in use, please use another email.';
                } else {
                    errorMessage = err.response?.data?.message || errorMessage;
                }
            }
            setError(errorMessage); // Set error for the form
            toast.error(errorMessage);
            throw err; // Re-throw to allow component to handle if needed
        }
    };

    const updateUser = async (id: number, userData: UserFormData) => {
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
            let errorMessage = 'Failed to update user. Please check your input.';
            if (axios.isAxiosError(err) && err.response) {
                if (err.response.data.message === 'Email already in use') {
                    errorMessage =
                        'Email already in use, please use another email.';
                } else {
                    errorMessage = err.response?.data?.message || errorMessage;
                }
            }
            setError(errorMessage); // Set error for the form
            toast.error(errorMessage);
            throw err; // Re-throw to allow component to handle if needed
        }
    };

    const deleteUser = async (id: number) => {
        try {
            await userService.deleteUser(id);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
            toast.success('User deleted successfully!');
        } catch (err) {
            console.error('Failed to delete user:', err);
            setError('Failed to delete user.');
            toast.error('Failed to delete user.');
            throw err; // Re-throw to allow component to handle if needed
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

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

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
