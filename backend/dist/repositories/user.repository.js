"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = exports.UserRepository = void 0;
const database_1 = require("../config/database");
class UserRepository {
    async findById(id) {
        return database_1.prisma.user.findUnique({ where: { id } });
    }
    async findByEmail(email) {
        return database_1.prisma.user.findUnique({ where: { email } });
    }
    async findByFirebaseUid(firebaseUid) {
        return database_1.prisma.user.findUnique({ where: { firebaseUid } });
    }
    async findAll(skip = 0, take = 20) {
        const [users, total] = await Promise.all([
            database_1.prisma.user.findMany({
                skip,
                take,
                orderBy: { createdAt: 'desc' },
            }),
            database_1.prisma.user.count(),
        ]);
        return { users, total };
    }
    async create(data) {
        return database_1.prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                firebaseUid: data.firebaseUid,
                avatar: data.avatar ?? '',
            },
        });
    }
    async update(id, data) {
        return database_1.prisma.user.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return database_1.prisma.user.delete({ where: { id } });
    }
    async count() {
        return database_1.prisma.user.count();
    }
}
exports.UserRepository = UserRepository;
exports.userRepository = new UserRepository();
//# sourceMappingURL=user.repository.js.map