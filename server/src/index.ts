// server/src/index.ts

import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import userRoutes from './routes/user.routes';

const app = express();
const prisma = new PrismaClient();

// Koneksi database
prisma.$connect();

// Middleware
// CORS configuration to allow requests from any origin
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight for all routes

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Export the app for deployment or testing
export default app;
