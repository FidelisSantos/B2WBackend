import { Response } from "express";

interface IAuthService {
  authenticate(res:Response,email: string, password: string): Promise<Response>
}

export default IAuthService;
