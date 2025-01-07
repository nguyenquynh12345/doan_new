export interface IAssetUser {
  id: string;
  countryCode: string;
  userId: number;
  e2eBuy: number;
  e2eBuyTransfer: number;
  e2eBuyReceive: number;
  e2eBuyHold: number;
  e2eBuyAvailable: number;
  e2eReward: number;
  e2eRewardWithdraw: number;
  e2eRewardAvailable: number;
  e2eAirdropWithdraw: number;
  e2eAirdropAvailable: number;
  totalInvest: number;
  totalReward: number | null;
  rewardPerDay: number | null;
  rewardPerLevel: number | null;
  cashback: number | null;
}
