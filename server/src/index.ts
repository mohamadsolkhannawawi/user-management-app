// This file is the entry point for the server application.
// It sets up the Express server, connects to the database, and defines the API routes.

import express from 'express'; // Import the Express framework to create and manage the server.
import { PrismaClient } from '@prisma/client'; // Import PrismaClient to interact with the database.
import cors from 'cors'; // Import CORS middleware to enable Cross-Origin Resource Sharing.
import userRoutes from './routes/user.routes'; // Import the user-related API routes.

const app = express(); // Initialize the Express application instance.
const prisma = new PrismaClient(); // Instantiate PrismaClient for database operations, managing connections and queries.
const PORT = 5001; // Define the port number on which the server will listen for incoming requests.

/**
 * @function main
 * @description Asynchronous function to bootstrap the server.
 * It handles database connection, middleware setup, route configuration, and server startup.
 */
async function main() {
    // Establish a connection to the database using Prisma. This ensures the database is ready before API requests are processed.
    await prisma.$connect();

    // Enable Cross-Origin Resource Sharing (CORS) for all routes.
    // This is crucial for allowing web browsers from different origins to make requests to this API.
    app.use(cors());

    // Enable Express to parse incoming JSON request bodies.
    // This middleware makes JSON payloads available on the `req.body` object for all routes.
    app.use(express.json());

    // Mount the user-related API routes under the '/api/users' base path.
    // All requests starting with '/api/users' will be directed to the userRoutes handler.
    app.use('/api/users', userRoutes);

    // Start the Express server and listen for incoming HTTP requests on the specified PORT.
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`); // Log a confirmation message once the server successfully starts.
    });
}

// Execute the main function to initialize and start the server.
// This block also includes robust error handling to catch and log any exceptions
// that occur during the server startup process, ensuring graceful failure.
main().catch((error) => {
    console.error('An error occurred during server startup:', error);
    process.exit(1); // Exit the process with a failure code if the server cannot start.
});