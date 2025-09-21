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

// POST / - Creates a new user
router.post('/', async (req: Request, res: Response) => {
    try {
        // Validate request body against the schema
        const validatedData = userSchema.parse(req.body);

        const newUser = await prisma.user.create({
            data: validatedData,
        });
        res.status(201).json(newUser);
    } catch (error) {
        // Handle validation errors from Zod
        if (error instanceof z.ZodError) {
            return res
                .status(400)
                .json({ message: 'Validation failed', errors: error.issues });
        }
        // Handle other errors (e.g., unique constraint violation)
        res.status(500).json({ message: 'Error creating user', error });
    }
});

export default router;
