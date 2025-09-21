import express, { type Request, type Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = 5001;

async function main() {
    // Connect to the database before starting the server
    await prisma.$connect();

    // Middleware for parsing JSON request bodies
    app.use(express.json());

    // API test route
    app.get('/api', (req: Request, res: Response) => {
        res.send('Hello, API is running and connected!');
    });

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

// Start the application and handle any startup errors
main().catch((error) => {
    console.error('An error occurred during server startup:', error);
    process.exit(1);
});
