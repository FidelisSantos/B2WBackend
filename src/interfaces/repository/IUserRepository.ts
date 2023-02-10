import UserRoleEnum from "../../enum/UserRoleEnum";
import User from "../../models/User";

interface IUserRepository {
  create(user: User):Promise<void>;
  existsEmail(email: string):Promise<boolean>;
  exists(id: string):Promise<boolean>;
  findOne(id: string):Promise<any>;
  findAll():Promise<any>;
  delete(id: string):Promise<void>;
  updateRole(id: string, role: UserRoleEnum):Promise<void>;
  validUser(id: string):Promise<void>;
  changePassword(id: string, password: string):Promise<void>;
  update(id: string,user: User ):Promise<void>;
}

export default IUserRepository;
