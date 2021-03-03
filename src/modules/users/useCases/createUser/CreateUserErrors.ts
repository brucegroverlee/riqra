
import { UseCaseError } from "../../../../core/logic/UseCaseError";
import { Result } from "../../../../core/logic/Result";

export namespace CreateUserErrors {

  export class InvalidPassword extends Result<UseCaseError> {    
    constructor () {
      super(false, {
        message: `Oops! wrong password`
      } as UseCaseError)
    }
  }
}