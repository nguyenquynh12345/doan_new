import { CountryCode } from '../enumeration/CountryCode';

export interface ICountryInfo {
  createdBy: string;
  createdDate: string; // '2024-06-12T04:37:33';
  lastModifiedBy: string;
  lastModifiedDate: string; // '2024-06-12T04:37:33';
  id: string;
  code: CountryCode;
  name: string;
  phoneCode: string;
}
