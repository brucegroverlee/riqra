import { User } from "../../domain/user";
import { UserMap } from "../mappers/UserMap";
import { UserEmail } from "../../domain/userEmail";
import { IUserRepo } from "../../useCases/ports/IUserRepo";

export class UserRepo implements IUserRepo {
  private models: any;

  constructor (models: any) {
    this.models = models;
  }

  private createBaseQuery () {
    const { models } = this;
    return {
      where: {},
      include: []
    }
  }

  public async findUserByUsername (username: string): Promise<User> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where['username'] = username;
    const user = await this.models.Users.findOne(baseQuery);
    if (!!user === true) return user;
    return null;
  }

  public async findUserByEmail(email: UserEmail): Promise<User> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where['email'] = email.value.toString();
    const user = await this.models.Users.findOne(baseQuery);
    if (!!user === true) {
      return UserMap.toDomain(user);
    }
    return null;
  }

  public async exists (email: UserEmail): Promise<boolean> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where['email'] = email.value.toString();
    const user = await this.models.Users.findOne(baseQuery);
    return !!user === true;
  }

  public async save (user: User): Promise<void> {
    const BaseUserModel = this.models.Users;
    const exists = await this.exists(user.email);
    const rawUser = UserMap.toPersistence(user);
    
    try {
      if (!exists) {
        // Create new
        await BaseUserModel.create(rawUser);
      } 
      
      else {
        // Save old
        const sequelizeUserInstance = await BaseUserModel.findOne({ 
          where: { email: user.email.value }
        })
        await sequelizeUserInstance.update(rawUser);
      }
    } catch (err) {
      console.log(err);
    }
  }
}