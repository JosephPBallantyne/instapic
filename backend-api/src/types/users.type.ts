export interface User {
  id: number;
  password: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPublic {
  id: number;
  username: string;
}

export interface UserData {
  id: number;
  username: string;
  password: string;
}
