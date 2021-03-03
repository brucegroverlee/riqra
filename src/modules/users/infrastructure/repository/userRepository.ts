import { UsersModel } from "../../../../infrastructure/sequelize/models/users";
import { User } from "../../domain/user";
import { UserMap } from "../mappers/UserMap";
import { UserEmail } from "../../domain/userEmail";
import { IUserRepository } from "../../useCases/ports/IUserRepository";

export class UserRepository implements IUserRepository {

  private createBaseQuery () {
    return {
      where: {},
      include: []
    }
  }

  public async findUserByUsername (username: string): Promise<User> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where['username'] = username;
    const user = await UsersModel.findOne(baseQuery);
    if (!!user === true) return user;
    return null;
  }

  public async findUserByEmail(email: UserEmail): Promise<User> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where['email'] = email.value.toString();
    const user = await UsersModel.findOne(baseQuery);
    if (!!user === true) {
      return UserMap.toDomain(user);
    }
    return null;
  }

  public async exists (email: UserEmail): Promise<boolean> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where['email'] = email.value.toString();
    const user = await UsersModel.findOne(baseQuery);
    return !!user === true;
  }

  public async save (user: User): Promise<void> {
    const exists = await this.exists(user.email);
    const rawUser = UserMap.toPersistence(user);
    
    try {
      if (!exists) {
        // Create new
        await UsersModel.create(rawUser);
      } 
      
      else {
        // Save old
        const sequelizeUserInstance = await UsersModel.findOne({ 
          where: { email: user.email.value }
        })
        await sequelizeUserInstance.update(rawUser);
      }
    } catch (err) {
      console.log(err);
    }
  }

  public async delete(query: object): Promise<void> {
    await UsersModel.destroy({
      where: {...query},
    });
  }
}