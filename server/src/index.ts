// server/src/index.ts

import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import userRoutes from './routes/user.routes';

const app = express();
const prisma = new PrismaClient();

// Fungsi untuk koneksi database, bisa dipanggil di awal jika perlu.
// Untuk Vercel, koneksi Prisma seringkali dikelola per request.
// Namun, untuk sederhana, kita bisa biarkan seperti ini.
prisma.$connect();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// PENTING: Hapus seluruh fungsi main() dan app.listen().
// Cukup ekspor instance 'app' sebagai default.
// Vercel akan mengambil alih file ini dan menjalankannya sebagai serverless function.
export default app;