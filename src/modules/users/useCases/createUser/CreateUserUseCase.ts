
import { UseCase } from "../../../../core/domain/UseCase";
import { CreateUserDTO } from "./CreateUserDTO";
import { ITokenDTO } from "./ITokenDTO";
import { Either, Result, left, right } from "../../../../core/logic/Result";
import { UserEmail } from "../../domain/userEmail";
import { UserPassword } from "../../domain/userPassword";
import { UserToken } from "../../domain/userToken";
import { User } from "../../domain/user";
import { IUserRepo } from "../../infra/repos/userRepo";
import { CreateUserErrors } from "./CreateUserErrors";
import { GenericAppError } from "../../../../core/logic/AppError";

type Response = Either<
  GenericAppError.UnexpectedError |
  CreateUserErrors.AccountAlreadyExists |
  Result<any>, 
  Result<ITokenDTO>
>

export class CreateUserUseCase implements UseCase<CreateUserDTO, Promise<Response>> {
  private userRepo: IUserRepo;

  constructor (userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute (req: CreateUserDTO): Promise<Response> {
    const { firstName, lastName } = req;

    const emailOrError = UserEmail.create(req.email);
    const passwordOrError = UserPassword.create({ value: req.password });

    const combinedPropsResult = Result.combine([ emailOrError, passwordOrError ]);

    if (combinedPropsResult.isFailure) {
      return left(Result.fail<void>(combinedPropsResult.error)) as Response;
    }

    const userOrError = User.create({ 
      email: emailOrError.getValue(), 
      password: passwordOrError.getValue(), 
      firstName, 
      lastName
    });

    if (userOrError.isFailure) {
      return left(Result.fail<void>(combinedPropsResult.error)) as Response;
    }

    const user: User = userOrError.getValue();

    try {
      const userAlreadyExists = await this.userRepo.findUserByEmail(user.email);

      // if the email and password are the same, ...nothing
      if (!!userAlreadyExists) {
        // if the password is incorrect, returns error "Oops! wrong password"
        const reqPass = passwordOrError.getValue();
        const repPass = userAlreadyExists.password;
        if (!repPass.equals(reqPass)) {
          return left(new CreateUserErrors.InvalidPassword()) as Response;
        }
      } else {
        // if the email does not exist a new user is automatically created
        await this.userRepo.save(user);
      }
      const tokenOrError = UserToken.create({
        userId: userAlreadyExists.id,
        email: userAlreadyExists.email,
        // supplier: userAlreadyExists.supplier
      });
      const token = tokenOrError.getValue();
      // returns token
      return right(Result.ok<ITokenDTO>({ token: token.value, })) as Response;
    } catch (err) {
      return left(new GenericAppError.UnexpectedError(err)) as Response;
    }
  }
}