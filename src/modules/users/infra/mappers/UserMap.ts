
import { Mapper } from "../../../../core/infra/Mapper";
import { User } from "../../domain/user";
import { UniqueEntityID } from "../../../../core/domain/UniqueEntityID";
import { UserEmail } from "../../domain/userEmail";
import { UserPassword } from "../../domain/userPassword";

export class UserMap extends Mapper<User> {

  public static toPersistence (user: User): any {
    return {
      id: user.id.toString(),
      email: user.email.value,
      password: user.password.value,
      first_name: user.firstName,
      last_name: user.lastName,
      username: user.username
    }
  }

  public static toDomain (raw: any): User {
    const userEmailOrError = UserEmail.create(raw.email);
    const userPasswordOrError = UserPassword.create(raw.password);

    const userOrError = User.create({
      email: userEmailOrError.getValue(),
      password: userPasswordOrError.getValue(),
      firstName: raw.first_name,
      lastName: raw.last_name,
      username: raw.username
    }, new UniqueEntityID(raw.id))

    userOrError.isFailure ? console.log(userOrError.error) : '';
    
    return userOrError.isSuccess ? userOrError.getValue() : null;
  }
  
}