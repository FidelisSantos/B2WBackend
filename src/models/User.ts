import  UserRoleEnum  from "../enum/UserRoleEnum";

type User = {
    name: string;
    email:string;
    password: string;
    role: UserRoleEnum;
    isValid: boolean
}

export default User;


