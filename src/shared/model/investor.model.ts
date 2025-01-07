import { IUser } from './user.model';

export interface IInvestor extends IUser {
    totalNetInvestment: number;
    netInvestmentPeriod: number;
}
