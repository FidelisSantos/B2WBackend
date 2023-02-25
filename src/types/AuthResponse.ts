import { UserAuthResponse } from "./UserAuthResponse"

export type AuthResponse = {
  user: UserAuthResponse;
  token: string;
}
