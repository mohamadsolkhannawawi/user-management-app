// src/controllers/user.controller.ts
// This file contains the controller functions for handling user-related API requests.

import { type Request, type Response } from 'express';
import { z } from 'zod';
import * as userService from '../services/user.service';

// Schema for validating user input using Zod.
const userSchema = z.object({
    nama: z.string().min(1, 'Name is required'), // User's name, must not be empty
    email: z.string().email('Invalid email address'), // User's email, must be a valid email format
    nomorTelepon: z
        .string()
        .min(10, 'Phone number must be at least 10 characters'), // User's phone number, minimum 10 characters
    departemen: z.string().min(1, 'Department is required'), // User's department, must not be empty
    statusAktif: z.boolean().default(true), // User's active status, defaults to true
});

/**
 * Handles the request to get all users.
 * @param req The Express request object.
 * @param res The Express response object.
 */
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error in getAllUsers:', error);
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

/**
 * Handles the request to get a user by their ID.
 * @param req The Express request object, containing user ID in params.
 * @param res The Express response object.
 */
export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(parseInt(id));

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error in getUserById:', error);
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

/**
 * Handles the request to create a new user.
 * Validates input and calls the user service to create the user.
 * @param req The Express request object, containing user data in body.
 * @param res The Express response object.
 */
export const createUser = async (req: Request, res: Response) => {
    try {
        // Validate request body against the user schema
        const validatedData = userSchema.parse(req.body);
        const newUser = await userService.createUser(validatedData);
        res.status(201).json(newUser);
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Handle validation errors
            return res
                .status(400)
                .json({ message: 'Validation failed', errors: error.issues });
        }
        // Handle Prisma unique constraint error (e.g., duplicate email)
        if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
            return res.status(409).json({ message: 'Email already in use' });
        }
        console.error('Error in createUser:', error);
        res.status(500).json({ message: 'Error creating user', error });
    }
};

/**
 * Handles the request to update an existing user.
 * Validates input and calls the user service to update the user.
 * @param req The Express request object, containing user ID in params and data in body.
 * @param res The Express response object.
 */
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        // Validate request body against the user schema
        const validatedData = userSchema.parse(req.body);

        const updatedUser = await userService.updateUser(parseInt(id), validatedData);

        res.status(200).json(updatedUser);
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Handle validation errors
            return res
                .status(400)
                .json({ message: 'Validation failed', errors: error.issues });
        }
        // Handle Prisma record not found error
        if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
            return res.status(404).json({ message: 'User to update not found' });
        }
        // Handle Prisma unique constraint error (e.g., duplicate email)
        if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
            return res.status(409).json({ message: 'Email already in use' });
        }
        console.error('Error in updateUser:', error);
        res.status(500).json({ message: 'Error updating user', error });
    }
};

/**
 * Handles the request to delete a user by their ID.
 * @param req The Express request object, containing user ID in params.
 * @param res The Express response object.
 */
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await userService.deleteUser(parseInt(id));
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        // Handle Prisma record not found error
        if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
            return res.status(404).json({ message: 'User to delete not found' });
        }
        console.error('Error in deleteUser:', error);
        res.status(500).json({ message: 'Error deleting user', error });
    }
};
