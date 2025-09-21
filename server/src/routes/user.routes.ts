// src/routes/user.routes.ts

import { Router, type Request, type Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const router = Router();
const prisma = new PrismaClient();

// Zod schema for user validation
const userSchema = z.object({
    nama: z.string().min(1, 'Nama is required'),
    email: z.string().email('Invalid email address'),
    nomorTelepon: z
        .string()
        .min(10, 'Nomor telepon must be at least 10 characters'),
    departemen: z.string().min(1, 'Departemen is required'),
    statusAktif: z.boolean().default(true),
});

// GET / - Fetches all users
router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

// GET /:id - Fetches a single user by their ID
router.get('/:id', async (req: Request, res: Response) => {
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

// POST / - Creates a new user
router.post('/', async (req: Request, res: Response) => {
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

// PUT /:id - Updates an existing user
router.put('/:id', async (req: Request, res: Response) => {
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
        // Type guard to check if the error is a Prisma error for record not found
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

// DELETE /:id - Deletes a user by their ID
router.delete('/:id', async (req: Request, res: Response) => {
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

export default router;
