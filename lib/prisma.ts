import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/app/generated/prisma/client';

const rawUrl = process.env.DATABASE_URL || '';
// In Prisma Dev, port 51214 is the direct PostgreSQL port for node-postgres/adapter-pg
const directUrl =
  process.env.DIRECT_URL ||
  (rawUrl.startsWith('prisma+postgres://')
    ? 'postgres://postgres:postgres@localhost:51214/template1?sslmode=disable'
    : rawUrl);

const adapter = new PrismaPg({ connectionString: directUrl });

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export * from '@/app/generated/prisma/client';
export default prisma;
