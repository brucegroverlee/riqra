
import { UserRepo } from "./userRepo";
import models from "../../../../infrastructure/sequelize/models";

const userRepo = new UserRepo(models);

export {
  userRepo
}