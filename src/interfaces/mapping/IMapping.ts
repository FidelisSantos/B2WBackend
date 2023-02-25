import User from '../../models/User';

import Script from '../../models/Script';
import { UserAuthResponse } from '../../types/UserAuthResponse';
import { UserResponse } from '../../types/UserResponse';
interface IMapping {
  newUser(user: any): User
  convertToUser(user: any): User
  convertToScript(script: any): Script
  convertToUserAuthResponse(user: User): UserAuthResponse
  convertToListUserResponse(user: User[]): UserResponse[]
}

export default IMapping;
