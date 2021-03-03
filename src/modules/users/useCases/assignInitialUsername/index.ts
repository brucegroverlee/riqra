
import { AssignInitialUsername } from "./AssignInitialUsername";
import { userRepository } from "../../infrastructure/repository";

const assignInitialUsername = new AssignInitialUsername(userRepository);

export {
  assignInitialUsername
}