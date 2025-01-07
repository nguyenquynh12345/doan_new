export enum TranfersStatus {
  PENDING = 1,
  SUCCESS = 2,
  REJECT = 3,
}

export const postStatusArray: TranfersStatus[] = [
  TranfersStatus.PENDING,
  TranfersStatus.SUCCESS,
  TranfersStatus.REJECT,
];
