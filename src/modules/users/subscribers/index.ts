
import { AfterUserCreated } from "./AfterUserCreated";
import { assignInitialUsername } from "../useCases/assignInitialUsername";
import { SendWelcomeEmail } from "../useCases/sendWelcomeEmail/SendWelcomeEmail";
import { EmailService } from "../infrastructure/services/EmailService";

const sendWelcomeEmail = new SendWelcomeEmail(new EmailService());

// Subscribers
new AfterUserCreated(
  assignInitialUsername,
  sendWelcomeEmail
)