import { AuthResponse } from "../../types/AuthResponse";

interface IAuthService {
  authenticate(email: string, password: string): Promise<AuthResponse>
}

export default IAuthService;
