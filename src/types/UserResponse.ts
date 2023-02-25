import UserRoleEnum from "../enum/UserRoleEnum";

export type UserResponse = {
  name: string;
  email:string;
  role: UserRoleEnum;
  isValid: boolean
}
