import { User } from "../../domain/user";
import { UserEmail } from "../../domain/userEmail";

export interface IUserRepository {
  findUserByEmail(email: UserEmail): Promise<User>;
  findUserByUsername (username: string): Promise<User>;
  exists (email: UserEmail): Promise<boolean>;
  save(user: User): Promise<void>;
  delete(query: object): Promise<void>;
}