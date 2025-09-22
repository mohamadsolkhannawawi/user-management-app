// src/routes/user.routes.ts
// This file defines the API routes for user management and links them to the corresponding controller functions.

import { Router } from 'express';
import * as userController from '../controllers/user.controller';

const router = Router();

// Route to get all users
router.get('/', userController.getAllUsers);

// Route to get a single user by ID
router.get('/:id', userController.getUserById);

// Route to create a new user
router.post('/', userController.createUser);

// Route to update an existing user by ID
router.put('/:id', userController.updateUser);

// Route to delete a user by ID
router.delete('/:id', userController.deleteUser);

export default router;