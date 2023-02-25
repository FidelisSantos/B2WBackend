import  UserRoleEnum  from "../enum/UserRoleEnum";
import User from "../models/User";
import IMapping  from '../interfaces/mapping/IMapping';
import Script from "../models/Script";
import { UserAuthResponse } from "../types/UserAuthResponse";
import { UserResponse } from "../types/UserResponse";
class Mapping implements IMapping {

  convertToUser(user: any) {
    const userFormatter: User = {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      isValid: user.isValid
    };

    return userFormatter;
  }

  convertToScript(script: any) {
    const scriptFormatter: Script = {
      question: script.question,
      answer: script.answer,
      imgAnswer: script.imgAnswer
    }

    return scriptFormatter
  }

  newUser(newUser: any) {
    const user : User = {
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      role: UserRoleEnum.USER,
      isValid: false
    };

    return user;
  }

  convertToUserAuthResponse(user: User) {
    const userResponse : UserAuthResponse = {
      name: user.name,
      email: user.email,
      role: user.role,
    }

    return userResponse;
  }

  convertToListUserResponse(users: User[]) {
    const listUserResponse: UserResponse[] = [];
    users.forEach(user => {
      const userResponse: UserResponse = {
        name: user.name,
        email: user.email,
        role: user.role,
        isValid: user.isValid
      }

      listUserResponse.push(userResponse);
    });

    return listUserResponse;
  }
}

export default new Mapping();
