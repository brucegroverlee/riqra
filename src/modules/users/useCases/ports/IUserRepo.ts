import { User } from "../../domain/user";
import { UserEmail } from "../../domain/userEmail";

export interface IUserRepo {
  findUserByEmail(email: UserEmail): Promise<User>;
  findUserByUsername (username: string): Promise<User>;
  exists (email: UserEmail): Promise<boolean>;
  save(user: User): Promise<void>;
}