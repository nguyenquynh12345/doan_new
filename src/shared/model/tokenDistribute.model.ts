import { CountryCode } from '../enumeration/CountryCode';
import { IPeriod } from './period.model';

export interface INewTokenDistribution {
  countryCode: CountryCode;
  periodId: string;
  totalToken: number;
  tokenPrice: number;
}

export interface ITokenDistribution extends INewTokenDistribution {
  id: string;
  createdBy: string;
  period?: IPeriod;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  tradedToken: number;
  proportion: number;
  marketCapitalization: number;
}
