
import { AssignInitialUsername } from "./AssignInitialUsername";
import { userRepo } from "../../infrastructure/repository";

const assignInitialUsername = new AssignInitialUsername(userRepo);

export {
  assignInitialUsername
}