export interface Login {
  username: string;
  password: string;
}

export interface SignUp {
  password: string;
  username: string;
}

export interface User {
  authenticated: boolean;
  username?: string;
}
