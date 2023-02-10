import User from '../../models/User';

import Script from '../../models/Script';
interface IMapping {
  newUser(user:any): User
  convertToUser(user: any): User
  convertToScript(script: any): Script
}

export default IMapping;
