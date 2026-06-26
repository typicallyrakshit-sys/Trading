import { User } from '../generated/prisma';
import { userRepository } from '../repositories/user.repository';
import { portfolioRepository } from '../repositories/portfolio.repository';
import { ApiError } from '../utils/ApiError';
import { CreateUserInput, UpdateUserInput } from '../validators/user.validator';
import { PaginatedResponse } from '../interfaces';

export class UserService {
  async getUserById(id: string): Promise<User> {
    const user = await userRepository.findById(id);
    if (!user) throw ApiError.notFound(`User with id '${id}' not found`);
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await userRepository.findByEmail(email);
    if (!user) throw ApiError.notFound(`User with email '${email}' not found`);
    return user;
  }

  async getAllUsers(page = 1, limit = 20): Promise<PaginatedResponse<User>> {
    const skip = (page - 1) * limit;
    const { users, total } = await userRepository.findAll(skip, limit);
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

  async createUser(data: CreateUserInput): Promise<User> {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) throw ApiError.conflict(`User with email '${data.email}' already exists`);

    const user = await userRepository.create(data);

    // Automatically initialize portfolio for new user
    await portfolioRepository.upsert(user.id, {});

    return user;
  }

  async updateUser(id: string, data: UpdateUserInput): Promise<User> {
    await this.getUserById(id); // ensures user exists
    return userRepository.update(id, data);
  }

  async deleteUser(id: string): Promise<void> {
    await this.getUserById(id);
    await userRepository.delete(id);
  }

  async getTotalUserCount(): Promise<number> {
    return userRepository.count();
  }
}

export const userService = new UserService();
