import { Permission } from '@shared/enumeration/permission';
import { CountryCode } from '../enumeration/CountryCode';
import { Roles } from '../enumeration/roles';
import { Gender, UserStatus } from '../enumeration/userEnum';

// export interface INewUser {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   login: string;
//   password: string;
//   idCard: string;
//   authorities: TAuthorities[];
// }

export interface INewUser {
  email: string;
  phone: string;
  publicAddress: string;
  userName: string;
}

export interface IUser extends INewUser {
  id: number;
}
