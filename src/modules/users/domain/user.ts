import { AggregateRoot } from "../../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";
import { Result } from "../../../core/logic/Result";
import { Guard } from "../../../core/logic/Guard";
import { UserCreatedEvent } from "./events/userCreatedEvent";
import { UserEmail } from "./userEmail";
import { UserPassword } from "./userPassword";
import { Supplier } from "./Supplier";

interface UserProps {
  firstName: string;
  lastName: string;
  email: UserEmail;
  password: UserPassword;
  supplier: Supplier;
  username?: string;
}

export class User extends AggregateRoot<UserProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get email (): UserEmail {
    return this.props.email;
  }

  get firstName (): string {
    return this.props.firstName
  }

  get lastName (): string {
    return this.props.lastName;
  }

  get password (): UserPassword {
    return this.props.password;
  }

  get supplier (): Supplier {
    return this.props.supplier;
  }

  get username (): string {
    return this.props.username;
  }
  
  set username (value: string) {
    this.props.username = value;
  }

  private constructor (props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: UserProps, id?: UniqueEntityID): Result<User> {

    const guardedProps = [
      { argument: props.firstName, argumentName: 'firstName' },
      { argument: props.lastName, argumentName: 'lastName' },
      { argument: props.email, argumentName: 'email' },
      { argument: props.supplier, argumentName: 'supplier' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message)
    } 
    
    else {
      const user = new User({
        ...props,
        username: props.username ? props.username : '',
      }, id);

      const idWasProvided = !!id;

      if (!idWasProvided) {
        user.addDomainEvent(new UserCreatedEvent(user));
      }

      return Result.ok<User>(user);
    }
  }
}