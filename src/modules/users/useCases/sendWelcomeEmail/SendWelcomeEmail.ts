import { UseCase } from "../../../../core/domain/UseCase";
import { User } from "../../domain/user";
import { Result } from "../../../../core/logic/Result";
import { IEmailService } from "../ports/IEmailService";

interface Request {
  user: User;
}

type Response = Result<void>;

export class SendWelcomeEmail implements UseCase<Request, Promise<Response>> {
  private emailService: IEmailService;
  
  constructor (emailService: IEmailService) {
    this.emailService = emailService;
  }

  async execute (request: Request): Promise<Response> {
    try {
      const { user } = request;
      await this.emailService.sendWelcomeEmail(user);
      console.log(`[SendWelcomeEmail]: the welcome email was sent to ${user.firstName} ${user.lastName}`)
      return Result.ok();
    } catch (err) {
      return Result.fail(err);
    }
  }
}