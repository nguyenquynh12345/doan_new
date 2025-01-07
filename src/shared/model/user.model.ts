export interface INewUser {
  email: string;
  phone: string;
  publicAddress: string;
  userName: string;
}

export interface IUser extends INewUser {
  id: number;
}
