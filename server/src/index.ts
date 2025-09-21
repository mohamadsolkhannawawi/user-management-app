// src/index.ts

import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import userRoutes from './routes/user.routes'; // Import the user routes


const app = express();
const prisma = new PrismaClient();
const PORT = 5001;

async function main() {
    // Connect to the database before starting the server
    await prisma.$connect();

    // Enable CORS for all routes
    app.use(cors());

    // Middleware for parsing JSON request bodies
    app.use(express.json());

    // All routes starting with /api/users will be handled by userRoutes
    app.use('/api/users', userRoutes);

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

// Start the application and handle any startup errors
main().catch((error) => {
    console.error('An error occurred during server startup:', error);
    process.exit(1);
});
