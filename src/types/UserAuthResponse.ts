import UserRoleEnum from "../enum/UserRoleEnum";

export  type UserAuthResponse = {
  name: string;
  email:string;
  role: UserRoleEnum;
}
