// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ...');

    // Create 10 dummy users
    for (let i = 1; i <= 20; i++) {
        const user = await prisma.user.create({
            data: {
                nama: `User ${i}`,
                email: `user${i}@example.com`,
                nomorTelepon: `0812345678${i.toString().padStart(2, '0')}`,
                departemen: i % 2 === 0 ? 'Technology' : 'HR',
                statusAktif: i % 3 !== 0, // Make some users inactive
            },
        });
        console.log(`Created user with id: ${user.id}`);
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
