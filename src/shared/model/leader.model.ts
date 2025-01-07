import { IUser } from './user.model';

export interface ILeader extends IUser {
  applyLeaderDate: string;
  grossRevenue: number;
  periodRevenue: number;
}
