// src/api/userService.ts
// This file defines a service for interacting with the user-related API endpoints.
// It encapsulates all HTTP requests for user management operations.

import axios from 'axios'; // Imports the Axios library for making HTTP requests.
import type { User, UserFormData } from '../types/user'; // Imports TypeScript types for User and UserFormData.

const API_URL = 'import.meta.env.VITE_API_BASE_URL'; // Defines the base URL for the user API endpoints.

/**
 * @function getUsers
 * @description Fetches a list of all users from the API.
 * @returns {Promise<User[]>} A promise that resolves to an array of User objects.
 */
export const getUsers = async (): Promise<User[]> => {
    const response = await axios.get<User[]>(API_URL);
    return response.data;
};

/**
 * @function getUserById
 * @description Fetches a single user by their ID from the API.
 * @param {number} id The ID of the user to fetch.
 * @returns {Promise<User>} A promise that resolves to a single User object.
 */
export const getUserById = async (id: number): Promise<User> => {
    const response = await axios.get<User>(`${API_URL}/${id}`);
    return response.data;
};

/**
 * @function addUser
 * @description Adds a new user to the database via the API.
 * @param {UserFormData} userData The data for the new user.
 * @returns {Promise<User>} A promise that resolves to the newly created User object.
 */
export const addUser = async (userData: UserFormData): Promise<User> => {
    const response = await axios.post<User>(API_URL, userData);
    return response.data;
};

/**
 * @function updateUser
 * @description Updates an existing user's information via the API.
 * @param {number} id The ID of the user to update.
 * @param {UserFormData} userData The updated data for the user.
 * @returns {Promise<User>} A promise that resolves to the updated User object.
 */
export const updateUser = async (
    id: number,
    userData: UserFormData
): Promise<User> => {
    const response = await axios.put<User>(`${API_URL}/${id}`, userData);
    return response.data;
};

/**
 * @function deleteUser
 * @description Deletes a user from the database via the API.
 * @param {number} id The ID of the user to delete.
 * @returns {Promise<void>} A promise that resolves when the user is successfully deleted.
 */
export const deleteUser = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};
