// /api/index.ts
// This single file acts as the entry point for all backend API routes on Vercel.

import express, { type Request, type Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import cors from 'cors';

// Initialize Express app and Prisma Client
const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(cors());
app.use(express.json());

// Zod schema for user creation and update validation
const userSchema = z.object({
    nama: z.string().min(1, { message: 'Nama is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    nomorTelepon: z
        .string()
        .min(10, { message: 'Nomor telepon must be at least 10 characters' }),
    departemen: z.string().min(1, { message: 'Departemen is required' }),
});

// --- API Routes ---

/**
 * @route GET /api/users
 * @description Fetches all users.
 */
app.get('/api/users', async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

/**
 * @route GET /api/users/:id
 * @description Fetches a single user by their ID.
 */
app.get('/api/users/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
});

/**
 * @route POST /api/users
 * @description Creates a new user.
 */
app.post('/api/users', async (req: Request, res: Response) => {
    try {
        const validatedData = userSchema.parse(req.body);
        const newUser = await prisma.user.create({
            data: validatedData,
        });
        res.status(201).json(newUser);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res
                .status(400)
                .json({ message: 'Validation failed', errors: error.issues });
        }
        res.status(500).json({ message: 'Error creating user', error });
    }
});

/**
 * @route PUT /api/users/:id
 * @description Updates an existing user.
 */
app.put('/api/users/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const validatedData = userSchema.parse(req.body);
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: validatedData,
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res
                .status(400)
                .json({ message: 'Validation failed', errors: error.issues });
        }
        if (
            error &&
            typeof error === 'object' &&
            'code' in error &&
            error.code === 'P2025'
        ) {
            return res
                .status(404)
                .json({ message: 'User to update not found' });
        }
        res.status(500).json({ message: 'Error updating user', error });
    }
});

/**
 * @route DELETE /api/users/:id
 * @description Deletes a user by their ID.
 */
app.delete('/api/users/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedUser = await prisma.user.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json({
            message: 'User deleted successfully',
            user: deletedUser,
        });
    } catch (error) {
        if (
            error &&
            typeof error === 'object' &&
            'code' in error &&
            error.code === 'P2025'
        ) {
            return res
                .status(404)
                .json({ message: 'User to delete not found' });
        }
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

// Export the app for Vercel to use
export default app;
