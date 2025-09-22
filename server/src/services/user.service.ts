// src/services/user.service.ts

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllUsers = () => {
    return prisma.user.findMany();
};

export const getUserById = (id: number) => {
    return prisma.user.findUnique({ where: { id } });
};

export const createUser = (data: Prisma.UserCreateInput) => {
    return prisma.user.create({ data });
};

export const updateUser = (id: number, data: Prisma.UserUpdateInput) => {
    return prisma.user.update({
        where: { id },
        data,
    });
};

export const deleteUser = (id: number) => {
    return prisma.user.delete({ where: { id } });
};
