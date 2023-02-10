import  UserRoleEnum  from "../enum/UserRoleEnum";
import User from "../models/User";
import IMapping  from '../interfaces/mapping/IMapping';
import Script from "../models/Script";
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
}

export default new Mapping();
