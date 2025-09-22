// prisma/seed.ts
// This script is used to seed the database with initial data.

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ...');

    // Create 20 dummy users for testing and development purposes.
    for (let i = 1; i <= 20; i++) {
        const user = await prisma.user.create({
            data: {
                nama: `User ${i}`, // User's name
                email: `user${i}@example.com`, // User's email, must be unique
                nomorTelepon: `0812345678${i.toString().padStart(2, '0')}`, // User's phone number
                departemen: i % 2 === 0 ? 'Technology' : 'HR', // User's department, alternating between Technology and HR
                statusAktif: i % 3 !== 0, // User's active status, making some users inactive for variety
            },
        });
        console.log(`Created user with id: ${user.id}`);
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error('Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect(); // Disconnect Prisma client after seeding
    });
