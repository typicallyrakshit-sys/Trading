"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const user_repository_1 = require("../repositories/user.repository");
const portfolio_repository_1 = require("../repositories/portfolio.repository");
const ApiError_1 = require("../utils/ApiError");
class UserService {
    async getUserById(id) {
        const user = await user_repository_1.userRepository.findById(id);
        if (!user)
            throw ApiError_1.ApiError.notFound(`User with id '${id}' not found`);
        return user;
    }
    async getUserByEmail(email) {
        const user = await user_repository_1.userRepository.findByEmail(email);
        if (!user)
            throw ApiError_1.ApiError.notFound(`User with email '${email}' not found`);
        return user;
    }
    async getAllUsers(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const { users, total } = await user_repository_1.userRepository.findAll(skip, limit);
        const totalPages = Math.ceil(total / limit);
        return {
            data: users,
            total,
            page,
            limit,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        };
    }
    async createUser(data) {
        const existing = await user_repository_1.userRepository.findByEmail(data.email);
        if (existing)
            throw ApiError_1.ApiError.conflict(`User with email '${data.email}' already exists`);
        const user = await user_repository_1.userRepository.create(data);
        // Automatically initialize portfolio for new user
        await portfolio_repository_1.portfolioRepository.upsert(user.id, {});
        return user;
    }
    async updateUser(id, data) {
        await this.getUserById(id); // ensures user exists
        return user_repository_1.userRepository.update(id, data);
    }
    async deleteUser(id) {
        await this.getUserById(id);
        await user_repository_1.userRepository.delete(id);
    }
    async getTotalUserCount() {
        return user_repository_1.userRepository.count();
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
//# sourceMappingURL=user.service.js.map