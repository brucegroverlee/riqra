
import { IHandle } from "../../../core/domain/events/IHandle";
import { UserCreatedEvent } from "../domain/events/userCreatedEvent";
import { DomainEvents } from "../../../core/domain/events/DomainEvents";
import { AssignInitialUsername } from "../useCases/assignInitialUsername/AssignInitialUsername";
import { SendWelcomeEmail } from "../useCases/sendWelcomeEmail/SendWelcomeEmail";

export class AfterUserCreated implements IHandle<UserCreatedEvent> {
  private assignInitialUsername: AssignInitialUsername;
  private sendWelcomeEmail: SendWelcomeEmail;

  constructor (
    assignInitialUsername: AssignInitialUsername,
    sendWelcomeEmail: SendWelcomeEmail,
  ) {
    this.setupSubscriptions();
    this.assignInitialUsername = assignInitialUsername;
    this.sendWelcomeEmail = sendWelcomeEmail;
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.onUserCreatedEvent.bind(this), UserCreatedEvent.name);
  }

  private async onUserCreatedEvent (event: UserCreatedEvent): Promise<void> {
    const { user } = event;
    Promise.all([
      this.assignInitialUsername.execute({ user }),
      // sendgrid needs verify the domain
      // this.sendWelcomeEmail.execute({ user }),
    ]).then((values) => {
      console.log(values);
    }).catch((err) => {
      console.log(err);
    });
  }
}