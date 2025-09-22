// src/api/userService.ts

import axios from 'axios';
import type { User, UserFormData } from '../types/user';

const API_URL = 'http://localhost:5001/api/users';

export const getUsers = async (): Promise<User[]> => {
    const response = await axios.get<User[]>(API_URL);
    return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
    const response = await axios.get<User>(`${API_URL}/${id}`);
    return response.data;
};

export const addUser = async (userData: UserFormData): Promise<User> => {
    const response = await axios.post<User>(API_URL, userData);
    return response.data;
};

export const updateUser = async (id: number, userData: UserFormData): Promise<User> => {
    const response = await axios.put<User>(`${API_URL}/${id}`, userData);
    return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};