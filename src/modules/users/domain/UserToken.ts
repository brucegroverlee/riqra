import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { ValueObject } from "../../../core/domain/ValueObject";
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";
import { UserEmail } from "./userEmail";
import { Supplier } from "./Supplier";
import { Result } from "../../../core/logic/Result";

dotenv.config();

interface UserProps {
  userId: UniqueEntityID;
  email: UserEmail;
  supplier: Supplier;
}

interface UserTokenProps {
  value: string;
}

export class UserToken extends ValueObject<UserTokenProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: UserTokenProps) {
    super(props);
  }

  public static decode(token: string): Result<UserProps> {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as UserProps;
      return Result.ok<UserProps>(decodedToken);
    } catch (error) {
      throw error;
    }
  }

  public static create (values: UserProps): Result<UserToken> {
    const token = jwt.sign({
      userId: values.userId.toString(),
      email: values.email.value,
      supplier: values.supplier.value
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    return Result.ok<UserToken>(new UserToken({ value: token, }));
  }
}