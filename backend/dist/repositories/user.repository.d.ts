import { User } from '../generated/prisma';
import { CreateUserInput, UpdateUserInput } from '../validators/user.validator';
export declare class UserRepository {
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByFirebaseUid(firebaseUid: string): Promise<User | null>;
    findAll(skip?: number, take?: number): Promise<{
        users: User[];
        total: number;
    }>;
    create(data: CreateUserInput): Promise<User>;
    update(id: string, data: UpdateUserInput): Promise<User>;
    delete(id: string): Promise<User>;
    count(): Promise<number>;
}
export declare const userRepository: UserRepository;
//# sourceMappingURL=user.repository.d.ts.map