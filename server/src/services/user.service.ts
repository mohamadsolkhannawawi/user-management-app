// src/services/user.service.ts
// This file contains the business logic for user-related operations, interacting directly with the Prisma ORM.

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Retrieves all user records from the database.
 * @returns A promise that resolves to an array of user objects.
 */
export const getAllUsers = () => {
    return prisma.user.findMany();
};

/**
 * Retrieves a single user record by its unique ID.
 * @param id The unique identifier of the user.
 * @returns A promise that resolves to a user object or null if not found.
 */
export const getUserById = (id: number) => {
    return prisma.user.findUnique({ where: { id } });
};

/**
 * Creates a new user record in the database.
 * @param data The data for the new user, conforming to Prisma's UserCreateInput type.
 * @returns A promise that resolves to the newly created user object.
 */
export const createUser = (data: Prisma.UserCreateInput) => {
    return prisma.user.create({ data });
};

/**
 * Updates an existing user record in the database.
 * @param id The unique identifier of the user to update.
 * @param data The data to update the user with, conforming to Prisma's UserUpdateInput type.
 * @returns A promise that resolves to the updated user object.
 */
export const updateUser = (id: number, data: Prisma.UserUpdateInput) => {
    return prisma.user.update({
        where: { id },
        data,
    });
};

/**
 * Deletes a user record from the database by its unique ID.
 * @param id The unique identifier of the user to delete.
 * @returns A promise that resolves to the deleted user object.
 */
export const deleteUser = (id: number) => {
    return prisma.user.delete({ where: { id } });
};
