export interface INewSaleCondition {
  e2eMinPerTransaction: number;
  e2eMaxPerDay: number;
  withdrawFee: number;
}

export interface INewTimeCondition {
  timeSellFrom: string | null;
  timeSellTo: string | null;
}

export interface ISaleCondition extends INewSaleCondition, INewTimeCondition {
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  id: number;
}
