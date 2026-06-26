import { User } from '../generated/prisma';
import { CreateUserInput, UpdateUserInput } from '../validators/user.validator';
import { PaginatedResponse } from '../interfaces';
export declare class UserService {
    getUserById(id: string): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    getAllUsers(page?: number, limit?: number): Promise<PaginatedResponse<User>>;
    createUser(data: CreateUserInput): Promise<User>;
    updateUser(id: string, data: UpdateUserInput): Promise<User>;
    deleteUser(id: string): Promise<void>;
    getTotalUserCount(): Promise<number>;
}
export declare const userService: UserService;
//# sourceMappingURL=user.service.d.ts.map