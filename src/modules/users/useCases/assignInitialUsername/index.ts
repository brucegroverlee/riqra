
import { AssignInitialUsername } from "./AssignInitialUsername";
import { userRepo } from "../../infra/repos";

const assignInitialUsername = new AssignInitialUsername(userRepo);

export {
  assignInitialUsername
}