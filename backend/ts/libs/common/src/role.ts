export enum Role {
  Admin = 'Admin',
}

export interface UserSigned {
  _id: string;
  username: string;
  name: string;
  lastName: string;
  email: string;
  roles: Role[];
  fullName: string;
}
