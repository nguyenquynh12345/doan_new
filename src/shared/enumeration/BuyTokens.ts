export enum BuyTokensStatus {
  PENDING = 1,
  SUCCESS = 2,
  REJECT = 3,
}

export const postStatusArray: BuyTokensStatus[] = [
  BuyTokensStatus.PENDING,
  BuyTokensStatus.SUCCESS,
  BuyTokensStatus.REJECT,
];
