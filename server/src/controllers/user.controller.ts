// src/controllers/user.controller.ts

import { type Request, type Response } from 'express';
import { z } from 'zod';
import * as userService from '../services/user.service';

const userSchema = z.object({
    nama: z.string().min(1, 'Nama is required'),
    email: z.string().email('Invalid email address'),
    nomorTelepon: z
        .string()
        .min(10, 'Nomor telepon must be at least 10 characters'),
    departemen: z.string().min(1, 'Departemen is required'),
    statusAktif: z.boolean().default(true),
});

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(parseInt(id));

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const validatedData = userSchema.parse(req.body);
        const newUser = await userService.createUser(validatedData);
        res.status(201).json(newUser);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res
                .status(400)
                .json({ message: 'Validation failed', errors: error.issues });
        }
        if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
            return res.status(409).json({ message: 'Email already in use' });
        }
        res.status(500).json({ message: 'Error creating user', error });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const validatedData = userSchema.parse(req.body);

        const updatedUser = await userService.updateUser(parseInt(id), validatedData);

        res.status(200).json(updatedUser);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res
                .status(400)
                .json({ message: 'Validation failed', errors: error.issues });
        }
        if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
            return res.status(404).json({ message: 'User to update not found' });
        }
        if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
            return res.status(409).json({ message: 'Email already in use' });
        }
        res.status(500).json({ message: 'Error updating user', error });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await userService.deleteUser(parseInt(id));
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
            return res.status(404).json({ message: 'User to delete not found' });
        }
        res.status(500).json({ message: 'Error deleting user', error });
    }
};
