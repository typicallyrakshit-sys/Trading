import { PrismaClient } from '../generated/prisma';
declare global {
    var __prisma: PrismaClient | undefined;
}
export declare const prisma: PrismaClient;
export declare function connectDatabase(): Promise<void>;
export declare function disconnectDatabase(): Promise<void>;
export declare function checkDatabaseHealth(): Promise<boolean>;
//# sourceMappingURL=database.d.ts.map