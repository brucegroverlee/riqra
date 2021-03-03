import { BaseController } from "../../../../../core/infra/BaseController";
import { userRepository } from "../../repository/index";
import { CreateUserUseCase } from "../../../useCases/createUser/CreateUserUseCase";
import { CreateUserDTO } from "../../../useCases/createUser/CreateUserDTO";
import { ITokenDTO } from "../../../useCases/createUser/ITokenDTO";
import { Result, Right } from "../../../../../core/logic/Result";
import { CreateUserErrors } from "../../../useCases/createUser/CreateUserErrors";

export class CreateUserController extends BaseController {
  private useCase: CreateUserUseCase;

  constructor (useCase: CreateUserUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (): Promise<any> {
    const dto: CreateUserDTO = this.req.body as CreateUserDTO;

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          case CreateUserErrors.InvalidPassword:
            return this.conflict(error.errorValue().message)
          default:
            return this.fail(error.errorValue().message);
        }
      } else {
        const parsedResult = result as Right< {}, Result<ITokenDTO>>;
        return this.ok<ITokenDTO>(this.res, parsedResult.value.getValue());
      }

    } catch (err) {
      return this.fail(err)
    }
  }
}

const createUserUseCase = new CreateUserUseCase(userRepository);
export const createUserController = new CreateUserController(
  createUserUseCase
);