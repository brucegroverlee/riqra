import * as dotenv from "dotenv";
import sgMail from"@sendgrid/mail";
import { User } from "../../domain/user";
import { IEmailService } from "../../useCases/ports/IEmailService";

dotenv.config();

export class EmailService implements IEmailService {
  public async sendWelcomeEmail(user: User): Promise<void> {
    try {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: user.email.value,
        from: 'welcome@riqra.com',
        subject: `Hey ${user.firstName}! Welcome to Riqra`,
        text: `Welcome to Riqra, ${user.firstName}`,
        html: `<strong>Welcome to Riqra, ${user.firstName}</strong>`,
      }
      await sgMail.send(msg);
    } catch (error) {
      throw error;
    }
  }
}