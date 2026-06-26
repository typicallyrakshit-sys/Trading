"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../src/generated/prisma");
const prisma = new prisma_1.PrismaClient();
async function main() {
    console.log('🌱 Starting database seed...');
    // Clean existing data
    await prisma.leaderboard.deleteMany();
    await prisma.portfolio.deleteMany();
    await prisma.order.deleteMany();
    await prisma.position.deleteMany();
    await prisma.user.deleteMany();
    await prisma.competition.deleteMany();
    // Create admin user
    const admin = await prisma.user.create({
        data: {
            email: 'admin@nydc.in',
            name: 'NYDC Admin',
            role: 'ADMIN',
            balance: 1000000,
        },
    });
    // Create sample competition
    await prisma.competition.create({
        data: {
            status: 'UPCOMING',
            startTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
            endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        },
    });
    console.log('✅ Seed complete. Admin:', admin.email);
}
main()
    .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map