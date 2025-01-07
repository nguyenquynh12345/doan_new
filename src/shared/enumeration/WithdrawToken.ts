export enum withdrawsStatus {
  PENDING = 1,
  SUCCESS = 2,
  REJECT = 3,
}

export const postStatusArray: withdrawsStatus[] = [
  withdrawsStatus.PENDING,
  withdrawsStatus.SUCCESS,
  withdrawsStatus.REJECT,
];
