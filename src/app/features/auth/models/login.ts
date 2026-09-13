export interface LoginModule {
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
  token_type: string;
  user: any;
}
