import { User } from "../../domain/user";

export interface IEmailService {
  sendWelcomeEmail(user: User): Promise<void>;
}